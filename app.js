const esbuild = require("esbuild");
const { sassPlugin } = require("esbuild-sass-plugin");
const sveltePlugin = require("./sveltePlugin");
const chokidar = require("chokidar");
const { WebSocketServer } = require("ws");

const path = require("path");
const fs = require("fs");
const fsp = require("fs/promises");
const mime = require("./mime");
const lrscript = require("./lrscript");

const cwd = process.cwd();
const dev = process.argv.includes("-w");

const configName = path.join(cwd, "config.js");
const config = fs.existsSync(configName) ? require(configName) : {};

const components = config.components || ["src/libs", "src/modules"];
const pages = config.pages || "src/pages";
const outdir = config.outdir || "public";
const apidir = config.apidir || "api";
const autoroute = (config.autoroute || true) && dev;
const port = config.port || 3000;
const host = config.host || "127.0.0.1";

const esbuildConfig = config.esbuild || {};
const utf8 = "utf8";

const index = () => {
   let html = fs.readFileSync(path.join(cwd, outdir, "index.html"), utf8);
   return html.replace("</head>", lrscript + "</head>");
};

const fastify = require("fastify")({
   // logger: true,
   logger: {
      level: "error",
   },
});

fastify.addHook("onRequest", (request, reply, done) => {
   // console.log("API:", request.url);

   let url = request.url.replace(/\?.*/, "");

   if (url.includes("/api")) return done();

   let match = url.match(/\.(\w+)/);
   let content = index();
   let type = mime("html");
   let code = 200;

   if (match)
      try {
         type = mime(match[1]);
         content = fs.readFileSync(path.join(cwd, outdir, url));
      } catch (err) {
         code = 404;
         fastify.log.error(err);
      }

   console.log(
      code === 200 ? "\x1b[32m✔\x1b[33m  " + code : "\x1b[31m✗  404",
      "\x1b[37m" + url,
      "\x1b[0m"
   );
   reply.type(type).send(content);
   done();
});

fastify.register(require("@fastify/autoload"), {
   dir: path.join(cwd, apidir, "plugins"),
});

fastify.register(require("@fastify/autoload"), {
   dir: path.join(cwd, apidir, "routes"),
   options: { prefix: "/api" },
});

async function run() {
   createRoutes();
   try {
      await fastify.listen({ port });
      await build();
      await socket();
   } catch (err) {
      fastify.log.error(err);
   }
}

let ready = false;

async function socket() {
   return new Promise((resolve) => {
      const wss = new WebSocketServer({ port: 65535 });

      wss.on("connection", (ws) => {
         //
         chokidar
            .watch(outdir, {
               ignored: /(^|[\/\\])\../, // ignore dotfiles
               persistent: true,
               cwd,
            })
            .on("change", () => {
               ws.send("reload");
            });

         // on api
         chokidar
            .watch("api", {
               ignored: /(^|[\/\\])\../, // ignore dotfiles
               persistent: true,
               cwd,
            })
            .on("change", (fp) => {
               console.log("\nRestart API Services!\n");
               return process.exit(9);
            });

         // on pages
         chokidar
            .watch(pages, {
               ignored: /(^|[\/\\])\../, // ignore dotfiles
               persistent: true,
               cwd,
            })
            .on("add", pageIndex)
            // .on("change", pageIndex)
            .on("unlink", pageIndex)
            .on("addDir", paging)
            .on("ready", () => {
               ready = true;
            });

         // on components
         chokidar
            .watch(components, {
               ignored: /(^|[\/\\])\../, // ignore dotfiles
               persistent: true,
               cwd,
            })
            .on("add", cmpIndex)
            // .on("change", cmpIndex)
            .on("unlink", cmpIndex)
            .on("addDir", cmpIndex);
      });
      resolve();
   });
}

function getFiles(dir) {
   return fs
      .readdirSync(dir)
      .filter(
         (f) =>
            f.endsWith(".svelte") || fs.lstatSync(`${dir}/${f}`).isDirectory()
      )
      .map((p) =>
         fs.lstatSync(`${dir}/${p}`).isDirectory()
            ? getFiles(`${dir}/${p}`)
            : `${dir}/${p}`
      )
      .flat();
}

// create routes
function createRoutes() {
   if (!autoroute) return;
   const findRoute = (dir) => {
      return fs
         .readdirSync(dir)
         .filter(
            (f) =>
               f.match(/[A-Z]\w+.svelte/) ||
               fs.lstatSync(`${dir}/${f}`).isDirectory()
         )
         .map((p) =>
            fs.lstatSync(`${dir}/${p}`).isDirectory()
               ? findRoute(`${dir}/${p}`)
               : `${dir}/${p}`
         )
         .flat()
         .sort();
   };
   let files = findRoute(pages);
   let decl = "";
   let declRoutes = "\nexport default [\n";
   files.map((x) => {
      let cmp = x.replace(pages, "").replaceAll("/", "").replace(".svelte", "");
      let path = x
         .toLowerCase()
         .replace(pages, "")
         .replace(".svelte", "")
         .split("/")
         .join("/");
      if (cmp === "Index") path = "/";
      else path = path.replace("/index", "/:page");
      cmp = cmp.replace("+", "");
      path = path.replace("+", "");
      decl += `import ${cmp} from "${x.replace("src", ".")}";\n`;
      declRoutes += `\t{ path: "${path}", page: ${cmp} },\n`;
   });
   declRoutes += "]";
   // console.log(decl + declRoutes);
   writeFile("src/routes.js", decl + declRoutes);
}

// on components
let delayCmps = false;
function cmpIndex(filepath) {
   if (!ready || delayCmps) return;
   delayCmps = true;
   filepath = filepath.replace(/\\/g, "/");
   let dir = filepath.split("/").slice(0, 2).join("/");
   setTimeout(() => {
      delayCmps = false;
      let files = getFiles(dir);
      files = files
         .filter((x) => x.endsWith(".svelte"))
         .map((x) => x.split("/").splice(2).join("/"));
      let content = "";
      files.map((file) => {
         let fname = file.split("/").splice(-1)[0].replace(".svelte", "");
         let cmp = fname[0].toUpperCase() + fname.slice(1);
         content += `export { default as ${cmp} } from "./${file}";\n`;
      });
      // console.log(content);
      if (content) writeFile(dir + "/index.js", content);
   }, 500);
}

// on pages
function paging(dir) {
   if (!ready) return;
   dir = dir.replace(/\\/g, "/");
   if (dir === pages) return;
   writeFile(
      dir + "/+home.svelte",
      "<script>\n</script>\n\n<article>\n\t<h1>Home</h1>\n</article>",
      1
   );
   writeFile(
      dir + "/pages.js",
      "export { default as home } from './+home.svelte';",
      1
   );
   writeFile(dir + "/Index.svelte", tplPages(), 1);
   createRoutes();
}

// on src/pages
let delayPages = false;
function pageIndex(filepath) {
   if (!ready || delayPages) return;
   filepath = filepath.replace(/\\/g, "/");
   if (!filepath.includes("/+") || !filepath.endsWith(".svelte")) return;
   let split = filepath.split("/+");
   let dir = split[0];
   if (dir === pages) return;
   delayPages = true;
   setTimeout(() => {
      delayPages = false;
      if (!fs.existsSync(dir)) return;
      let fnames = fs.readdirSync(dir);
      let content = "";
      fnames.map((fname) => {
         if (fname.includes("+") && fname.endsWith(".svelte")) {
            let cmp = fname
               .replace(".svelte", "")
               .replace("+", "")
               .toLowerCase();
            content += `export { default as ${cmp} } from "./${fname}";\n`;
         }
      });
      if (content) writeFile(dir + "/pages.js", content);
   }, 16);
}

async function build() {
   const ctx = await esbuild.context({
      entryPoints: ["src/main.js"],
      bundle: true,
      minify: !dev,
      outdir,
      plugins: [sveltePlugin(), sassPlugin()],
      ...esbuildConfig,
   });

   await ctx.watch();

   if (!dev) return ctx.dispose();
}

function writeFile(filepath, content, check) {
   if (check && fs.existsSync(filepath)) return;
   return new Promise((resolve, reject) => {
      try {
         resolve(fs.writeFileSync(filepath, content));
      } catch (err) {
         console.log(err);
         reject();
      }
   });
}

function tplPages() {
   return `<script>
   import * as pages from "./pages";
   import { E404 } from "src";
   export let params = {};

   let page;

   $: params, (page = !params.page ? pages.home : pages[params.page?.replace(/[^a-zA-Z0-9_]/g, "_")]);
</script>

{#if page}
   <svelte:component this={page} {params} />
{:else}
   <E404 />
{/if}`;
}

run();

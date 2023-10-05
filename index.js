const path = require("path");

const cwd = process.cwd();
const watch = process.argv.includes("-w");

const start = () => {
   const server = require("child_process").spawn("node", [path.join(cwd, "../app.js"), "--", watch ? "-w" : ""], {
      stdio: ["ignore", "inherit", "inherit"],
      shell: true,
   });
   if (watch)
      server.on("close", (code) => {
         if (code === 9) {
            start();
         }
      });
};

start();

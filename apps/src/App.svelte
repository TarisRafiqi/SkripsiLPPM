<script>
   import { onDestroy } from "svelte";
   import Router from "../../router";
   import routes from "./routes";
   import { route } from "./store";

   import { E404, Sidebar, Navbar } from "@cmp";
   import Bulmanavbar from "./modules/Bulmanavbar.svelte";

   let cmp, params;
   let token, role;

   const router = Router(routes, E404, (route) => {
      cmp = route.page;
      params = route.params;

      // auth = localStorage.getItem("auth");
      token = localStorage.getItem("token");
      role = localStorage.getItem("role");
   });

   $route = router.route;
   $route(location.pathname + location.search);

   router.listen();

   onDestroy(router.unlisten);

   // $: auth = localStorage.getItem("auth");

   if (location.pathname === "/") {
      if (!token) $route("/");
      else {
         if (role === "admin") $route("/admin");
         else $route("/dosen");
      }
   }

   $: location.pathname,
      () => {
         if (location.pathname === "/") {
         }
      };
</script>

<Bulmanavbar />
{#if token}
   <Sidebar />
{/if}

{#if cmp}
   <main>
      <svelte:component this={cmp} {params} />
   </main>
{/if}

<style>
   :global(aside ~ main) {
      margin-left: var(--wide);
   }
</style>

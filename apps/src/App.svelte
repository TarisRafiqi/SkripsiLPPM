<script>
   import { onDestroy } from "svelte";
   import Router from "../../router";
   import routes from "./routes";
   import { route } from "./store";

   import { E404, Sidebar } from "@cmp";

   let cmp, params;
   let auth, role;

   const router = Router(routes, E404, (route) => {
      cmp = route.page;
      params = route.params;

      auth = sessionStorage.getItem("auth");
      role = sessionStorage.getItem("role");
   });

   $route = router.route;
   $route(location.pathname);

   router.listen();

   onDestroy(router.unlisten);

   // $: auth = sessionStorage.getItem("auth");

   if (location.pathname === "/") {
      if (!auth) $route("/about");
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

{#if auth}
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

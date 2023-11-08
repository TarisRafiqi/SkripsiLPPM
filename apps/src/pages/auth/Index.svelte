<script>
   import * as pages from "./pages";
   import { E404 } from "src";
   import { route } from "../../store";

   export let params = {};

   let page;

   console.log("Muncul:",params["1"])

   if (params["1"]) {
      console.log(params["1"])
      // GET verify token to API => /api/verify | bearer
      // https://reqbin.com/code/javascript/ricgaie0/javascript-fetch-bearer-token
      // fetch('https://reqbin.com/echo/get/json', {
      //    headers}
      // })
      // Must reply 
      // - token_status: valid
      // - role
      // if token valid save token to session storage;
      // --  
      /*
         if (role === "admin") $route("/admin");
         else $route("/dosen");
      */

      // $route('/dosen')
      // $route("/admin");
   } 

   $: params, (page = !params.page ? pages.home : pages[params.page?.replace(/[^a-zA-Z0-9_]/g, "_")]);
</script>

{#if page}
   <svelte:component this={page} {params} />
{:else}
   <E404 />
{/if}
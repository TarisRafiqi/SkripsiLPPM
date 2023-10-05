<script>
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
{/if}
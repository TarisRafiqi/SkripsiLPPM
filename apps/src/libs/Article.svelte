<script>
   import { fade, fly } from "svelte/transition";
</script>

<article in:fade>
   <slot />
</article>

<style>
   article {
      margin-top: 3.5rem;
      /* background-color: lightblue; */
   }
</style>

<script>
   import { fade, fly } from "svelte/transition";
</script>

<article in:fade>
   <slot />
</article>

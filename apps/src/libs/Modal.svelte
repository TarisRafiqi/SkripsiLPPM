<script>
   export let show = false;

   function handleClick() {
      console.log(show);
      show = false;
   }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<b class:show on:click={handleClick}>
   <div>
      <slot name="header" />
      <hr />
      <slot />
   </div>
</b>

<style>
   b {
      display: block;
      font-weight: normal;
      z-index: 17;
      position: fixed;
      display: flex;
      align-items: center;
      justify-content: center;
      inset: 0;
      background-color: rgba(0, 0, 0, 0);
      visibility: hidden;
   }

   b.show {
      background-color: rgba(0, 0, 0, 0.7);
      visibility: visible;
   }

   div {
      padding: 1em 1.5em;
      max-width: 32em;
      background: white;
   }
</style>

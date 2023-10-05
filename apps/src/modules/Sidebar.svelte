<script>
   import menu from "../store/menu";

   // get group info
   const role = sessionStorage.getItem("role");

   let items;
   if (role === "admin") items = menu["admin"];
   else items = menu["dosen"];
</script>

<aside>
   {#if items}
      <header>Profile</header>
      <!-- svelte-ignore component-name-lowercase -->
      <menu>
         {#each items as item}
            <a href={item.href}>{item.title}</a>
         {/each}
      </menu>
      <footer>Info</footer>
   {/if}
</aside>

<style>
   aside {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: fixed;
      top: 0;
      bottom: 0;
      color: var(--sb-color);
      background: var(--sb-background);
      width: var(--wide);
   }

   menu {
      padding: 0.5rem 1rem;
      flex: 1;
   }

   a {
      display: flex;
      align-items: center;
      height: 2em;
      flex-wrap: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
   }
</style>

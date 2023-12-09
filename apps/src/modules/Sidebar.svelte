<script>
   import menu from "../store/menu";

   // get group info
   const role = localStorage.getItem("role");

   let items;
   if (role === "admin") items = menu["admin"];
   else items = menu["dosen"];
</script>

<!-- <aside>
   {#if items}
      <header>Profile</header>
      svelte-ignore component-name-lowercase
      <menu>
         {#each items as item}
            <a href={item.href}>{item.title}</a>
         {/each}
      </menu>
   {/if}
</aside> -->

<aside class="menu">
   <!-- Container Photo Profile -->
   <!-- <div class="box">
      <figure class="image is-128x128">
         <img
            class="is-rounded"
            src="https://bulma.io/images/placeholders/128x128.png"
            alt="Profile Photo"
         />
      </figure>
      <br />
      <p class="title is-6">Yourname</p>
      <p class="subtitle is-6">yourname@gmail.com</p>
   </div> -->

   <p class="menu-label">General</p>
   {#each items as item}
      <ul class="menu-list">
         <!-- svelte-ignore a11y-missing-attribute -->
         <li><a href={item.href}>{item.title}</a></li>
      </ul>
   {/each}

   <p class="menu-label">Website Settings</p>
   <ul class="menu-list">
      <!-- svelte-ignore a11y-missing-attribute -->
      <li><a>Pengumuman</a></li>
      <!-- svelte-ignore a11y-missing-attribute -->

      <li><a>About UISI</a></li>
      <!-- svelte-ignore a11y-missing-attribute -->

      <!-- <button class="button is-normal is-fullwidth">Logout</button> -->
   </ul>
</aside>

<style>
   .menu-label {
      color: white;
   }
   aside {
      /* padding-top: 3.5rem; */
      padding-top: 5rem;
      padding-left: 1rem;
      padding-right: 1rem;
      color: var(--sb-color);
      background: var(--sb-background);
      width: var(--wide);
      display: flex;
      flex-direction: column;
      /* justify-content: space-between; */
      position: fixed;
      top: 0;
      bottom: 0;
   }

   /* aside {
      margin-top: 3.5rem;
      padding-top: 3.5rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: fixed;
      top: 0;
      bottom: 0;
      color: var(--sb-color);
      background: var(--sb-background);
      width: var(--wide);
   } */

   /* menu {
      padding: 0.5rem 1rem;
      flex: 1;
   } */

   a {
      color: white;
      /* display: flex; */
      /* align-items: center; */
      /* height: 2em; */
      /* flex-wrap: nowrap; */
      /* overflow: hidden; */
      /* text-overflow: ellipsis; */
   }
</style>

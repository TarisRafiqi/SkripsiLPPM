<script>
   function handleLogout(ev) {
      sessionStorage.clear();
      location.pathname = "/";
   }
</script>

<nav>
   <a href="/">Home</a>
   <a href="/about">About</a>
   <a href="/dashboard">Dashboard</a>
   <!-- svelte-ignore a11y-click-events-have-key-events -->
   <!-- svelte-ignore a11y-no-static-element-interactions -->
   <!-- svelte-ignore a11y-missing-attribute -->
   <a on:click={handleLogout}>Logout</a>
   <a href="/404">404</a>
</nav>

<style>
   nav {
      display: flex;
      gap: 0.5rem;
   }

   a {
      cursor: pointer;
   }
</style>

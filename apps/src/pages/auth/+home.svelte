<script>
   export let params;
   // console.log(params);
   const token = params.token || null;
   // console.log(params.username);

   if (token) {
      // save to local storage
      // localStorage.setItem("")
      // localStorage.setItem("token", token);
      // localStorage.setItem("role", params.role);
      localStorage.setItem("username", params.username);
   }
</script>

<article>
   <h1>Auth Google</h1>
</article>

<script>
   import { route } from "../../store";

   export let params;
   // console.log(params);
   const token = params.token || null;
   // console.log(params.username);

   if (token) {
      // save to local storage
      // localStorage.setItem("")
      localStorage.setItem("id", params.id);
      localStorage.setItem("username", params.username);
      localStorage.setItem("role", params.role);
      localStorage.setItem("token", params.token);
      // if (role === "admin") $route("/admin");
      // else $route("/dosen");
   }
</script>

<article>
   <h1>Auth Google</h1>
</article>

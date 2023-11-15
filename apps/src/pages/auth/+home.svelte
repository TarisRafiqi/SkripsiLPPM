<script>
   import { route } from "../../store";

   export let params;
   // console.log(params);
   const token = params.token || null;
   // console.log(params.username);

   if (token) {
      // save to local storage
      // localStorage.setItem("")
      localStorage.setItem("token", params.token);
      localStorage.setItem("id", params.id);
      localStorage.setItem("role", params.role);
      localStorage.setItem("username", params.username);
      // if (role === "admin") $route("/admin");
      // else $route("/dosen");
   }
</script>

<article>
   <h1>Auth Google</h1>
</article>

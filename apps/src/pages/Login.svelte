<script>
   import { route } from "../store";

   let username = "admin";
   let password = "1234";

   async function handleSubmit(ev) {
      const payload = {
         method: "post",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            username,
            password,
         }),
      };

      const response = await fetch("/api/auth", payload);
      const result = await response.json();
      console.log(result);

      if (result.sukses) {
         const { id, username, role, token } = result;
         sessionStorage.setItem("id", id);
         sessionStorage.setItem("username", username);
         sessionStorage.setItem("role", role);
         sessionStorage.setItem("auth", token);
         if (role === "admin") $route("/admin");
         else $route("/dosen");
      }
   }
</script>

<article class="container">
   <div class="box">
      <h2>LOGIN</h2>
      <div>
         <div>Username</div>
         <input type="text" bind:value={username} />
      </div>
      <div>
         <div>Password</div>
         <input type="password" bind:value={password} />
      </div>
      <div>
         <br />
         <button on:click={handleSubmit}>Submit</button>
      </div>
   </div>
</article>

<style>
   article.container {
      text-align: center;
   }

   div.box {
      display: inline-flex;
      flex-direction: column;
      gap: 0.5rem;
   }

   div.box div {
      text-align: left;
   }

   button {
      width: 100%;
   }
</style>

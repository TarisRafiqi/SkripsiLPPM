<script>
   import { route } from "../store";

   let username = "dosen";
   let email = "";

   async function handleSubmit(ev) {
      const payload = {
         method: "post",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            username,
            email,
         }),
      };

      const response = await fetch("/api/user", payload);
      const result = await response.json();

      if (response.ok) {
         console.log(result);
         localStorage.setItem("code", result.code);
         $route("/verify");
      } else {
         console.log(result);
      }
   }

   $: username, (email = username + "@pt.ac.id");
</script>

<article class="container">
   <div class="box">
      <h2>REGISTER</h2>
      <div>
         <div>Username</div>
         <input type="text" bind:value={username} />
      </div>
      <div>
         <div>Email</div>
         <input type="email" bind:value={email} />
      </div>
      <div>
         <br />
         <button on:click={handleSubmit}>Register</button>
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

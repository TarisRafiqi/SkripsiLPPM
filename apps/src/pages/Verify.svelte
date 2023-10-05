<script>
   import { route } from "../store";

   let username = "dosen";
   let code = sessionStorage.getItem("code");
   let password = "1234";

   async function handleSubmit(ev) {
      const payload = {
         method: "post",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            username,
            code,
            password,
         }),
      };

      const response = await fetch("/api/verify", payload);

      if (response.status === 204) {
         console.log("Gagal");
      } else if (response.status === 200) {
         console.log("sukses");
         $route("/login");
      }
   }
</script>

<article class="container">
   <div class="box">
      <h2>VERIFY USER</h2>
      <p>Code: <b>{code}</b></p>
      <div>
         <div>Username</div>
         <input type="text" bind:value={username} />
      </div>
      <div>
         <div>Code</div>
         <input type="text" bind:value={code} />
      </div>
      <div>
         <div>Password</div>
         <input type="password" bind:value={password} />
      </div>
      <div>
         <br />
         <button on:click={handleSubmit}>Verify</button>
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

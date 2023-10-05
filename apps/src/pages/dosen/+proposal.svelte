<script>
   import { Field } from "@cmp";
   import { route } from "../../store";

   let judul = "";
   let abstrak = "";

   const id = Number(sessionStorage.getItem("id"));

   async function simpanProposal() {
      let payload = {
         id,
         judul,
         abstrak,
         status: 0,
      };

      const response = await fetch("/api/ppm", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
         $route("/dosen");
      } else {
         console.log(result.msg);
      }
   }

   async function submitProposal() {
      let payload = {
         id,
         judul,
         abstrak,
         status: 2,
      };

      const response = await fetch("/api/ppm", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
         $route("/dosen");
      } else {
         console.log(result.msg);
      }
   }
</script>

<article>
   <h1>Proposal</h1>

   <br />

   <Field name="Judul" bind:value={judul} />
   <Field textarea name="Abstrak" bind:value={abstrak} />

   <br />
   <Field>
      <button on:click={simpanProposal}>Simpan</button>
      <button on:click={submitProposal}>Submit</button>
   </Field>
</article>

<script>
   import { Field } from "@cmp";
   import { route } from "../../store";
   import Editor from "@tinymce/tinymce-svelte";

   let judul = "";
   let abstrak = "";
   let tahunPelaksanaan = "";
   let kodeProgram = "";

   const id = Number(localStorage.getItem("id"));

   async function simpanProposal() {
      const accessToken = localStorage.getItem("token");

      let payload = {
         id,
         judul,
         abstrak,
         status: 0,
         tahunPelaksanaan,
      };

      const response = await fetch("/api/ppm", {
         method: "POST",
         headers: {
            Authorization: `${accessToken}`,
            "Content-Type": "application/json",
         },
         body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
         console.log(result);
         // return;
         $route("/dosen");
      } else {
         console.log(result.msg);
      }
   }

   async function submitProposal() {
      const accessToken = localStorage.getItem("token");

      let payload = {
         id,
         judul,
         abstrak,
         status: 2,
         tahunPelaksanaan,
      };

      const response = await fetch("/api/ppm", {
         method: "POST",
         headers: {
            Authorization: `${accessToken}`,
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

   let listKodeProgram = [
      {
         idKodeProgram: "1",
         namaProgram: "Skema Riset Kelompok Keahlian",
      },
      {
         idKodeProgram: "2",
         namaProgram: "Skema Riset Terapan",
      },
      {
         idKodeProgram: "3",
         namaProgram: "Skema Riset Kerjasama",
      },
      {
         idKodeProgram: "4",
         namaProgram: "Skema Riset Mandiri",
      },
      {
         idKodeProgram: "5",
         namaProgram: "Skema Riset Hibah Eksternal",
      },
   ];

   function goSelect(el) {
      // console.log(el);
      let valueId = el.value;
      // console.log(valueId);
   }
</script>

<article>
   <h1>Proposal</h1>

   <br />

   <select>
      {#each listKodeProgram as it}
         <option value={it.idKodeProgram} use:goSelect>{it.namaProgram}</option>
      {/each}
   </select>

   <Field datepicker name="Tahun Pelaksanaan" bind:value={tahunPelaksanaan} />
   <!-- <Field select name="Kode Program" bind:value={kodeProgram} /> -->
   <Field name="Judul" bind:value={judul} />
   <Field textarea name="Abstrak" bind:value={abstrak} />
   <!-- <Editor /> -->

   <br />
   <Field>
      <button on:click={simpanProposal}>Simpan</button>
      <button on:click={submitProposal}>Submit</button>
   </Field>
</article>

<style>
</style>

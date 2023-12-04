<script>
   import { onMount } from "svelte";
   import { Field } from "@cmp";
   import { route } from "../../store";
   import Editor from "@tinymce/tinymce-svelte";

   let judul = "";
   let abstrak = "";
   let tahunPelaksanaan = "";
   let kodeProgram = "";
   let myAbstract;

   const id = Number(localStorage.getItem("id"));

   onMount(() => {
      tinymce.init({
         selector: "textarea",
         plugins:
            "ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss",
         toolbar:
            "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
         tinycomments_mode: "embedded",
         tinycomments_author: "Author name",
         mergetags_list: [
            { value: "First.Name", title: "First Name" },
            { value: "Email", title: "Email" },
         ],
         ai_request: (request, respondWith) =>
            respondWith.string(() =>
               Promise.reject("See docs to implement AI Assistant")
            ),
      });
   });

   async function simpanProposal() {
      const accessToken = localStorage.getItem("token");
      myAbstract = tinymce.get("abstract").getContent();

      console.log(myAbstract);

      let payload = {
         id,
         judul,
         myAbstract,
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

   // $: abstrak, console.log(abstrak);
   // $: judul, console.log(judul);
</script>

<article>
   <h1>Proposal</h1>

   <br />

   <!-- <Editor apiKey="your-tiny-cloud-api-key" /> -->

   <!-- <select>
      {#each listKodeProgram as it}
         <option value={it.idKodeProgram} use:goSelect>{it.namaProgram}</option>
      {/each}
   </select> -->

   <Field datepicker name="Tahun Pelaksanaan" bind:value={tahunPelaksanaan} />
   <!-- <Field select name="Kode Program" bind:value={kodeProgram} /> -->
   <Field name="Judul" bind:value={judul} />
   <Field id="abstract" textarea name="Abstrak" />
   <!-- <Editor /> -->

   <br />
   <Field>
      <button on:click={simpanProposal}>Simpan</button>
      <button on:click={submitProposal}>Submit</button>
   </Field>

   <!-- <textarea> Welcome to TinyMCE! </textarea> -->
</article>

<style>
</style>

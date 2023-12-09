<script>
   import { onMount } from "svelte";
   import { Field, Article, Icon, Status } from "@cmp";
   import { route } from "../../store";
   import Editor from "@tinymce/tinymce-svelte";

   // let abstrak = "";
   let test = "";

   let jenisKegiatan = "";
   let jenisProposal = "";
   let jenisSkema = "";
   let kelompokKeahlian = "";
   let judul = "";
   let tahunPelaksanaan = "";
   let Topik = "";
   let biayaPenelitian = "";
   let anggotaTim = "";
   let rab = "";

   let myAbstract;
   let myIsi;

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
      myIsi = tinymce.get("isi").getContent();

      let payload = {
         id,
         judul,
         myAbstract,
         myIsi,
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
      myAbstract = tinymce.get("abstract").getContent();
      myIsi = tinymce.get("isi").getContent();

      let payload = {
         id,
         judul,
         myAbstract,
         myIsi,
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

<Article>
   <h1 class="title is-1">Buat Proposal</h1>
   <hr />

   <br />

   <div class="field">
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label class="label">Name</label>
      <div class="control">
         <input class="input" type="text" placeholder="Text input" />
      </div>
   </div>

   <Field select name="Judul" bind:value={test} />

   <Field name="Judul" bind:value={judul} />
   <Field id="abstract" textarea name="Abstrak" />
   <Field id="isi" textarea name="Isi Proposal" />

   <Field select name="Jenis Kegiatan" bind:value={jenisKegiatan} />
   <Field select name="Jenis Skema" bind:value={jenisSkema} />
   <Field select name="Jenis Proposal" bind:value={jenisProposal} />
   <Field select name="Kelompok Keahlian" bind:value={kelompokKeahlian} />
   <Field datepicker name="Tahun Pelaksanaan" bind:value={tahunPelaksanaan} />
   <Field select name="Topik" bind:value={Topik} />
   <Field select name="Biaya Penelitian" bind:value={biayaPenelitian} />
   <Field select name="Anggota Tim" bind:value={anggotaTim} />
   <Field select name="Rincian Anggaran Biaya (RAB)" bind:value={rab} />

   <br />
   <Field>
      <button class="button is-info is-light" on:click={simpanProposal}
         >Simpan</button
      >
      <button class="button is-info" on:click={submitProposal}>Submit</button>
   </Field>

   <!-- <textarea> Welcome to TinyMCE! </textarea> -->
</Article>

<style>
</style>

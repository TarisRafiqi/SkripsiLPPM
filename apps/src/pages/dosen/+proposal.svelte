<script>
   import { onMount } from "svelte";
   import { Field, Article, Icon, Status } from "@cmp";
   import { route } from "../../store";
   import { uploadIcon, deleteIcon } from "../../store/icons";
   // import Editor from "@tinymce/tinymce-svelte";

   let value;
   let label;

   let jenisKegiatan = "";
   let jenisProposal = "";
   let jenisSkema = "";
   let kelompokKeahlian = "";
   let judul = "";
   let tahunPelaksanaan = "";
   let topik = "";
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
            "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount ",
         toolbar:
            "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
         tinycomments_mode: "embedded",
         tinycomments_author: "Author name",
         mergetags_list: [
            { value: "First.Name", title: "First Name" },
            { value: "Email", title: "Email" },
         ],
         // ai_request: (request, respondWith) =>
         //    respondWith.string(() =>
         //       Promise.reject("See docs to implement AI Assistant")
         //    ),
      });
   });

   async function simpanProposal() {
      const accessToken = localStorage.getItem("token");
      myAbstract = tinymce.get("abstract").getContent();
      myIsi = tinymce.get("isi").getContent();

      let payload = {
         id,
         jenisProposal,
         jenisKegiatan,
         jenisSkema,
         kelompokKeahlian,
         topik,
         tahunPelaksanaan,
         // biayaPenelitian,
         // anggotaTim,
         // rab,
         judul,
         myAbstract,
         myIsi,
         status: 0,
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
      // return;

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
         jenisProposal,
         jenisKegiatan,
         jenisSkema,
         kelompokKeahlian,
         topik,
         tahunPelaksanaan,
         // biayaPenelitian,
         // anggotaTim,
         // rab,
         judul,
         myAbstract,
         myIsi,
         status: 2,
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

      // console.log(result);
      // return;

      if (response.ok) {
         $route("/dosen");
      } else {
         console.log(result.msg);
      }
   }

   function goSelect(el) {
      // console.log(el);
      let valueId = el.value;
      // console.log(valueId);
   }
</script>

<Article>
   <h1 class="title is-1">Buat Proposal</h1>
   <hr />

   <Field name="Jenis Proposal">
      <div class="select is-fullwidth">
         <select bind:value={jenisProposal}>
            <option value="" selected disabled hidden
               >Pilih Jenis Proposal</option
            >
            <option selected value="Proposal Awal">Proposal Awal</option>
            <option value="Proposal Lanjutan">Proposal Lanjutan</option>
         </select>
      </div>
   </Field>

   <Field name="Jenis Kegiatan">
      <div class="select is-fullwidth">
         <select bind:value={jenisKegiatan}>
            <option value="" selected disabled hidden
               >Pilih Jenis Kegiatan</option
            >
            <option value="Penelitian">Penelitian</option>
            <option value="Pengabdian Masyarakat">Pengabdian Masyarakat</option>
         </select>
      </div>
   </Field>

   <Field name="Jenis Skema">
      <div class="select is-fullwidth">
         <select bind:value={jenisSkema}>
            <option value="" selected disabled hidden
               >Pilih Jenis Skema
            </option>
            {#if jenisKegiatan === "Penelitian"}
               <!-- <optgroup label="Skema Penelitian"> -->
               <option value="HRKK">Riset Kelompok Keahlian</option>
               <option value="HRT">Riset Terapan</option>
               <option value="HRK">Riset Kerjasama</option>
               <option value="RM">Riset Mandiri</option>
               <option value="RE">Riset Eksternal</option>
               <!-- </optgroup> -->
            {:else}
               <!-- <optgroup label="Skema Pengabdian Masyarakat"> -->
               <option value="HPMDB">Pengabdian Masyarakat Desa Binaan</option>
               <option value="HPMUB">Pengabdian Masyarakat UMKM Binaan</option>
               <option value="PMM">Pengabdian Masyarakat Mandiri</option>
               <option value="PMHE"
                  >Pengabdian Masyarakat Hibah Eksternal</option
               >
               <!-- </optgroup> -->
            {/if}
         </select>
      </div>
   </Field>

   <Field name="Kelompok Keahlian">
      <input
         class="input"
         type="text"
         placeholder="Masukkan Kelompok Keahlian"
         bind:value={kelompokKeahlian}
      />
   </Field>

   <Field name="Topik">
      <input
         class="input"
         type="text"
         placeholder="Masukkan Topik"
         bind:value={topik}
      />
   </Field>

   <Field datepicker name="Tahun Pelaksanaan" bind:value={tahunPelaksanaan} />

   <Field name="Biaya Penelitian">
      <input
         class="input"
         type="text"
         placeholder="Masukkan Biaya Penelitian"
         bind:value={biayaPenelitian}
      />
   </Field>

   <Field select name="Rincian Anggaran Biaya (RAB)" bind:value={rab}>
      <div class="file">
         <label class="file-label">
            <input class="file-input" type="file" name="resume" />
            <span class="file-cta">
               <span class="file-icon">
                  <Icon id="orang" src={uploadIcon} />
               </span>
               <span class="file-label"> Upload File </span>
            </span>
         </label>
      </div>
   </Field>

   <Field name="Anggota Tim">
      <input
         class="input"
         type="text"
         placeholder="Tambahkan Anggota Tim"
         bind:value={anggotaTim}
      />
   </Field>

   <!-- <Field name="Anggota Tim"> -->
   <!-- <Select {items} {value} on:select={handleSelect}></Select> -->
   <!-- <Select {items}></Select> -->
   <!-- </Field> -->

   <br />

   <table class="table is-fullwidth is-striped is-hoverable is-bordered">
      <thead>
         <tr>
            <th class="is-narrow">Action</th>
            <th>Status</th>
            <th>Nama</th>
         </tr>
      </thead>
      <tbody>
         <tr>
            <td></td>
            <td>Ketua</td>
            <td>...</td>
         </tr>
         <tr>
            <td
               ><button class="button is-danger is-rounded is-small"
                  ><span class="icon">
                     <Icon id="delete" src={deleteIcon} />
                  </span></button
               ></td
            >
            <td>Anggota</td>
            <td>...</td>
         </tr>
      </tbody>
   </table>

   <!-- <Field select name="Anggota Tim" bind:value={anggotaTim} /> -->

   <hr />

   <Field name="Judul">
      <input
         class="input"
         type="text"
         placeholder="Masukkan Judul"
         bind:value={judul}
      />
   </Field>

   <Field id="abstract" textarea name="Abstrak" />
   <Field id="isi" textarea name="Isi Proposal" />

   <br />

   <Field>
      <button class="button is-info is-light" on:click={simpanProposal}
         >Simpan</button
      >
      <button class="button is-info" on:click={submitProposal}>Submit</button>
   </Field>

   <!-- <textarea> Welcome to TinyMCE! </textarea> -->
</Article>

<!-- <style>
   select:required:invalid {
      color: rgb(201, 201, 201);
   }
   option[value=""][disabled] {
      display: none;
   }
   option {
      color: black;
   }
</style> -->

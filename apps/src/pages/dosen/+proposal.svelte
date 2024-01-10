<script>
   import { onMount } from "svelte";
   import { Field, Article, Icon, Status } from "@cmp";
   import { route } from "../../store";
   import { uploadIcon, deleteIcon } from "../../store/icons";
   // import Editor from "@tinymce/tinymce-svelte";
   import Select from "src/libs/Select.svelte";

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
   let anggotaTim = [];
   let rab = "";
   let randomFileName = "";

   let myAbstract;
   let myIsi;

   const id = Number(localStorage.getItem("id"));
   let items = [];
   let file;

   // let result = [];
   // let listAnggota = [];

   onMount(async () => {
      const accessToken = localStorage.getItem("token");

      const headers = {
         Authorization: `${accessToken}`,
         "Content-Type": "application/json",
      };

      const response = await fetch("/api/pilihUser", {
         method: "GET",
         headers: headers,
      });

      const result = await response.json();
      // return;

      if (response.ok) {
         listUser = result;
         //console.log(listUser[0]);
         items = [];
         for (const [key, value] of Object.entries(listUser)) {
            items.push({
               value: value.uid,
               label: value.nama_lengkap,
            });
         }
      } else {
         console.log(response);
         // console.log("gagal");
      }

      //_______________________________________________________________________
      // Generate Random Character
      const characters =
         "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let resultxx = "";

      for (let i = 0; i < 30; i++) {
         const randomIndex = Math.floor(Math.random() * characters.length);
         resultxx += characters.charAt(randomIndex);
      }

      randomFileName = resultxx;
   });

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

   function formatRupiah(angka, prefix) {
      var number_string = angka.replace(/[^,\d]/g, "").toString(),
         split = number_string.split(","),
         sisa = split[0].length % 3,
         rupiah = split[0].substr(0, sisa),
         ribuan = split[0].substr(sisa).match(/\d{3}/gi);

      if (ribuan) {
         separator = sisa ? "." : "";
         rupiah += separator + ribuan.join(".");
      }

      rupiah = split[1] !== undefined ? rupiah + "," + split[1] : rupiah;
      return prefix === undefined ? rupiah : rupiah ? "Rp. " + rupiah : "";
   }

   async function simpanProposal() {
      const accessToken = localStorage.getItem("token");
      myAbstract = tinymce.get("abstract").getContent();
      myIsi = tinymce.get("isi").getContent();

      // -----------------------------------------------------------------------------//
      const reader = new FileReader();
      reader.onloadend = async () => {
         const base64Data = reader.result.split(",")[1];
         const payloadfile = {
            file: {
               name: file.name,
               type: file.type,
               data: base64Data,
            },
            randomFileName,
         };

         try {
            const response = await fetch("/api/upload", {
               method: "POST",
               headers: {
                  Authorization: `${accessToken}`,
                  "Content-Type": "application/json",
               },
               body: JSON.stringify(payloadfile),
            });
            const result = await response.json();
            console.log(result);
         } catch (error) {
            console.error("Error uploading file:", error);
         }
      };
      reader.readAsDataURL(file);
      // -----------------------------------------------------------------------------//

      let payload = {
         id,
         jenisProposal,
         jenisKegiatan,
         jenisSkema,
         kelompokKeahlian,
         topik,
         tahunPelaksanaan,
         biayaPenelitian,
         anggotaTim,
         // rab,
         judul,
         myAbstract,
         myIsi,
         status: 0,
         randomFileName,
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
         // console.log(result);
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

      // -----------------------------------------------------------------------------//
      const reader = new FileReader();
      reader.onloadend = async () => {
         const base64Data = reader.result.split(",")[1];
         const payloadfile = {
            file: {
               name: file.name,
               type: file.type,
               data: base64Data,
            },
            randomFileName,
         };

         try {
            const response = await fetch("/api/upload", {
               method: "POST",
               headers: {
                  Authorization: `${accessToken}`,
                  "Content-Type": "application/json",
               },
               body: JSON.stringify(payloadfile),
            });
            const result = await response.json();
            console.log(result);
         } catch (error) {
            console.error("Error uploading file:", error);
         }
      };
      reader.readAsDataURL(file);
      // -----------------------------------------------------------------------------//

      let payload = {
         id,
         jenisProposal,
         jenisKegiatan,
         jenisSkema,
         kelompokKeahlian,
         topik,
         tahunPelaksanaan,
         biayaPenelitian,
         anggotaTim,
         // rab,
         judul,
         myAbstract,
         myIsi,
         status: 2,
         randomFileName,
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

   function deleteMember(e) {
      // console.log(e.target);
      // console.log(e.target.getAttribute("data-value"));
      let uid = e.target.getAttribute("data-value");
      anggotaTim = anggotaTim.filter((member) => {
         console.log(member.value, uid);
         return member.value !== uid;
      });
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
               <option value="Riset Kelompok Keahlian"
                  >Riset Kelompok Keahlian</option
               >
               <option value="Riset Terapan">Riset Terapan</option>
               <option value="Riset Kerjasama">Riset Kerjasama</option>
               <option value="Riset Mandiri">Riset Mandiri</option>
               <option value="Riset Eksternal">Riset Eksternal</option>
               <!-- </optgroup> -->
            {:else}
               <!-- <optgroup label="Skema Pengabdian Masyarakat"> -->
               <option value="Pengabdian Masyarakat Desa Binaan"
                  >Pengabdian Masyarakat Desa Binaan</option
               >
               <option value="Pengabdian Masyarakat UMKM Binaan"
                  >Pengabdian Masyarakat UMKM Binaan</option
               >
               <option value="Pengabdian Masyarakat Mandiri"
                  >Pengabdian Masyarakat Mandiri</option
               >
               <option value="Pengabdian Masyarakat Hibah Eksternal"
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
         on:keyup={() =>
            (biayaPenelitian = formatRupiah(biayaPenelitian, "Rp. "))}
      />
   </Field>

   <Field name="Rencana Anggaran Biaya">
      <input
         class="input"
         accept=".xlsx"
         type="file"
         on:change={(e) => (file = e.target.files[0])}
      />
   </Field>

   <Field name="Anggota Tim">
      <Select start="2" {items} bind:result={anggotaTim} />
   </Field>

   <br />

   <table class="table is-fullwidth is-striped is-hoverable is-bordered">
      <thead>
         <tr>
            <th class="is-narrow">Action</th>
            <th class="is-narrow">Status</th>
            <th>Nama</th>
         </tr>
      </thead>
      <tbody>
         <tr>
            <td></td>
            <td>Ketua</td>
            <td>...</td>
         </tr>
         {#if anggotaTim.length > 0}
            {#each anggotaTim as member}
               <tr>
                  <td
                     ><button
                        class="button is-danger is-rounded is-small"
                        data-value={member.value}
                        on:click={deleteMember}
                        ><span class="icon">
                           <Icon id="delete" src={deleteIcon} />
                        </span></button
                     ></td
                  >
                  <td>Anggota</td>
                  <td>{member.label}</td>
               </tr>
            {/each}
         {/if}
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

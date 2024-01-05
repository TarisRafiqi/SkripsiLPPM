<script>
   import { onMount, afterUpdate } from "svelte";
   import { Article, Field, Status, Icon } from "@cmp";
   import { route } from "../../store";
   import { addProposal, uploadIcon, deleteIcon } from "../../store/icons";
   import Wysiwyg from "src/libs/Wysiwyg.svelte";

   export let params;

   let items;
   let view;
   let data;
   let statusProposal;

   let jenisProposal;
   let jenisKegiatan;
   let jenisSkema;
   let kelompokKeahlian;
   let topik;
   let tahunPelaksanaan;
   let biayaPenelitian;
   let anggotaTim;
   let rab;
   let judul;
   let abstrak;
   let isi;
   let comment;
   let status;

   const id = params["1"];

   // pakai akses token, hanya uid yang bersangkutan dan role Admin yang boleh mengakses halaman ini
   onMount(async () => {
      const accessToken = localStorage.getItem("token");

      const headers = {
         Authorization: `${accessToken}`,
         "Content-Type": "application/json",
      };

      const response = await fetch("/api/ppm/" + id, {
         method: "GET",
         headers: headers,
      });
      const result = await response.json();
      view = !isEdit(result.status);
      // console.log(view);

      if (response.ok) {
         items = result;
         // console.log(items);

         jenisProposal = items.jenis_proposal;
         jenisKegiatan = items.jenis_kegiatan;
         jenisSkema = items.jenis_skema;
         kelompokKeahlian = items.kelompok_keahlian;
         topik = items.topik;
         tahunPelaksanaan = items.tahun_pelaksanaan;
         biayaPenelitian = items.biaya_penelitian;
         anggotaTim = items.anggota_tim;
         rab = items.rab;
         judul = items.judul;
         abstrak = items.abstrak;
         isi = items.isi;
         comment = items.comment;
         status = items.status;
         kdeptSelected = items.uid_kdept;
         klppmSelected = items.uid_klppm;
         kpkSelected = items.uid_kpk;
         reviewerSelected = items.uid_reviewer;
      } else {
         console.log(response);
         // console.log("gagal");
      }
   });

   function isEdit(code) {
      const edit = [0, 1, 3, 5, 9];
      return edit.some((x) => x === code);
   }

   async function remediasi() {
      abstrak = tinymce.get("abstract").getContent();
      isi = tinymce.get("isi").getContent();

      const payload = {
         jenisProposal,
         jenisKegiatan,
         jenisSkema,
         kelompokKeahlian,
         topik,
         tahunPelaksanaan,
         biayaPenelitian,
         // anggotaTim,
         // rab,
         id,
         judul,
         abstrak,
         isi,
         comment: "",
         status: Number(items.status) + 1,
         kdeptSelected,
         klppmSelected,
         kpkSelected,
         reviewerSelected,
      };

      const response = await fetch("/api/ppm", {
         method: "PATCH",
         headers: {
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
         console.log(response);
      }
   }

   async function submitProposal() {
      abstrak = tinymce.get("abstract").getContent();
      isi = tinymce.get("isi").getContent();

      const payload = {
         jenisProposal,
         jenisKegiatan,
         jenisSkema,
         kelompokKeahlian,
         topik,
         tahunPelaksanaan,
         biayaPenelitian,
         // anggotaTim,
         // rab,
         id,
         judul,
         abstrak,
         isi,
         comment,
         status: Number(items.status) + 2,
         kdeptSelected,
         klppmSelected,
         kpkSelected,
         reviewerSelected,
      };

      const response = await fetch("/api/ppm", {
         method: "PATCH",
         headers: {
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
         console.log(response);
      }
   }

   async function simpanProposal() {
      abstrak = tinymce.get("abstract").getContent();
      isi = tinymce.get("isi").getContent();

      const payload = {
         jenisProposal,
         jenisKegiatan,
         jenisSkema,
         kelompokKeahlian,
         topik,
         tahunPelaksanaan,
         biayaPenelitian,
         // anggotaTim,
         // rab,
         id,
         judul,
         abstrak,
         isi,
         comment,
         status: Number(items.status),
         kdeptSelected,
         klppmSelected,
         kpkSelected,
         reviewerSelected,
      };

      const response = await fetch("/api/ppm", {
         method: "PATCH",
         headers: {
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
         console.log(response);
      }
   }

   let tab1 = true;
   let tab2;
   let tab3;
   let tab4;

   function clicktab1() {
      tab1 = true;
      tab2 = false;
      tab3 = false;
      tab4 = false;
      // location.reload();
   }

   function clicktab2() {
      tab1 = false;
      tab2 = true;
      tab3 = false;
      tab4 = false;
   }

   function clicktab3() {
      tab1 = false;
      tab2 = false;
      tab3 = true;
      tab4 = false;
   }

   function clicktab4() {
      tab1 = false;
      tab2 = false;
      tab3 = false;
      tab4 = true;
   }

   function addLogbook() {
      // $route("/dosen/addlogbook");
      // location.href = "/dosen/addlogbook";
   }
</script>

{#if items}
   <Article>
      <h1 class="title is-1">Detail PPM</h1>

      <div class="tabs is-boxed">
         <ul>
            <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <li on:click={clicktab1} class:is-active={tab1}>
               <!-- svelte-ignore a11y-missing-attribute -->
               <a>
                  <span>Identitas PPM</span>
               </a>
            </li>
            <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <li on:click={clicktab2} class:is-active={tab2}>
               <!-- svelte-ignore a11y-missing-attribute -->
               <a>
                  <span>Status</span>
               </a>
            </li>
            <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <li on:click={clicktab3} class:is-active={tab3}>
               <!-- svelte-ignore a11y-missing-attribute -->
               <a>
                  <span>Logbook / Monev</span>
               </a>
            </li>
            <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <li on:click={clicktab4} class:is-active={tab4}>
               <!-- svelte-ignore a11y-missing-attribute -->
               <a>
                  <span>Laporan</span>
               </a>
            </li>
         </ul>
      </div>

      <!-- Tab Identitas PPM -->
      {#if tab1 === true}
         <div id="tab1">
            {#if !view}
               <Field name="Jenis Proposal">
                  <div class="select is-fullwidth">
                     <select bind:value={jenisProposal}>
                        <option value="" selected disabled hidden
                           >Pilih Jenis Proposal</option
                        >
                        <option selected value="Proposal Awal"
                           >Proposal Awal</option
                        >
                        <option value="Proposal Lanjutan"
                           >Proposal Lanjutan</option
                        >
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
                        <option value="Pengabdian Masyarakat"
                           >Pengabdian Masyarakat</option
                        >
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
                           <option value="Riset Kerjasama"
                              >Riset Kerjasama</option
                           >
                           <option value="Riset Mandiri">Riset Mandiri</option>
                           <option value="Riset Eksternal"
                              >Riset Eksternal</option
                           >
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

               <Field
                  datepicker
                  name="Tahun Pelaksanaan"
                  bind:value={tahunPelaksanaan}
               />

               <Field name="Biaya Penelitian">
                  <input
                     class="input"
                     type="text"
                     placeholder="Masukkan Biaya Penelitian"
                     bind:value={biayaPenelitian}
                  />
               </Field>

               <!-- <Field select name="Anggota Tim" bind:value={anggotaTim} /> -->

               <Field select name="Rincian Anggaran Biaya" bind:value={rab}>
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

               <br />

               <table
                  class="table is-fullwidth is-striped is-hoverable is-bordered"
               >
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

               <hr />

               <Field name="Judul">
                  <input
                     class="input"
                     type="text"
                     placeholder="Masukkan Judul"
                     bind:value={judul}
                  />
               </Field>

               <!-- <Field
                  id="abstract"
                  textarea
                  name="Abstrak"
                  bind:value={abstrak}
               /> -->

               <!-- <Field id="isi" textarea name="Isi Proposal" bind:value={isi} /> -->
               <!-- <Field id="isi" textarea name="Isi Proposal" bind:value={isi} /> -->

               <Field name="Abstrak">
                  <Wysiwyg id="abstract" content={abstrak} />
               </Field>

               <Field name="Isi Proposal">
                  <Wysiwyg id="isi" content={isi} />
               </Field>

               <Field name="Comment">
                  {items.comment}
               </Field>
            {:else}
               <Field name="Jenis Proposal">
                  {jenisProposal}
               </Field>

               <Field name="Jenis Kegiatan">
                  {jenisKegiatan}
               </Field>

               <Field name="Jenis Skema">
                  {jenisSkema}
               </Field>

               <Field name="Kelompok Keahlian">
                  {kelompokKeahlian}
               </Field>

               <Field name="Topik">
                  {topik}
               </Field>

               <Field name="Tahun Pelaksanaan">
                  {tahunPelaksanaan}
               </Field>

               <Field name="Biaya Penelitian">
                  {biayaPenelitian}
               </Field>

               <Field name="Rincian Anggaran Biaya">
                  {rab}
               </Field>

               <Field name="Anggota Tim">
                  <table
                     class="table is-fullwidth is-striped is-hoverable is-bordered"
                  >
                     <thead>
                        <tr>
                           <th>Status</th>
                           <th>Nama</th>
                        </tr>
                     </thead>
                     <tbody>
                        <tr>
                           <td>Ketua</td>
                           <td>...</td>
                        </tr>
                        <tr>
                           <td>Anggota</td>
                           <td>...</td>
                        </tr>
                     </tbody>
                  </table>
               </Field>

               <hr />

               <Field name="Judul">
                  {items.judul}
               </Field>

               <Field name="abstrak">
                  {@html items.abstrak}
               </Field>

               <Field name="isi">
                  {@html items.isi}
               </Field>
            {/if}

            <!-- {#each items as item}
               {#if item.key !== "uid" && item.key !== "id" && item.key !== "uid_kdept" && item.key !== "uid_klppm" && item.key !== "uid_kpk" && item.key !== "uid_reviewer" && item.key !== "tipe_proposal" && item.key !== "update" && item.key !== "status"}
                  {#if item.key === "status"}
                     <Field name={item.key}>
                        <Status code={item.value} />
                     </Field>
                  {:else}
                     <Field
                        view={view || item.key === "comment"}
                        name={item.key}
                        bind:value={item.value}
                        textarea={item.key === "abstract" ? true : null}
                     />
                  {/if}
               {/if}
            {/each} -->

            {#if !view}
               <br />
               {#if status === 0}
                  <Field>
                     <button on:click={simpanProposal}>Simpan</button>
                     <button on:click={submitProposal}>Submit</button>
                  </Field>
               {:else}
                  <Field>
                     <button on:click={remediasi}>Remediasi</button>
                  </Field>
               {/if}
            {/if}
         </div>
      {/if}

      <!-- Tab Status -->
      {#if tab2 === true}
         <div id="tab2">
            <table
               class="table is-fullwidth is-striped is-hoverable is-bordered"
            >
               <thead>
                  <tr>
                     <th>Status PPM</th>
                     <th>Status Pendanaan</th>
                  </tr>
               </thead>
               <tbody>
                  <tr>
                     <td>
                        <Status code={items.status} />
                     </td>
                     <td>Coming Soon</td>
                  </tr>
               </tbody>
            </table>
         </div>
      {/if}

      <!-- Tab Logbook / Monev -->
      {#if tab3 === true}
         <div id="tab3">
            <div class="columns notification is-info is-light">
               <div class="column is-4">
                  <p>
                     Lorem ipsum dolor sit amet consectetur adipisicing elit.
                     Totam suscipit placeat amet.
                  </p>
               </div>

               <div class="column">
                  <button class="button is-info" on:click={addLogbook}>
                     <span class="icon">
                        <Icon id="logbook" src={addProposal} />
                     </span>
                     <!-- svelte-ignore a11y-missing-attribute -->
                     <span><a>Create Logbook</a></span>
                  </button>
               </div>
            </div>

            <hr />

            <div class="columns notification is-success is-light">
               <div class="column is-4">
                  <p>
                     Lorem ipsum dolor sit amet consectetur adipisicing elit.
                     Totam suscipit placeat amet.
                  </p>
               </div>

               <div class="column">
                  <button class="button is-success" on:click={addLogbook}>
                     <span class="icon">
                        <Icon id="monev" src={addProposal} />
                     </span>
                     <!-- svelte-ignore a11y-missing-attribute -->
                     <span><a>Create Monev</a></span>
                  </button>
               </div>
            </div>
         </div>
      {/if}

      <!-- Tab Laporan -->
      {#if tab4 === true}
         <div id="tab4">
            <div class="columns notification is-info is-light">
               <div class="column is-4">
                  <p>
                     Lorem ipsum dolor sit amet consectetur adipisicing elit.
                     Totam suscipit placeat amet.
                  </p>
               </div>

               <div class="column">
                  <button class="button is-info" on:click={addLogbook}>
                     <span class="icon">
                        <Icon id="laporan" src={addProposal} />
                     </span>
                     <!-- svelte-ignore a11y-missing-attribute -->
                     <span><a>Create Laporan</a></span>
                  </button>
               </div>
            </div>
         </div>
      {/if}
   </Article>
{/if}

<script>
   import { onMount, afterUpdate } from "svelte";
   import { Article, Field, Status, Icon } from "@cmp";
   import { route } from "../../store";
   import { addProposal, uploadIcon, deleteIcon } from "../../store/icons";
   import Wysiwyg from "src/libs/Wysiwyg.svelte";
   import Select from "src/libs/Select.svelte";

   export let params;

   // let items;
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
   let file;

   const id = params["1"];
   let items = [];

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

      if (response.ok) {
         data = result;
         // console.log(data);
         // console.log(data.anggota_tim);
         // return;

         jenisProposal = data.jenis_proposal;
         jenisKegiatan = data.jenis_kegiatan;
         jenisSkema = data.jenis_skema;
         kelompokKeahlian = data.kelompok_keahlian;
         topik = data.topik;
         tahunPelaksanaan = data.tahun_pelaksanaan;
         biayaPenelitian = data.biaya_penelitian;
         anggotaTim = data.anggota_tim;
         rab = data.rab;
         judul = data.judul;
         abstrak = data.abstrak;
         isi = data.isi;
         comment = data.comment;
         status = data.status;
         kdeptSelected = data.uid_kdept;
         klppmSelected = data.uid_klppm;
         kpkSelected = data.uid_kpk;
         reviewerSelected = data.uid_reviewer;
      } else {
         console.log(response);
      }

      // -----------------------------------------------------------------------------//
      const responsee = await fetch("/api/pilihUser", {
         method: "GET",
         headers: headers,
      });

      const results = await responsee.json();
      // return;

      if (responsee.ok) {
         listUser = results;
         // console.log(listUser);
         //console.log(listUser[0]);
         items = [];
         for (const [key, value] of Object.entries(listUser)) {
            items.push({
               value: value.uid,
               label: value.nama_lengkap,
            });
         }
      } else {
         console.log(responsee);
         // console.log("gagal");
      }
   });

   function isEdit(code) {
      const edit = [0, 1, 3, 5, 7, 9];
      return edit.some((x) => x === code);
   }

   async function handleDownload(e) {
      const accessToken = localStorage.getItem("token");
      const headers = {
         Authorization: `${accessToken}`,
         "Content-Type": "application/json",
      };
      let filename = "rab.xlsx";
      try {
         const response = await fetch(`/api/upload/${judul}`, {
            method: "GET",
            headers: headers,
         });
         const blob = await response.blob();
         const link = document.createElement("a");
         link.href = window.URL.createObjectURL(blob);
         link.download = filename;
         link.click();
      } catch (error) {
         console.error("Error downloading file:", error);
      }
   }

   async function remediasi() {
      const accessToken = localStorage.getItem("token");
      abstrak = tinymce.get("abstract").getContent();
      isi = tinymce.get("isi").getContent();

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
            judul,
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
      //
      if (file) reader.readAsDataURL(file);
      // -----------------------------------------------------------------------------//

      const payload = {
         jenisProposal,
         jenisKegiatan,
         jenisSkema,
         kelompokKeahlian,
         topik,
         tahunPelaksanaan,
         biayaPenelitian,
         anggotaTim,
         // rab,
         id,
         judul,
         abstrak,
         isi,
         comment: "",
         status: Number(data.status) + 1,
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
      const accessToken = localStorage.getItem("token");
      abstrak = tinymce.get("abstract").getContent();
      isi = tinymce.get("isi").getContent();

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
            judul,
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
      //
      reader.readAsDataURL(file);
      // -----------------------------------------------------------------------------//

      const payload = {
         jenisProposal,
         jenisKegiatan,
         jenisSkema,
         kelompokKeahlian,
         topik,
         tahunPelaksanaan,
         biayaPenelitian,
         anggotaTim,
         // rab,
         id,
         judul,
         abstrak,
         isi,
         comment: "",
         status: Number(data.status) + 2,
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
      const accessToken = localStorage.getItem("token");
      abstrak = tinymce.get("abstract").getContent();
      isi = tinymce.get("isi").getContent();

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
            judul,
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

      const payload = {
         jenisProposal,
         jenisKegiatan,
         jenisSkema,
         kelompokKeahlian,
         topik,
         tahunPelaksanaan,
         biayaPenelitian,
         anggotaTim,
         // rab,
         id,
         judul,
         abstrak,
         isi,
         comment: "",
         status: Number(data.status),
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

   function deleteMember(e) {
      // console.log(e.target);
      // console.log(e.target.getAttribute("data-value"));
      let uid = e.target.getAttribute("data-value");
      anggotaTim = anggotaTim.filter((member) => {
         console.log(member.value, uid);
         return member.value !== uid;
      });
      console.log(anggotaTim);
   }
</script>

{#if data}
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
                     type="number"
                     placeholder="Masukkan Biaya Penelitian"
                     bind:value={biayaPenelitian}
                  />
               </Field>

               <!-- <Field name="Rincian Anggaran Biaya" bind:value={rab}>
                  <input
                     class="input"
                     accept=".xlsx"
                     id="avatar"
                     name="avatar"
                     type="file"
                  />
               </Field> -->

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

               <table
                  class="table is-fullwidth is-striped is-hoverable is-bordered"
               >
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
                  {comment}
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

               <Field name="Rencana Anggaran Biaya">
                  <button
                     class="button is-link is-rounded button is-small"
                     on:click={handleDownload}>Download RAB</button
                  >
               </Field>

               <Field name="Anggota Tim">
                  <span></span>
               </Field>
               <br />
               <table
                  class="table is-fullwidth is-striped is-hoverable is-bordered"
               >
                  <thead>
                     <tr>
                        <th class="is-narrow">Status</th>
                        <th>Nama</th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr>
                        <td>Ketua</td>
                        <td>...</td>
                     </tr>
                     {#if anggotaTim.length > 0}
                        {#each anggotaTim as member}
                           <tr>
                              <td>Anggota</td>
                              <td>{member.label}</td>
                           </tr>
                        {/each}
                     {/if}
                  </tbody>
               </table>

               <hr />

               <Field name="Judul">
                  {data.judul}
               </Field>

               <Field name="abstrak">
                  {@html data.abstrak}
               </Field>

               <Field name="isi">
                  {@html data.isi}
               </Field>
            {/if}

            <!-- {#each data as item}
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
                        <Status code={data.status} />
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

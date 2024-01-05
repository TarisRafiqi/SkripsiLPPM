<script>
   import { onMount } from "svelte";
   import { route } from "../../store";
   import { Field, Article, Icon, Status } from "@cmp";
   import Wysiwyg from "src/libs/Wysiwyg.svelte";

   let items;

   const id = localStorage.getItem("id");

   // Pakai akses Token, hanya uid pemilik dan role Admin yang bisa mengakses halaman ini
   onMount(async () => {
      const accessToken = localStorage.getItem("token");

      const headers = {
         Authorization: `${accessToken}`,
         "Content-Type": "application/json",
      };

      const response = await fetch("/api/user/" + id, {
         method: "GET",
         headers: headers,
      });
      const result = await response.json();

      if (response.ok) {
         items = [];
         for (const [field, value] of Object.entries(result[0])) {
            items.push({
               field,
               value,
            });
         }
      }
   });

   async function simpan() {
      let payload = {};
      msgNip = "";
      items.map((item) => {
         if (item.field === "id") {
            if (String(item.value).match(/[a-zA-Z]/)) {
               console.log("Entri berisikan huruf");
            } else {
               payload.id = Number(item.value);
            }
         }

         if (item.field === "uid") {
            if (String(item.value).match(/[a-zA-Z]/)) {
               console.log("Entri berisikan huruf");
            } else {
               payload.uid = Number(item.value);
            }
         }

         if (item.field === "nama_lengkap") {
            if (item.value.match(/[0-9]/)) {
               console.log("Entri berisikan angka");
            } else {
               payload.nama_lengkap = item.value;
            }
         }

         if (item.field === "nip") {
            if (String(item.value).match(/[a-zA-Z]/)) {
               console.log("Entri berisikan huruf");
               msgNip = "Entri berisikan huruf";
            } else {
               payload.nip = Number(item.value);
            }
         }

         if (item.field === "nidn") {
            if (String(item.value).match(/[a-zA-Z]/)) {
               console.log("Entri berisikan huruf");
            } else {
               payload.nidn = Number(item.value);
            }
         }

         if (item.field === "tempat_lahir") {
            if (item.value.match(/[0-9]/)) {
               console.log("Entri berisikan angka");
            } else {
               payload.tempat_lahir = item.value;
            }
         }

         if (item.field === "tanggal_lahir") {
            if (String(item.value).match(/[a-zA-Z]/)) {
               console.log("Entri berisikan huruf");
            } else {
               payload.tanggal_lahir = Number(item.value);
            }
         }

         if (item.field === "alamat_rumah") {
            payload.alamat_rumah = item.value;
         }

         if (item.field === "alamat_kantor") {
            payload.alamat_kantor = item.value;
         }

         if (item.field === "nomor_handphone") {
            if (String(item.value).match(/[a-zA-Z]/)) {
               console.log("Entri berisikan huruf");
            } else {
               payload.nomor_handphone = Number(item.value);
            }
         }

         if (item.field === "nomor_whatsapp") {
            if (String(item.value).match(/[a-zA-Z]/)) {
               console.log("Entri berisikan huruf");
            } else {
               payload.nomor_whatsapp = Number(item.value);
            }
         }

         if (item.field === "perguruan_tinggi_asal") {
            payload.perguruan_tinggi_asal = item.value;
         }

         if (item.field === "program_studi") {
            if (item.value.match(/[0-9]/)) {
               console.log("Entri berisikan angka");
            } else {
               payload.program_studi = item.value;
            }
         }

         if (item.field === "jabatan_fungsional") {
            if (item.value.match(/[0-9]/)) {
               console.log("Entri berisikan angka");
            } else {
               payload.jabatan_fungsional = item.value;
            }
         }

         if (item.field === "pangkat_golongan") {
            if (item.value.match(/[0-9]/)) {
               console.log("Entri berisikan angka");
            } else {
               payload.pangkat_golongan = item.value;
            }
         }
      });

      const response = await fetch("/api/userprofile", {
         method: "PATCH",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(payload),
      });

      const result = await response.json();
      console.log(result);

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
</script>

<Article>
   <h1 class="title is-1">Profile</h1>

   <div class="tabs is-boxed">
      <ul>
         <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
         <!-- svelte-ignore a11y-click-events-have-key-events -->
         <li on:click={clicktab1} class:is-active={tab1}>
            <!-- svelte-ignore a11y-missing-attribute -->
            <a>
               <span>Identitas</span>
            </a>
         </li>
         <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
         <!-- svelte-ignore a11y-click-events-have-key-events -->
         <li on:click={clicktab2} class:is-active={tab2}>
            <!-- svelte-ignore a11y-missing-attribute -->
            <a>
               <span>Mata Kuliah</span>
            </a>
         </li>
         <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
         <!-- svelte-ignore a11y-click-events-have-key-events -->
         <li on:click={clicktab3} class:is-active={tab3}>
            <!-- svelte-ignore a11y-missing-attribute -->
            <a>
               <span>Riwayat Pendidikan</span>
            </a>
         </li>
         <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
         <!-- svelte-ignore a11y-click-events-have-key-events -->
         <li on:click={clicktab4} class:is-active={tab4}>
            <!-- svelte-ignore a11y-missing-attribute -->
            <a>
               <span>Pengalaman</span>
            </a>
         </li>
      </ul>
   </div>

   {#if tab1 === true}
      {#if items}
         {#each items as item}
            <!-- <Field name={item.field} bind:value={item.value} /> -->

            <Field name={item.field}>
               <input class="input" type="text" bind:value={item.value} />
            </Field>
         {/each}
         <br />
         <Field>
            <button class="button is-info is-light">Kembali</button>
            <button class="button is-info" on:click={simpan}>Simpan</button>
         </Field>
      {/if}
   {/if}

   {#if tab2 === true}
      <table class="table is-fullwidth is-striped is-hoverable is-bordered">
         <thead>
            <tr>
               <th>Mata Kuliah</th>
               <th>Hapus</th>
            </tr>
         </thead>
         <tbody>
            <tr>
               <td>Informatika</td>
               <td>icon delete</td>
            </tr>
         </tbody>
      </table>
   {/if}

   {#if tab3 === true}
      <table class="table is-fullwidth is-striped is-hoverable is-bordered">
         <thead>
            <tr>
               <th>Program</th>
               <th>S1</th>
               <th>S2</th>
               <th>S3</th>
            </tr>
         </thead>
         <tbody>
            <tr>
               <th>Nama Perguruan Tinggi</th>
               <td>.......</td>
               <td>.......</td>
               <td>.......</td>
            </tr>
            <tr>
               <th>Bidang Ilmu</th>
               <td>.......</td>
               <td>.......</td>
               <td>.......</td>
            </tr>
            <tr>
               <th>Tahun Masuk</th>
               <td>.......</td>
               <td>.......</td>
               <td>.......</td>
            </tr>
            <tr>
               <th>Tahun Lulus</th>
               <td>.......</td>
               <td>.......</td>
               <td>.......</td>
            </tr>
            <tr>
               <th>Judul Skripsi/Tesis/Disertasi</th>
               <td>.......</td>
               <td>.......</td>
               <td>.......</td>
            </tr>
         </tbody>
      </table>
   {/if}

   {#if tab4 === true}
      <h6 class="title is-6">Pengalaman Penelitian</h6>
      <table class="table is-fullwidth is-striped is-hoverable is-bordered">
         <thead>
            <tr>
               <th>No</th>
               <th>Tahun</th>
               <th>Judul Penelitian</th>
               <th>Ketua / Anggota</th>
               <th>Sumber Dana</th>
               <th>Jumlah Rp.</th>
               <th>Hapus</th>
            </tr>
         </thead>
         <tbody> </tbody>
      </table>
      <br />

      <h6 class="title is-6">Pengalaman Pengabdian Masyarakat</h6>
      <table class="table is-fullwidth is-striped is-hoverable is-bordered">
         <thead>
            <tr>
               <th>No</th>
               <th>Tahun</th>
               <th>Judul Pengmas</th>
               <th>Ketua / Anggota</th>
               <th>Sumber Dana</th>
               <th>Jumlah Rp.</th>
               <th>Hapus</th>
            </tr>
         </thead>
         <tbody> </tbody>
      </table>
      <br />

      <h6 class="title is-6">
         Pengalaman Diseminasi Ilmiah dalam Pertemuan / Pameran
      </h6>
      <table class="table is-fullwidth is-striped is-hoverable is-bordered">
         <thead>
            <tr>
               <th>No</th>
               <th>Tahun</th>
               <th>Judul Artikel</th>
               <th>Nama Pemakalah</th>
               <th>Nama Pertemuan Ilmiah / Pameran</th>
               <th>Hapus</th>
            </tr>
         </thead>
         <tbody> </tbody>
      </table>
      <br />

      <h6 class="title is-6">
         Pengalaman Publikasi Ilmiah dalam Jurnal "Bukan Proceeding"
      </h6>
      <table class="table is-fullwidth is-striped is-hoverable is-bordered">
         <thead>
            <tr>
               <th>No</th>
               <th>Tahun</th>
               <th>Judul Artikel</th>
               <th>Nama Jurnal, Vol., No Issue/No Artikel, Halaman</th>
               <th>Impact Factor/Scopus Quarter/Akreditasi</th>
               <th>Hapus</th>
            </tr>
         </thead>
         <tbody> </tbody>
      </table>
      <br />

      <h6 class="title is-6">Pengalaman Penulisan Buku</h6>
      <table class="table is-fullwidth is-striped is-hoverable is-bordered">
         <thead>
            <tr>
               <th>No</th>
               <th>Tahun</th>
               <th>Judul Buku</th>
               <th>Nama Penulis</th>
               <th>Penerbit</th>
               <th>ISBN</th>
               <th>Hapus</th>
            </tr>
         </thead>
         <tbody> </tbody>
      </table>
      <br />

      <h6 class="title is-6">Pengalaman Hak Kekayaan Intelektual</h6>
      <table class="table is-fullwidth is-striped is-hoverable is-bordered">
         <thead>
            <tr>
               <th>No</th>
               <th>Tahun</th>
               <th>Judul HKI</th>
               <th>Nama Penulis</th>
               <th>Jenis HKI</th>
               <th>No HKI</th>
               <th>Hapus</th>
            </tr>
         </thead>
         <tbody> </tbody>
      </table>
      <br />
   {/if}
</Article>

<script>
   import { onMount } from "svelte";
   import { route } from "../../store";
   import { Field, Modal, Article, Status } from "@cmp";

   export let params;
   const id = params["1"];
   const role = localStorage.getItem("role");

   let data;
   let ka_departemen;
   let ka_lppm;
   let reviewer;
   let ka_pusat_kajian;
   let showModal = false;

   let jenisProposal,
      jenisKegiatan,
      jenisSkema,
      kelompokKeahlian,
      topik,
      tahunPelaksanaan,
      biayaPenelitian,
      anggotaTim,
      rab,
      judul,
      abstrak,
      isi,
      comment,
      status,
      kdeptSelected,
      klppmSelected,
      kpkSelected,
      reviewerSelected;

   // pakai akses token, hanya uid yang bersangkutan, dan role admin yang boleh mengakses halaman ini
   onMount(async () => {
      const accessToken = localStorage.getItem("token");

      const headers = {
         Authorization: `${accessToken}`,
         "Content-Type": "application/json",
      };

      ka_departemen = await findRole(11);
      ka_lppm = await findRole(12);
      ka_pusat_kajian = await findRole(13);
      reviewer = await findRole(10);

      const response = await fetch("/api/ppm/" + id, {
         method: "GET",
         headers: headers,
      });
      const result = await response.json();
      // console.log(result);

      if (response.ok) {
         data = result;
         // console.log(data);

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
         randomFileName = data.random_file_name;
      }
   });

   async function handleRevisi() {
      // status = Number(items.status) - 1;
      // const payload = {
      //    jenisProposal,
      //    jenisKegiatan,
      //    jenisSkema,
      //    kelompokKeahlian,
      //    topik,
      //    tahunPelaksanaan,
      //    biayaPenelitian,
      //    // anggotaTim,
      //    // rab,
      //    id: id,
      //    judul,
      //    abstrak,
      //    isi,
      //    comment,
      //    status: Number(items.status) - 1,
      //    kdeptSelected,
      //    klppmSelected,
      //    kpkSelected,
      //    reviewerSelected,
      // };

      const payload = {
         jenisProposal,
         jenisKegiatan,
         jenisSkema,
         kelompokKeahlian,
         topik,
         tahunPelaksanaan,
         biayaPenelitian,
         anggotaTim,
         id,
         judul,
         abstrak,
         isi,
         comment: "",
         status: Number(data.status) - 1,
         kdeptSelected,
         klppmSelected,
         kpkSelected,
         reviewerSelected,
         randomFileName,
      };

      const response = await fetch("/api/ppm", {
         method: "PATCH",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
         $route("/dosen/approval");
      } else {
         console.log(response);
      }
   }

   async function handlePass() {
      // status = Number(items.status) + 2;
      // const payload = {
      //    jenisProposal,
      //    jenisKegiatan,
      //    jenisSkema,
      //    kelompokKeahlian,
      //    topik,
      //    tahunPelaksanaan,
      //    biayaPenelitian,
      //    // anggotaTim,
      //    // rab,
      //    id: id,
      //    judul,
      //    abstrak,
      //    isi,
      //    comment: "",
      //    status,
      //    kdeptSelected,
      //    klppmSelected,
      //    kpkSelected,
      //    reviewerSelected,
      // };

      const payload = {
         jenisProposal,
         jenisKegiatan,
         jenisSkema,
         kelompokKeahlian,
         topik,
         tahunPelaksanaan,
         biayaPenelitian,
         anggotaTim,
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
         randomFileName,
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
         $route("/dosen/approval");
      } else {
         console.log(response);
      }
   }

   async function searchUser(ev) {
      const response = await fetch("/api/user");
      const result = await response.json();

      if (response.ok) {
         showModal = true;
      }
   }

   let options;

   async function findRole(role) {
      const response = await fetch("/api/role/" + role);
      const result = await response.json();
      // console.log(result);

      if (response.ok) {
         options = result;
         return options;
      } else {
         console.log(response);
      }
   }

   async function handleDownload(e) {
      const accessToken = localStorage.getItem("token");
      const headers = {
         Authorization: `${accessToken}`,
         "Content-Type": "application/json",
      };
      let filename = "rab.xlsx";
      try {
         const response = await fetch(`/api/upload/${randomFileName}`, {
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

   // $: console.log(status);
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

      {#if tab1 === true}
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
         <table class="table is-fullwidth is-striped is-hoverable is-bordered">
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
            <div class="box box-padding">
               {@html data.isi}
            </div>
         </Field>
         <br />

         {#if role === "Ka.Departemen"}
            {#if status === 4}
               <Field>
                  <button class="button is-warning" on:click={handleRevisi}
                     >Revisi</button
                  >
                  <button class="button is-info" on:click={handlePass}
                     >Proses</button
                  >
               </Field>
            {/if}
         {/if}

         {#if role === "Ka.LPPM"}
            {#if status === 6}
               <Field>
                  <button class="button is-warning" on:click={handleRevisi}
                     >Revisi</button
                  >
                  <button class="button is-info" on:click={handlePass}
                     >Proses</button
                  >
               </Field>
            {/if}
         {/if}

         {#if role === "reviewer"}
            {#if status === 8}
               <Field>
                  <button class="button is-warning" on:click={handleRevisi}
                     >Revisi</button
                  >
                  <button class="button is-info" on:click={handlePass}
                     >Proses</button
                  >
               </Field>
            {/if}
         {/if}

         {#if role === "Ka.PusatKajian"}
            {#if status === 10}
               <Field>
                  <button class="button is-warning" on:click={handleRevisi}
                     >Revisi</button
                  >
                  <button class="button is-danger">Ditolak</button>
                  <button class="button is-info" on:click={handlePass}
                     >Proses</button
                  >
               </Field>
            {/if}
         {/if}
      {/if}

      {#if tab2 === true}
         <table class="table is-fullwidth is-striped is-hoverable is-bordered">
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
      {/if}

      {#if tab3 === true}
         <h3 class="title is-3">Coming Soon</h3>
      {/if}

      {#if tab4 === true}
         <h3 class="title is-3">Coming Soon</h3>
      {/if}
   </Article>
{/if}

<!-- <Modal bind:show={showModal}>
   <h2 slot="header">Find Approval</h2>
   <p>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores fuga
      odit accusamus, neque nulla vitae! Fugiat, accusamus amet? Cum est
      delectus soluta iusto odio architecto impedit maxime non asperiores
      eligendi?
   </p>
</Modal> -->

<style>
   .box-padding {
      padding: 4.724rem;
   }
</style>

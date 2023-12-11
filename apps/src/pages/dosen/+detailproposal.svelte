<script>
   import { onMount } from "svelte";
   import { route } from "../../store";
   import { Field, Modal, Article, Status } from "@cmp";

   export let params;
   const id = params["1"];
   const role = localStorage.getItem("role");

   let items;
   let comment;
   let status;
   let ka_departemen;
   let ka_lppm;
   let reviewer;
   let ka_pusat_kajian;
   let showModal = false;
   let kdeptSelected;
   let klppmSelected;
   let kpkSelected;
   let reviewerSelected;
   let judul, abstrak, isi;

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
      console.log(result);

      if (response.ok) {
         items = [];

         for (const [field, value] of Object.entries(result)) {
            let obj = {
               field: field,
               value: value,
            };
            items.push(obj);
         }
         console.log(items);
         judul = items[2].value;
         abstrak = items[3].value;
         isi = items[4].value;
         status = items[5].value;
         kdeptSelected = items[7].value;
         klppmSelected = items[8].value;
         kpkSelected = items[9].value;
         reviewerSelected = items[10].value;
      }
   });

   async function handleRevisi() {
      status = items[5].value - 1;
      const payload = {
         id: id,
         judul,
         abstrak,
         isi,
         status,
         comment,
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

      if (response.ok) {
         $route("/dosen/approval");
      } else {
         console.log(response);
      }
   }

   async function handlePass() {
      status = items[5].value + 2;
      const payload = {
         id: id,
         judul,
         abstrak,
         isi,
         status,
         comment: "",
         kdeptSelected,
         klppmSelected,
         kpkSelected,
         reviewerSelected,
      };

      console.log("reviewerSelected", reviewerSelected);

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

      {#if tab1 === true}
         {#each items as item}
            {#if item.field !== "comment" && item.field !== "uid_kdept" && item.field !== "uid_klppm" && item.field !== "uid_kpk" && item.field !== "uid_reviewer" && item.field !== "update" && item.field !== "status"}
               <!-- {#if item.field === "uid"}
         <Field
         view
         name={item.field}
                  value={item.value}
                  href={"/admin/profile/" + item.value}
               /> -->
               {#if item.field === "status"}
                  <!-- <Field view name={item.field}>
                  <Status code={item.value} />
               </Field> -->
               {:else}
                  <Field view name={item.field} value={item.value} />
               {/if}
            {/if}
         {/each}

         <Field name="Comment" bind:value={comment} textarea />

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
                  <td
                     >{#each items as item}
                        {#if item.field === "status"}
                           <Status code={item.value} />
                        {/if}
                     {/each}</td
                  >
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

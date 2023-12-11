<script>
   import { onMount } from "svelte";
   import { Article, Field, Status, Icon } from "@cmp";
   import { route } from "../../store";
   import { addProposal } from "../../store/icons";

   export let params;

   let items;
   let view;
   let data;
   let statusProposal;

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
      console.log(result);

      if (response.ok) {
         items = [];
         data = result;
         for (const [key, value] of Object.entries(result)) {
            if (key === "status") {
               view = !isEdit(value);
            }
            items.push({
               key,
               value,
            });
         }
         console.log(items);
         judul = items[2].value;
         abstrak = items[3].value;
         isi = items[4].value;
         statusProposal = items[5].value;
         kdeptSelected = items[7].value;
         klppmSelected = items[8].value;
         kpkSelected = items[9].value;
         reviewerSelected = items[10].value;
      } else {
         console.log(response);
      }
   });

   function isEdit(code) {
      const edit = [0, 1, 3, 5, 9];
      return edit.some((x) => x === code);
   }

   async function remediasi() {
      const data = {};
      // convert array to object;
      items.map((x) => (data[x.key] = x.value));

      const payload = {
         id: data.id,
         judul: data.judul,
         abstrak: data.abstrak,
         isi: data.isi,
         status: Number(data.status) + 1,
         comment: "",
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
      const data = {};

      items.map((x) => (data[x.key] = x.value));
      const payload = {
         id: data.id,
         judul: data.judul,
         abstrak: data.abstrak,
         isi: data.isi,
         status: Number(data.status) + 2,
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
         $route("/dosen");
      } else {
         console.log(response);
      }
   }

   async function simpanProposal() {
      const data = {};
      items.map((x) => (data[x.key] = x.value));
      const payload = {
         id: data.id,
         judul: data.judul,
         abstrak: data.abstrak,
         status: Number(data.status),
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
            {#each items as item}
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
            {/each}

            {#if !view}
               <br />
               {#if !statusProposal}
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
                     <td
                        >{#each items as item}
                           {#if item.key === "status"}
                              <Status code={item.value} />
                           {/if}
                        {/each}</td
                     >
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

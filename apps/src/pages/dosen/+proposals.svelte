<script>
   import { onMount } from "svelte";
   import { Field, Status } from "@cmp";
   import { route } from "../../store";

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
</script>

{#if items}
   <article>
      <h1>Detail Proposal</h1>

      {#each items as item}
         {#if item.key !== "uid" && item.key !== "id" && item.key !== "uid_kdept" && item.key !== "uid_klppm" && item.key !== "uid_kpk" && item.key !== "uid_reviewer" && item.key !== "jenis_kegiatan" && item.key !== "kode_program" && item.key !== "tipe_proposal" && item.key !== "kelompok_keahlian" && item.key !== "tahun_pelaksanaan" && item.key !== "topik" && item.key !== "biaya_penelitian" && item.key !== "anggota_tim" && item.key !== "update"}
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
   </article>
{/if}

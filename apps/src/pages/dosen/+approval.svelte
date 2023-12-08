<script>
   import { onMount } from "svelte";
   import { route } from "src/store";
   import { Article, Status } from "@cmp";

   const id = localStorage.id;
   let items;

   onMount(async () => {
      const response = await fetch("/api/approval/" + id);
      const result = await response.json();
      if (response.ok) {
         items = result.dbData;
      } else {
         console.log(response);
      }
   });

   function detail(ev) {
      let propId = ev.target.getAttribute("pid");
      // $route("/dosen/proposals/" + propId);
      // $route("/dosen/detailApproval/" + propId);
      $route("/dosen/detailproposal/" + propId);
   }
</script>

{#if items}
   <Article>
      <h1 class="title is-1">Approval Management</h1>

      <hr />

      <div class="box">
         <p>
            Berikut adalah list <strong
               >Penelitian / Pengabdian Masyarakat</strong
            > yang diberikan kepada anda untuk mendapatkan persetujuan. Cek PPM dengan
            teliti sebelum memberikan persetujuan!
         </p>
      </div>

      <table class="table">
         <thead>
            <tr>
               <th>Judul</th>
               <th>Abstract</th>
               <th>Status</th>
               <th colspan="2">Action</th>
            </tr>
         </thead>

         <tbody>
            {#each items as item}
               <tr>
                  <td>{item.judul}</td>
                  <td>{item.abstrak}</td>
                  <td class="status" pid={item.id}>
                     <Status code={item.status} />
                  </td>
                  <td class="view">
                     <button
                        class="button is-info"
                        pid={item.id}
                        on:click={detail}
                        >Detail
                     </button></td
                  >
               </tr>
            {/each}
         </tbody>
      </table>
   </Article>
{/if}

<style>
   .view {
      cursor: pointer;
   }

   .status {
      text-align: center;
   }
</style>

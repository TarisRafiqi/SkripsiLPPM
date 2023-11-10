<script>
   import { onMount } from "svelte";
   import { route } from "src/store";
   import { Status } from "@cmp";

   const id = localStorage.id;
   let items;

   onMount(async () => {
      const response = await fetch("/api/ppm/all/" + id);
      const result = await response.json();
      if (response.ok) {
         items = result.dbData;
         // console.log(result);
      } else {
         console.log(response);
      }
   });

   function detail(ev) {
      let propId = ev.target.getAttribute("pid");
      $route("/dosen/proposals/" + propId);
   }

   function addProposal() {
      $route("/dosen/proposal");
   }
</script>

{#if items}
   <article>
      <h1>List Proposal</h1>

      <p>
         <button on:click={addProposal}>+ Proposal baru</button>
      </p>

      <table>
         <tr>
            <th>Judul</th>
            <th>Abstract</th>
            <th>Status</th>
            <th colspan="2">Action</th>
         </tr>
         {#each items as item}
            <tr>
               <td>{item.judul}</td>
               <td>{item.abstrak}</td>
               <td class="status" pid={item.id}>
                  <Status code={item.status} />
               </td>
               <td class="view" pid={item.id} on:click={detail}>Detail</td>
            </tr>
         {/each}
      </table>
   </article>
{/if}

<style>
   .view {
      cursor: pointer;
   }

   .status {
      text-align: center;
   }
</style>

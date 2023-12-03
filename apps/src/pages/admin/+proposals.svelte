<script>
   import { onMount } from "svelte";
   import { route } from "../../store";
   import { Article, Status } from "@cmp";

   let items;

   // Pakai akses token, Hanya role admin yang bisa mengakses halaman ini
   onMount(async () => {
      const accessToken = localStorage.getItem("token");

      const headers = {
         Authorization: `${accessToken}`,
         "Content-Type": "application/json",
      };

      const response = await fetch("/api/ppm", {
         method: "GET",
         headers: headers,
      });
      const result = await response.json();
      // console.log(result);

      if (response.ok) {
         items = result.dbData;
      }
   });

   async function handleReview(ev) {
      const id = ev.target.getAttribute("uid");
      $route("/admin/proposal/" + id);
   }

   async function handleApproval(ev) {
      const id = ev.target.getAttribute("uid");
   }
</script>

{#if items}
   <Article>
      <h1>Proposals</h1>

      <table>
         <tr>
            <th>Judul</th>
            <th>Abstract</th>
            <th>status</th>
            <th>Action</th>
         </tr>
         {#each items as item}
            <tr>
               <td>{item.judul}</td>
               <td>{item.abstrak}</td>
               <td class="status"><Status code={item.status} /></td>
               <td class="review" uid={item.id} on:click={handleReview}
                  >Review</td
               >
            </tr>
         {/each}
      </table>
   </Article>
{/if}

<style>
   .review {
      cursor: pointer;
   }

   .status {
      text-align: center;
   }
</style>

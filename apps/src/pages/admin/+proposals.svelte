<script>
   import { onMount } from "svelte";
   import { route } from "../../store";
   import { Article, Status, Icon } from "@cmp";
   import { infoOutline } from "../../store/icons";

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
      <h1 class="title is-1">PPM Management</h1>
      <hr />

      <table class="table is-fullwidth is-striped is-hoverable">
         <thead>
            <tr>
               <th>Judul</th>
               <th class="is-narrow">Jenis Kegiatan</th>
               <th class="is-narrow">Jenis Skema</th>
               <th>Status</th>
               <th>Action</th>
            </tr>
         </thead>

         <tbody>
            {#each items as item}
               <tr>
                  <td><p>{item.judul}</p> </td>
                  <td><p>{item.jenis_kegiatan}</p></td>
                  <td><p>{item.jenis_skema}</p></td>
                  <td class="status"><Status code={item.status} /></td>
                  <td class="review"
                     ><button
                        class="button is-info is-rounded is-small"
                        uid={item.id}
                        on:click={handleReview}
                     >
                        <span class="icon">
                           <Icon id="orang" src={infoOutline} />
                        </span></button
                     ></td
                  >
               </tr>
            {/each}
         </tbody>
      </table>
   </Article>
{/if}

<style>
   th {
      text-align: center;
   }
   p {
      text-align: justify;
   }
   .review {
      cursor: pointer;
   }

   .status {
      text-align: center;
   }
</style>

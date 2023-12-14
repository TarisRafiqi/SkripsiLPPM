<script>
   import { onMount } from "svelte";
   import { route } from "src/store";
   import { Article, Icon, Status } from "@cmp";
   import { accountAdd, infoOutline } from "../../store/icons";

   const id = localStorage.id;
   let items;

   onMount(async () => {
      const accessToken = localStorage.getItem("token");

      const headers = {
         Authorization: `${accessToken}`,
         "Content-Type": "application/json",
      };

      const response = await fetch("/api/ppm/all/" + id, {
         method: "GET",
         headers: headers,
      });

      const result = await response.json();
      // console.log(result);
      // return;

      if (response.ok) {
         items = result.dbData;
         console.log(result);
      } else {
         console.log(response);
         // console.log("gagal");
      }
   });

   function detail(ev) {
      let propId = ev.target.getAttribute("pid");
      $route("/dosen/proposals/" + propId);
      // location.href = "/dosen/proposals/" + propId;
   }

   function addProposal() {
      // $route("/dosen/proposal");
      location.href = "/dosen/proposal";
   }
</script>

{#if items}
   <Article>
      <h1 class="title is-1">PPM Management</h1>
      <hr />

      <button class="button is-info" on:click={addProposal}>
         <span class="icon">
            <Icon id="orang" src={accountAdd} />
         </span>
         <!-- svelte-ignore a11y-missing-attribute -->
         <span><a>Buat Proposal</a></span>
      </button>

      <table class="table is-fullwidth is-striped is-hoverable">
         <thead>
            <tr>
               <th>Judul</th>
               <th>Abstract</th>
               <!-- <th>Progress</th> -->
               <th>Status</th>
               <th colspan="2">Action</th>
            </tr>
         </thead>

         <tbody>
            {#each items as item}
               <tr>
                  <td><p>{item.judul}</p> </td>
                  <td><p>{@html item.abstrak}</p> </td>
                  <!-- <td
                     ><progress class="progress is-success" value="60" max="100"
                        >60%</progress
                     ></td
                  > -->
                  <td class="status" pid={item.id}>
                     <Status code={item.status} />
                  </td>
                  <td class="review"
                     ><button
                        class="button is-info is-rounded is-small"
                        pid={item.id}
                        on:click={detail}
                        ><span class="icon">
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

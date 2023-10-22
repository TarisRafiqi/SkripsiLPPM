<script>
   import { onMount } from "svelte";
   import { route } from "../../store";
   import { Field, Modal, Article, Status } from "@cmp";

   export let params;
   const id = params["1"];

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
   let judul, abstrak;

   onMount(async () => {
      //
      ka_departemen = await findRole(11);
      ka_lppm = await findRole(12);
      ka_pusat_kajian = await findRole(13);
      reviewer = await findRole(10);

      const response = await fetch("/api/ppm/" + id);
      const result = await response.json();

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
         kdeptSelected = items[6].value;
         klppmSelected = items[7].value;
         kpkSelected = items[8].value;
         reviewerSelected = items[9].value;
      }
   });

   async function handleRevisi() {
      status = items[4].value - 1;
      const payload = {
         id: id,
         judul,
         abstrak,
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
         $route("/admin/proposals");
      } else {
         console.log(response);
      }
   }

   async function handlePass() {
      status = items[4].value + 2;
      const payload = {
         id: id,
         judul,
         abstrak,
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

      if (response.ok) {
         $route("/admin/proposals");
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
</script>

{#if items}
   <Article>
      <h1>Proposal</h1>

      <br />

      {#each items as item}
         {#if item.field !== "comment" && item.field !== "uid_kdept" && item.field !== "uid_klppm" && item.field !== "uid_kpk" && item.field !== "uid_reviewer"}
            {#if item.field === "uid"}
               <Field
                  view
                  name={item.field}
                  value={item.value}
                  href={"/admin/profile/" + item.value}
               />
            {:else if item.field === "status"}
               <Field view name={item.field}>
                  <Status code={item.value} />
               </Field>
            {:else}
               <Field view name={item.field} value={item.value} />
            {/if}
         {/if}
      {/each}

      <Field name="Comment" bind:value={comment} textarea />

      <Field
         name="Ka. Departemen"
         bind:value={ka_departemen}
         bind:selected={kdeptSelected}
         select
         view
         userId={kdeptSelected}
      />
      <Field
         name="Ka. LPPM"
         bind:value={ka_lppm}
         bind:selected={klppmSelected}
         select
         view
         userId={klppmSelected}
      />
      <Field
         name="Reviewer"
         bind:value={reviewer}
         bind:selected={reviewerSelected}
         select
         view
         userId={reviewerSelected}
      />
      <Field
         name="Ka. Pusat Kajian"
         bind:value={ka_pusat_kajian}
         bind:selected={kpkSelected}
         select
         view
         userId={kpkSelected}
      />

      <br />

      <Field>
         <button on:click={handleRevisi}>Revisi</button>
         <button on:click={handlePass}>Proses</button>
      </Field>
   </Article>
{/if}

<Modal bind:show={showModal}>
   <h2 slot="header">Find Approval</h2>
   <p>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores fuga
      odit accusamus, neque nulla vitae! Fugiat, accusamus amet? Cum est
      delectus soluta iusto odio architecto impedit maxime non asperiores
      eligendi?
   </p>
</Modal>

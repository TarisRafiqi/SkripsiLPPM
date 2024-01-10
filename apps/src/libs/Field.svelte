<script>
   import { onMount } from "svelte";

   export let id;
   export let name = "";
   export let value = "";
   // export let type = "";
   export let selected;
   export let textarea = false;
   export let datepicker = false;
   export let select = false;
   export let view;
   export let href;
   export let onclick;
   export let userId;

   // export let user;

   // onMount(async () => {
   //    const id = params["1"];
   //    const response = await fetch("/api/research/0/" + id);
   //    const result = await response.json();

   //    if (response.ok) {
   //       items = [];
   //       for (const [field, value] of Object.entries(result)) {
   //          let obj = {
   //             field: field,
   //             value: value,
   //          };
   //          items.push(obj);
   //       }
   //       uidReviewer = items[9].value;
   //    }
   // });

   const slot = $$props.$$slots || {};
   const hasSlot = slot.hasOwnProperty("default");

   if (name) {
      name = name[0].toUpperCase() + name.slice(1);
      name = name.replaceAll("__", "/").replaceAll("_", " ");
   }

   function fillSelect(event) {
      let select = event.target;
      selected = Number(select.value);
   }

   function goSelect(el) {
      // console.log(el);
      let valueId = el.value;
      // select={items.id===50}
      // console.log(valueId, "--", user, el.innerText);
      if (Number(valueId) === userId) {
         el.setAttribute("selected", "");
      }
   }
</script>

<div class:view>
   <b>{name}</b>

   {#if hasSlot}
      <!-- svelte-ignore a11y-missing-attribute -->
      <a>
         <slot />
      </a>
   {:else if textarea && !view}
      <textarea {id} bind:value on:click={onclick} />
   {:else if datepicker && !view}
      <input class="input" type="month" bind:value on:click={onclick} />
   {:else if select && view}
      <!-- true && !false-->
      <!-- true && true -->
      <!-- true -->
      <select on:change={fillSelect}>
         {#each value as it}
            <option value={it.id} use:goSelect>{it.username}</option>
         {/each}
      </select>
   {:else if view}
      <a {href}>{value}</a>
   {:else}
      <input type="text" bind:value on:click={onclick} />
   {/if}
</div>

<style>
   input[type="month"] {
      background-color: #5ca7f1;
      color: #ffffff;
      border: none;
      outline: none;
      /* border-radius: 5px; */
   }

   ::-webkit-calendar-picker-indicator {
      background-color: #ffffff;
      padding: 6px;
      cursor: pointer;
      border-radius: 20px;
   }
   div {
      display: grid;
      grid-template-columns: 12rem auto;
      gap: 1rem;
   }

   div + :global(div) {
      margin-top: 0.5rem;
   }

   div a,
   :not(.view) b {
      line-height: 38px;
   }

   div > :global(span) {
      display: inline-flex;
      align-items: center;
      min-height: 2.375rem;
      column-gap: 0.35rem;
   }

   div > :global(span *) {
      margin: 0;
   }

   [href] {
      color: #35f;
   }
</style>

<script>
   export let items;
   export let start = 1;
   export let result = [];

   let focused = 0;
   let value = "";
   let filteredItems = items;

   function changeFocus() {
      focused = !focused;
   }

   function setSelected(e) {
      e.preventDefault();
      let el = e.target;
      if (el.classList.contains("selected")) {
         el.classList.remove("selected");
         result = result.filter((it) => {
            return it.value !== el.getAttribute("data-value");
         });
      } else {
         el.classList.add("selected");
         // result = [...result, el.getAttribute("data-value")];
         // result.push({
         //    value: el.getAttribute("data-value"),
         //    label: el.innerText,
         // });
         result = [
            ...result,
            {
               value: el.getAttribute("data-value"),
               label: el.innerText,
            },
         ];
      }
      // console.log(result);
   }

   function doFilter() {
      if (value.length >= start) {
         filteredItems = items.filter((item) => {
            return item.label.toLowerCase().match(value.toLowerCase());
         });
      } else {
         filteredItems = items;
      }
   }

   function clickOutside(e) {
      let el = e.target;
      if (el.tagName !== "A" && el.tagName !== "INPUT") {
         value = "";
         focused = 0;
      }
   }

   document.querySelector("body").addEventListener("click", clickOutside);

   $: value, (focused = value.length >= start ? 1 : 0), doFilter();
</script>

<div class="select">
   <input
      class="input"
      placeholder="Cari user (min 2 huruf)"
      bind:value
      class:focused
   />
   {#if filteredItems}
      <span>
         {#each filteredItems as item}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <!-- svelte-ignore a11y-missing-attribute -->
            <a on:click={setSelected} data-value={item.value}>{item.label}</a>
         {/each}
      </span>
   {/if}
</div>

<style>
   div {
      position: relative;
      display: inline-flex;
   }
   span {
      z-index: 100;
      position: absolute;
      display: none;
      right: 0;
      left: 0;
      top: 40px;
      background: white;
      border: 1px solid #ccc;
      cursor: pointer;
   }
   /* input {
       height: 32px; 
   } */
   a {
      position: relative;
      display: block;
      margin: 0;
      padding: 0.25rem 1rem;
      text-decoration: none;
      color: inherit;
   }
   a:hover {
      background: #f0f6fd;
   }
   :global(.select a.selected::after) {
      content: "✔";
      position: absolute;
      right: 0.25rem;
   }
   .focused + span {
      display: block;
   }
</style>

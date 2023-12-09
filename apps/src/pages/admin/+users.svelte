<script>
   import { route } from "../../store";
   import { Article, Icon } from "@cmp";
   import { accountAdd } from "../../store/icons";

   export let params;

   let profile;
   let items;

   // Pakai akses token, Hanya tole Admin yang bisa mengakses halaman ini
   async function populateTable() {
      const accessToken = localStorage.getItem("token");

      const headers = {
         Authorization: `${accessToken}`,
         "Content-Type": "application/json",
      };

      const response = await fetch("/api/user", {
         method: "GET",
         headers: headers,
      });
      const result = await response.json();
      console.log(result);

      if (response.status === 200) {
         items = result.dbData;
         // console.log(items);
      }
   }

   async function handleActive(ev) {
      const value = ev.target.getAttribute("role");
      const id = ev.target.getAttribute("uid");

      const payload = {
         id: items[id].id,
         active: !items[id].active,
         role: Number(value),
      };

      const response = await fetch("/api/user", {
         method: "PATCH",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (response.ok) {
         populateTable();
      } else {
         console.log(response);
      }
   }

   async function handleGroup(ev) {
      const value = ev.target.value;
      const id = ev.target.getAttribute("uid");

      const payload = {
         id: items[id].id,
         role: Number(value),
         active: items[id].active,
      };

      const response = await fetch("/api/user", {
         method: "PATCH",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
         populateTable();
      } else {
         console.log(response);
      }
   }

   // Pakai akses Token, hanya uid pemilik dan role Admin yang bisa mengakses halaman ini
   async function getPage() {
      if (params["1"] === "profile") {
         let id = params["2"];
         const response = await fetch("/api/user/" + id);
         const result = await response.json();
         if (response.ok) {
            if (!result.length) return;
            profile = [];
            for (const [field, value] of Object.entries(result[0])) {
               profile.push({
                  field,
                  value,
               });
            }
         } else {
            data = null;
         }
      }
   }

   function addUser() {
      $route("/admin/createuser");
   }

   $: params, getPage();
   $: profile, profile ? (items = null) : populateTable();
</script>

<Article>
   {#if items}
      <h1 class="title is-1">User Management</h1>
      <hr />

      <button class="button is-info" on:click={addUser}>
         <span class="icon">
            <Icon id="orang" src={accountAdd} />
         </span>
         <!-- svelte-ignore a11y-missing-attribute -->
         <span><a>Create User</a></span>
      </button>

      <table class="table is-fullwidth is-striped is-hoverable">
         <thead>
            <tr>
               <th>Username</th>
               <th>Email</th>
               <th>Role</th>
               <th>Active</th>
            </tr>
         </thead>

         <tbody>
            {#each items as item, idx}
               <tr>
                  <td>
                     <a href={"/admin/profile/" + item.id}>
                        {item.username}
                     </a>
                  </td>
                  <td>{item.email}</td>
                  <td fixed class="group">
                     <select uid={idx} on:change={handleGroup}>
                        <option value="9" selected={item.role === 9}
                           >Admin</option
                        >
                        <option value="0" selected={item.role === 0}
                           >Dosen</option
                        >
                        <option value="10" selected={item.role === 10}
                           >Reviewer</option
                        >
                        <option value="11" selected={item.role === 11}
                           >Ka. Departemen</option
                        >
                        <option value="12" selected={item.role === 12}
                           >Ka. LPPM</option
                        >
                        <option value="13" selected={item.role === 13}
                           >Ka. Pusat Kajian</option
                        >
                     </select>
                  </td>
                  <td
                     fixed
                     on:click={handleActive}
                     uid={idx}
                     role={item.role}
                     class="active"
                     class:red={!item.active}
                     >{item.active ? "✔" : "✘"}
                  </td>
               </tr>
            {/each}
         </tbody>
      </table>
   {/if}
</Article>

<style>
   [fixed] {
      text-align: center;
   }

   .group {
      padding: 0 0.5rem;
   }

   .active {
      color: green;
      cursor: pointer;
   }

   .active.red {
      color: orangered;
   }

   select {
      border: none;
      box-shadow: none;
      background: inherit;
   }
</style>

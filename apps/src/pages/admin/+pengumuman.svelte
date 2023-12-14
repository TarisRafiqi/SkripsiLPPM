<script>
   import { Article, Icon } from "@cmp";
   import { add } from "../../store/icons";
   // import { onMount } from "svelte";
   // import { route } from "../../store";

   // Pakai akses token, Hanya role admin yang bisa mengakses halaman ini
   // onMount(async () => {
   //    const accessToken = localStorage.getItem("token");

   //    const headers = {
   //       Authorization: `${accessToken}`,
   //       "Content-Type": "application/json",
   //    };

   //    const response = await fetch("/api/pengumuman", {
   //       method: "GET",
   //       headers: headers,
   //    });
   //    const result = await response.json();
   //    // console.log(result);

   //    if (response.ok) {
   //       items = result.dbData;
   //    }
   // });

   function addPengumuman() {
      // test
   }
</script>

<Article>
   <h1 class="title is-1">Pengumuman</h1>
   <hr />

   <div class="columns notification is-info is-light">
      <div class="column is-4">
         <p>
            Lorem ipsum dolor sit <strong>Pengumuman</strong>
         </p>
      </div>

      <div class="column">
         <button class="button is-info" on:click={addPengumuman}>
            <span class="icon">
               <Icon id="add" src={add} />
            </span>
            <!-- svelte-ignore a11y-missing-attribute -->
            <span><a>Buat Pengumuman</a></span>
         </button>
      </div>
   </div>

   <table class="table is-fullwidth is-striped is-hoverable">
      <thead>
         <tr>
            <th>Judul</th>
            <th>Isi</th>
            <th>Action</th>
         </tr>
      </thead>
      <tbody>
         <tr>
            <td>.......</td>
            <td>.......</td>
            <td>.......</td>
         </tr>
      </tbody>
   </table>
</Article>

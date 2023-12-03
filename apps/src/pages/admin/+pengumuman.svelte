<script>
   import { Article, Status } from "@cmp";
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
</script>

<Article>
   <h1>Pengumuman</h1>
   <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur cum
      dicta voluptatibus sequi! Saepe eos quo et incidunt mollitia assumenda,
      quis, dolore voluptates aut, consectetur ad eaque soluta explicabo sit.
   </p>
</Article>

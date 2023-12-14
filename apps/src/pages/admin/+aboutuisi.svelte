<script>
   import { Article, Field } from "@cmp";
   import { onMount } from "svelte";

   onMount(() => {
      tinymce.init({
         selector: "textarea",
         plugins:
            "ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss",
         toolbar:
            "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
         tinycomments_mode: "embedded",
         tinycomments_author: "Author name",
         mergetags_list: [
            { value: "First.Name", title: "First Name" },
            { value: "Email", title: "Email" },
         ],
         ai_request: (request, respondWith) =>
            respondWith.string(() =>
               Promise.reject("See docs to implement AI Assistant")
            ),
      });
   });

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
   <h1 class="title is-1">About UISI</h1>
   <hr />

   <Field id="lppmUISI" textarea name="LPPM UISI" />
   <Field id="fungsiTujuan" textarea name="Fungsi dan Tujuan" />
   <Field id="visiMisi" textarea name="Visi dan Misi" />
</Article>

<script>
   import { onMount } from "svelte";
   import { Field, Article, Icon, Status } from "@cmp";
   import { route } from "../../store";
   import { uploadIcon, deleteIcon } from "../../store/icons";
   // import Editor from "@tinymce/tinymce-svelte";
   import Select from "src/libs/Select.svelte";

   let file;

   async function handleDownload(e) {
      e.preventDefault();
      const accessToken = localStorage.getItem("token");

      const headers = {
         Authorization: `${accessToken}`,
         "Content-Type": "application/json",
      };

      const response = await fetch("/api/upload", {
         method: "GET",
         headers: headers,
      });
      const result = await response.json();

      if (response.ok) {
         console.log(result);
         // let bufferData = new Uint8Array(result.data);
         // Create a Blob from the buffer
         let blob = new Blob([result.data]);
         // Create an object URL for the Blob
         let objectURL = URL.createObjectURL(blob);
         console.log(objectURL);
         const a = document.createElement("a");
         a.href = objectURL;
         a.download = "sample.xlsx";
         document.body.appendChild(a);
         // a.click();
         // location.pathname = objectURL;
         // history.replaceState(null, null, objectURL);
         // history.replaceState(
         //    null,
         //    null,
         //    window.location.pathname + "your thing here"
         // );
         // document.body.removeChild(a);
         // window.URL.revokeObjectURL(objectURL);
      }
   }

   async function handleFileUpload() {
      const accessToken = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("file", file);

      try {
         const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
         });
         const result = await response.json();
         console.log(result);
      } catch (error) {
         console.error("Error uploading file:", error);
      }
      return;

      if (response.ok) {
         // console.log(result);
         // return;
         $route("/dosen");
      } else {
         console.log(result.msg);
      }
   }
</script>

<Article>
   <br />

   <input type="file" on:change={(e) => (file = e.target.files[0])} />

   <br />
   <br />

   <button on:click={handleFileUpload}>Upload File</button>

   <br />
   <br />

   <button on:click={handleDownload}>Download</button>
</Article>

<style>
   /* main {
      text-align: center;
      margin: 1em;
      padding: 1em;
      max-width: 240px;
      margin-left: auto;
      margin-right: auto;
   } */

   /* h1 {
      color: #ff3e00;
      text-transform: uppercase;
      font-size: 4em;
      font-weight: 100;
   } */

   /* @media (min-width: 768px) {
      main {
         max-width: none;
      }
   } */
</style>

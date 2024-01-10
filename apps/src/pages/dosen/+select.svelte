<script>
   import { onMount } from "svelte";
   import { Field, Article, Icon, Status } from "@cmp";
   import { route } from "../../store";
   // import Editor from "@tinymce/tinymce-svelte";
   import Select from "src/libs/Select.svelte";

   let file;
   let denganRupiahValue = "";
   let randomFileName = "";

   const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
   let result = "";

   for (let i = 0; i < 30; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
   }

   randomFileName = result;

   async function handleDownload(e) {
      const accessToken = localStorage.getItem("token");
      const headers = {
         Authorization: `${accessToken}`,
         "Content-Type": "application/json",
      };
      let filename = "rab.xlsx";
      try {
         const response = await fetch(`/api/upload/${randomFileName}`, {
            method: "GET",
            headers: headers,
         });
         const blob = await response.blob();
         const link = document.createElement("a");
         link.href = window.URL.createObjectURL(blob);
         link.download = filename;
         link.click();
      } catch (error) {
         console.error("Error downloading file:", error);
      }
   }

   async function handleFileUpload() {
      const accessToken = localStorage.getItem("token");

      const reader = new FileReader();
      reader.onloadend = async () => {
         const base64Data = reader.result.split(",")[1];
         const payloadfile = {
            file: {
               name: file.name,
               type: file.type,
               data: base64Data,
            },
            randomFileName,
         };

         try {
            const response = await fetch("/api/upload", {
               method: "POST",
               headers: {
                  Authorization: `${accessToken}`,
                  "Content-Type": "application/json",
               },
               body: JSON.stringify(payloadfile),
            });
            const result = await response.json();
            console.log(result);
         } catch (error) {
            console.error("Error uploading file:", error);
         }
      };
      reader.readAsDataURL(file);
   }

   function formatRupiah(angka, prefix) {
      var number_string = angka.replace(/[^,\d]/g, "").toString(),
         split = number_string.split(","),
         sisa = split[0].length % 3,
         rupiah = split[0].substr(0, sisa),
         ribuan = split[0].substr(sisa).match(/\d{3}/gi);

      if (ribuan) {
         separator = sisa ? "." : "";
         rupiah += separator + ribuan.join(".");
      }

      rupiah = split[1] !== undefined ? rupiah + "," + split[1] : rupiah;
      return prefix === undefined ? rupiah : rupiah ? "Rp. " + rupiah : "";
   }
</script>

<Article>
   <Field name="Biaya Penelitian">
      <input
         class="input"
         type="text"
         bind:value={denganRupiahValue}
         on:keyup={() =>
            (denganRupiahValue = formatRupiah(denganRupiahValue, "Rp. "))}
      />
   </Field>

   <br />
   <br />

   <h1>Random Character Generator</h1>
   <br />
   <button>Generate Random Character</button>
   {#if randomFileName}
      <p>Random Character: {randomFileName}</p>
   {/if}

   <br />
   <br />
   <br />

   <input
      class="input"
      accept=".xlsx"
      type="file"
      on:change={(e) => (file = e.target.files[0])}
   />

   <br />
   <br />

   <button on:click={handleFileUpload}>Upload File</button>

   <br />
   <br />

   <button on:click={handleDownload}>Download</button>

   <br />
   <br />
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

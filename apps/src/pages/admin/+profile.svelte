<script>
   import { onMount } from "svelte";
   import { route } from "../../store";
   import { Field, Article } from "@cmp";

   export let params;

   let items;
   let show = true;
   const id = params["1"];

   let msgNip;

   // Pakai akses token, hanya uid yang bersangkutan yang bisa lihat, kecuali admin
   onMount(async () => {
      const accessToken = localStorage.getItem("token");

      const headers = {
         Authorization: `${accessToken}`,
         "Content-Type": "application/json",
      };

      const response = await fetch("/api/user/" + id, {
         method: "GET",
         headers: headers,
      });
      const result = await response.json();

      if (response.ok) {
         items = [];
         for (const [field, value] of Object.entries(result[0])) {
            items.push({ field, value });
         }
      }
   });

   async function simpan() {
      let payload = {};
      msgNip = "";
      items.map((item) => {
         if (item.field === "id") {
            if (String(item.value).match(/[a-zA-Z]/)) {
               console.log("Entri berisikan huruf");
            } else {
               payload.id = Number(item.value);
            }
         }

         if (item.field === "uid") {
            if (String(item.value).match(/[a-zA-Z]/)) {
               console.log("Entri berisikan huruf");
            } else {
               payload.uid = Number(item.value);
            }
         }

         if (item.field === "nama_lengkap") {
            if (item.value.match(/[0-9]/)) {
               console.log("Entri berisikan angka");
            } else {
               payload.nama_lengkap = item.value;
            }
         }

         if (item.field === "nip") {
            if (String(item.value).match(/[a-zA-Z]/)) {
               console.log("Entri berisikan huruf");
               msgNip = "Entri berisikan huruf";
            } else {
               payload.nip = Number(item.value);
            }
         }

         if (item.field === "nidn") {
            if (String(item.value).match(/[a-zA-Z]/)) {
               console.log("Entri berisikan huruf");
            } else {
               payload.nidn = Number(item.value);
            }
         }

         if (item.field === "tempat_lahir") {
            if (item.value.match(/[0-9]/)) {
               console.log("Entri berisikan angka");
            } else {
               payload.tempat_lahir = item.value;
            }
         }

         if (item.field === "tanggal_lahir") {
            if (String(item.value).match(/[a-zA-Z]/)) {
               console.log("Entri berisikan huruf");
            } else {
               payload.tanggal_lahir = Number(item.value);
            }
         }

         if (item.field === "alamat_rumah") {
            payload.alamat_rumah = item.value;
         }

         if (item.field === "alamat_kantor") {
            payload.alamat_kantor = item.value;
         }

         if (item.field === "nomor_handphone") {
            if (String(item.value).match(/[a-zA-Z]/)) {
               console.log("Entri berisikan huruf");
            } else {
               payload.nomor_handphone = Number(item.value);
            }
         }

         if (item.field === "nomor_whatsapp") {
            if (String(item.value).match(/[a-zA-Z]/)) {
               console.log("Entri berisikan huruf");
            } else {
               payload.nomor_whatsapp = Number(item.value);
            }
         }

         if (item.field === "perguruan_tinggi_asal") {
            payload.perguruan_tinggi_asal = item.value;
         }

         if (item.field === "program_studi") {
            if (item.value.match(/[0-9]/)) {
               console.log("Entri berisikan angka");
            } else {
               payload.program_studi = item.value;
            }
         }

         if (item.field === "jabatan_fungsional") {
            if (item.value.match(/[0-9]/)) {
               console.log("Entri berisikan angka");
            } else {
               payload.jabatan_fungsional = item.value;
            }
         }

         if (item.field === "pangkat_golongan") {
            if (item.value.match(/[0-9]/)) {
               console.log("Entri berisikan angka");
            } else {
               payload.pangkat_golongan = item.value;
            }
         }
      });

      const response = await fetch("/api/userprofile", {
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

   $: params;
</script>

{#if items}
   <Article>
      <h1>Profile</h1>
      <br />
      {#each items as item}
         <Field name={item.field} bind:value={item.value} />
      {/each}

      {#if msgNip}
         <p><small>{msgNip}</small></p>
      {/if}

      <Field>
         <button on:click={simpan}>Simpan</button>
      </Field>
   </Article>
{/if}

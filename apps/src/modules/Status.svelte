<script>
   export let code;

   // console.log(code);
</script>

{#if code === 0}
   Draft Proposal
{:else if code === 1}
   Revisi Proposal
{:else if code === 2}
   Review Administrasi
{:else if code === 3}
   Revisi Ka. Departemen
{:else if code === 4}
   Review Ka. Departemen
{:else if code === 5}
   Revisi Ka. LPPM
{:else if code === 6}
   Review Ka. LPPM
{:else if code === 7}
   Revisi Reviewer
{:else if code === 8}
   Review Reviewer
{:else if code === 9}
   Revisi Ka. Pusat Kajian
{:else if code === 10}
   Review Ka. Pusat Kajian
{:else if code === 11}
   Ditolak Ka. Pusat Kajian
{:else if code === 12}
   Penelitian Dimulai
{:else if code === 13}
   Penelitian Selesai
{/if}

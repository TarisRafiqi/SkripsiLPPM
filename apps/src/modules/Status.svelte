<script>
   export let code;

   // console.log(code);
</script>

{#if code === 0}
   <span class="tag is-warning is-light is-rounded">Draft Proposal</span>
   <!-- Draft Proposal -->
{:else if code === 1}
   <span class="tag is-danger is-light is-rounded">Revisi Proposal</span>
   <!-- Revisi Proposal -->
{:else if code === 2}
   <span class="tag is-warning is-rounded">Review Administrasi</span>
   <!-- Review Administrasi -->
{:else if code === 3}
   <span class="tag is-danger is-light is-rounded">Revisi Ka.Departemen</span>
   <!-- Revisi Ka.Departemen -->
{:else if code === 4}
   <span class="tag is-warning is-rounded">Review Ka. Departemen</span>
   <!-- Review Ka. Departemen -->
{:else if code === 5}
   <span class="tag is-danger is-light is-rounded"> Revisi Ka. LPPM</span>
   <!-- Revisi Ka. LPPM -->
{:else if code === 6}
   <span class="tag is-warning is-rounded"> Review Ka. LPPM</span>
   <!-- Review Ka. LPPM -->
{:else if code === 7}
   <span class="tag is-danger is-light is-rounded">Revisi Reviewer</span>
   <!-- Revisi Reviewer -->
{:else if code === 8}
   <span class="tag is-warning is-rounded">Review Reviewer</span>
   <!-- Review Reviewer -->
{:else if code === 9}
   <span class="tag is-danger is-light is-rounded">Revisi Ka. Pusat Kajian</span
   >
   <!-- Revisi Ka. Pusat Kajian -->
{:else if code === 10}
   <span class="tag is-warning is-rounded">Review Ka. Pusat Kajian</span>
   <!-- Review Ka. Pusat Kajian -->
{:else if code === 11}
   <span class="tag is-danger is-rounded">Proposal Ditolak</span>
   <!-- Ditolak Ka. Pusat Kajian -->
{:else if code === 12}
   <span class="tag is-link is-rounded">PPM Berjalan</span>
   <!-- Penelitian Dimulai -->
{:else if code === 13}
   <span class="tag is-success is-rounded">PPM Selesai</span>
   <!-- Penelitian Selesai -->
{/if}

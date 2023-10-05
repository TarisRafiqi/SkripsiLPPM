<script>
   export let id;
   export let src;
   export let size = 1;

   let width = 24 * Number(size);
   let tinggi = 24 * Number(size);
</script>

<svg
   {id}
   xmlns="http://www.w3.org/2000/svg"
   {width}
   height={tinggi}
   viewBox="0 0 24 24"><path fill="currentColor" d={src} /></svg
>

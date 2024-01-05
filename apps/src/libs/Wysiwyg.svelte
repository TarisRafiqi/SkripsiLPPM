<script>
   import { onMount, afterUpdate } from "svelte";

   export let id;
   export let content = "";
   export let name;

   let me;
   let selector = "#" + id;

   onMount(() => {
      try {
         // tinymce.activeEditor.destroy();
         tinymce.remove(selector);
      } catch (error) {}
      tinymce.init({
         selector: selector,
         plugins:
            "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount ",
         toolbar:
            "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
         tinycomments_mode: "embedded",
         tinycomments_author: "Author name",
         mergetags_list: [
            { value: "First.Name", title: "First Name" },
            { value: "Email", title: "Email" },
         ],
      });
   });
</script>

<div>
   <textarea bind:this={me} {name} {id}>
      {content}
   </textarea>
</div>

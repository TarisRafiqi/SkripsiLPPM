<script>
   import { Article, Icon } from "@cmp";
   import { menu } from "../../store/icons";
</script>

<Article>
   <h1 class="title is-1">Dashboard</h1>

   <hr />

   <div class="columns notification is-info is-light">
      <p>
         Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis quos
         veniam hic ad ratione, modi voluptatum perferendis praesentium facere,
         recusandae illo. Officiis, ab omnis. Animi earum exercitationem qui
         atque vero.
      </p>
   </div>

   <!-- <a href="/">
      <Icon id="orang" src={menu} />
      Home
   </a> -->
</Article>

<style>
   :global(#orang) {
      color: #b8b8b8;
   }

   /* a {
      display: flex;
      align-items: center;
      gap: 0.5rem;
   } */
</style>

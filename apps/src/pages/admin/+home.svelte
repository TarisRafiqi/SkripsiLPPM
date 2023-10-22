<script>
   import { Article, Icon } from "@cmp";
   import { menu } from "../../store/icons";
</script>

<Article>
   <h1>Dashboard</h1>
   <hr />
   <p>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga dolorum
      inventore eius ratione. Animi, aperiam dolore. Aut iure earum reiciendis
      iste rerum eveniet tempora nisi porro, animi molestiae obcaecati unde?
   </p>

   <a href="/">
      <Icon id="orang" src={menu} />
      Home
   </a>
</Article>

<style>
   :global(#orang) {
      color: #b8b8b8;
   }

   a {
      display: flex;
      align-items: center;
      gap: 0.5rem;
   }
</style>

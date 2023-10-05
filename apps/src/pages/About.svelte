<script>
   import { Hero } from "src";
   import { route } from "../store";

   function handleLogin(ev) {
      $route("/login");
   }
</script>

<Hero>
   <div middle slot="left">
      <h1>Application</h1>
      <p>
         Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorum ex
         numquam, accusantium eligendi praesentium eum molestiae porro
         voluptatum ipsam consequuntur, soluta aliquid aliquam at voluptas odit
         tempora! Natus, quo eum.
      </p>
      <p>
         Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex facilis
         doloribus voluptate asperiores, similique non repellat iste corrupti
         voluptatem ullam ad labore harum impedit itaque error sed molestias
         dolorum deleniti?
      </p>
   </div>
   <div middle slot="right">
      <a href="/login">Login</a>
      <p>
         Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem ea quos
         commodi blanditiis sint perferendis at eaque rem obcaecati corporis,
         soluta excepturi dolor eveniet amet vitae natus? Officia, quia nam.
      </p>

      <span>
         <button on:click={$route("/login")}>Login</button>
         <button on:click={$route("/register")}>Register</button>
      </span>
   </div>
</Hero>

<article class="container">
   <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam
      asperiores ducimus nemo! Assumenda nihil, mollitia pariatur repellat,
      laudantium nemo delectus exercitationem, quos magnam architecto eaque
      perferendis distinctio unde. Veritatis, alias.
   </p>
   <p>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Praesentium
      dolorem sed nulla rerum eligendi modi nam impedit debitis nostrum at? Id
      doloremque libero debitis! Accusantium sapiente aspernatur quas harum
      cumque.
   </p>
</article>

<script>
   import { Hero } from "src";
   import { route } from "../store";

   function handleLogin(ev) {
      $route("/login");
   }

   let accordionName;
   let pengumuman = [
      {
         label: "1",
         idPengumuman: "1",
         title: "Perpanjangan Batas Akhir Upload Proposal",
         content:
            " Pengumuman 1 : Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam delectus ex dolorem, consequatur tenetur at cupiditate ab corporis quos sed. Deserunt qui nostrum ullam praesentium sed unde placeat, dolorum aliquid? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore asperiores blanditiis repellendus velit id? Doloribus dolor neque aut expedita, nam nostrum.",
      },
      {
         label: "2",
         idPengumuman: "2",
         title: "Daftar proposal lolos pendanaan",
         content:
            " Pengumuman 2 : Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam delectus ex dolorem, consequatur tenetur at cupiditate ab corporis quos sed. Deserunt qui nostrum ullam praesentium sed unde placeat, dolorum aliquid? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore asperiores blanditiis repellendus velit id? Doloribus dolor neque aut expedita, nam nostrum.",
      },
      {
         label: "3",
         idPengumuman: "3",
         title: "Pembukaan Pendaftaran Proposal Penelitian & Pengabdian",
         content:
            " Pengumuman 3 : Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam delectus ex dolorem, consequatur tenetur at cupiditate ab corporis quos sed. Deserunt qui nostrum ullam praesentium sed unde placeat, dolorum aliquid? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore asperiores blanditiis repellendus velit id? Doloribus dolor neque aut expedita, nam nostrum.",
      },
   ];
</script>

<Hero>
   <div>
      <h1>Welcome to LPPM UISI</h1>
      <p>
         Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo in
         doloribus voluptate? Culpa, sit architecto. Consequuntur impedit
         necessitatibus harum sed corrupti deleniti, ratione consequatur
         quisquam perferendis, vitae eum. Consequuntur, sed?
      </p>
      <span>
         <button on:click={$route("/login")}>Login</button>
         <button on:click={$route("/register")}>Register</button>
      </span>
   </div>
</Hero>

<section>
   <article class="container">
      <div class="head-pengumuman">
         <h2>PENGUMUMAN</h2>
         <hr class="style-two" />
         <p>
            Daftar Pengumuman terkait kegiatan Penelitian & Pengabdian
            Masyarakat LPPM UISI
         </p>
      </div>

      <br />

      <div class="list pengumuman">
         <ul id="accordion">
            {#each pengumuman as p}
               <li>
                  <label for={p.label}>{p.title}</label>
                  <input
                     hidden
                     type="checkbox"
                     name={accordionName}
                     id={p.idPengumuman}
                  />
                  <div class="content">
                     <p>{p.content}</p>
                  </div>
               </li>
            {/each}
         </ul>
      </div>
   </article>
</section>

<article class="container">
   <br />
   <p class="text">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam
      asperiores ducimus nemo! Assumenda nihil, mollitia pariatur repellat,
      laudantium nemo delectus exercitationem, quos magnam architecto eaque
      perferendis distinctio unde. Veritatis, alias.
   </p>
</article>

<style>
   .head-pengumuman {
      text-align: center;
   }
   section {
      background-color: #f3f5fa;
      padding: 60px 0;
   }

   /* Pengumuman */
   #accordion {
      list-style-type: none;
      margin: 0;
      padding: 0;
   }

   #accordion li {
      width: 100%;
      margin-bottom: 10px;
      background: #ffffff;
      padding: 10px;
      border-radius: 10px;
   }

   #accordion li label {
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 18px;
      font-weight: 500;
      cursor: pointer;
      color: #2dabf9;
   }

   /* #accordion li label span {
      transform: rotate(90deg);
      font-size: 22px;
      font-weight: 700;
      color: #333;
   } */

   #accordion label + [hidden] {
      display: none;
   }

   #accordion label + [hidden]:checked + .content {
      max-height: 400px;
   }

   #accordion .content {
      padding: 0 10px;
      line-height: 26px;
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.6s;
   }
</style>

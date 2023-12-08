<script>
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

<section>
   <article class="container">
      <div class="content">
         <h2>PENGUMUMAN</h2>
         <!-- <hr
            style="height:1px;border-width:0;color:gray;background-color:gray;width:50%"
         /> -->

         <!-- <hr
            style="height:2px;border-width:0;color:gray;background-color:gray"
         /> -->
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

<style>
   .content {
      text-align: center;
   }

   /* .head-pengumuman {
      text-align: center;
   } */
   section {
      /* background-color: #f3f5fa; */
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
      background: #f7f7f7;
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

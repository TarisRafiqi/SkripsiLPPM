<script>
   import { route } from "../store";
   import { Article, Icon } from "@cmp";
   import { menu } from "../store/icons";

   function handleLogout(ev) {
      localStorage.clear();
      location.pathname = "/";
   }
</script>

<header>
   <div class="navbar">
      <div class="logo"><a href="/">Logo</a></div>
      <ul class="links">
         <li><a href="/">Beranda</a></li>
         <li><a href="/about">Profil</a></li>
         <li><a href="/penelitian">Penelitian</a></li>
         <li><a href="/abdimas">Abdimas</a></li>
      </ul>
      <!-- <button class="button-blue" on:click={$route("/login")}>Login</button> -->
      <a class="action_btn" href="/login">Login</a>
      <div class="toggle_btn">
         <a href="/">
            <Icon id="orang" src={menu} />
         </a>
      </div>
   </div>

   <div class="dropdown_menu open">
      <li><a href="/">Beranda</a></li>
      <li><a href="/about">Profil</a></li>
      <li><a href="/">Penelitian</a></li>
      <li><a href="/">Abdimas</a></li>
      <li><a href="/">Pendaftaran</a></li>
      <li><a class="action_btn" href="/login">Login</a></li>
   </div>
</header>

<style>
   * {
      padding: 0;
      /* margin: 0; */
      /* box-sizing: border-box; */
   }
   header {
      background-color: #2a2d2e;
      color: white;
      position: relative;
      padding: 0 2rem;
      /* top: 0;
      width: 100%; */
   }

   li {
      list-style: none;
   }

   a {
      cursor: pointer;
      text-decoration: none;
      font-size: 1rem;
   }

   a:hover {
      color: orange;
   }
   /* article {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 0.5em;
      padding-bottom: 0.5em;
   }
   article * {
      margin: 0;
   } */

   .navbar {
      width: 100%;
      height: 60px;
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
   }

   .navbar .logo a {
      font-size: 1.5rem;
      font-weight: bold;
   }

   .navbar .links {
      display: flex;
      gap: 2rem;
   }

   .navbar .toggle_btn {
      /* color: #fff; */
      font-size: 1.5rem;
      cursor: pointer;
      display: none;
   }

   .action_btn {
      background-color: orange;
      color: #fff;
      padding: 0.5rem 1rem;
      border: none;
      outline: none;
      /* border-radius: 20px; */
      border-radius: 0.6em;
      font-size: 0.8rem;
      font-weight: bold;
      cursor: pointer;
      transition: scale 0.2 ease;
   }

   .action_btn:hover {
      scale: 1.05;
      color: #fff;
   }

   .action_btn:active {
      scale: 0.95;
   }

   /* DROPDOWN MENU */
   .dropdown_menu {
      display: none;
      position: absolute;
      right: 2rem;
      top: 60px;
      height: 0;
      width: 300px;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(15px);
      border-radius: 10px;
      overflow: hidden;
      transition: height 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
   }

   .dropdown_menu.open {
      height: 300px;
   }

   .dropdown_menu li {
      padding: 0.7rem;
      display: flex;
      align-items: center;
      justify-content: center;
   }

   .dropdown_menu .action_btn {
      width: 100%;
      display: flex;
      justify-content: center;
   }

   /* RESPONSIVE DESIGN */
   @media screen and (max-width: 576px) {
      .dropdown_menu {
         right: 1rem;
         left: 1rem;
         width: unset;
      }
   }

   @media screen and (max-width: 768px) {
      .navbar .links,
      .navbar .action_btn {
         display: none;
      }

      .navbar .toggle_btn {
         display: block;
      }

      .dropdown_menu {
         display: block;
      }
   }

   @media screen and (max-width: 992px) {
   }

   @media screen and (max-width: 1200px) {
   }

   @media screen and (max-width: 1400px) {
   }
</style>

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
   <nav class="navbar is-dark">
      <div class="navbar-brand">
         <a class="navbar-item" href="https://bulma.io">
            <img
               src="https://bulma.io/images/bulma-logo.png"
               alt="Bulma: a modern CSS framework based on Flexbox"
               width="112"
               height="28"
            />
         </a>
         <div
            class="navbar-burger"
            data-target="navbarExampleTransparentExample"
         >
            <span></span>
            <span></span>
            <span></span>
         </div>
      </div>

      <div id="navbarExampleTransparentExample" class="navbar-menu">
         <div class="navbar-start">
            <a class="navbar-item" href="https://bulma.io/"> Home </a>
            <div class="navbar-item has-dropdown is-hoverable">
               <a
                  class="navbar-link"
                  href="https://bulma.io/documentation/overview/start/"
               >
                  Docs
               </a>
               <div class="navbar-dropdown is-boxed">
                  <a
                     class="navbar-item"
                     href="https://bulma.io/documentation/overview/start/"
                  >
                     Overview
                  </a>
                  <a
                     class="navbar-item"
                     href="https://bulma.io/documentation/overview/modifiers/"
                  >
                     Modifiers
                  </a>
                  <a
                     class="navbar-item"
                     href="https://bulma.io/documentation/columns/basics/"
                  >
                     Columns
                  </a>
                  <a
                     class="navbar-item"
                     href="https://bulma.io/documentation/layout/container/"
                  >
                     Layout
                  </a>
                  <a
                     class="navbar-item"
                     href="https://bulma.io/documentation/form/general/"
                  >
                     Form
                  </a>
                  <hr class="navbar-divider" />
                  <a
                     class="navbar-item"
                     href="https://bulma.io/documentation/elements/box/"
                  >
                     Elements
                  </a>
                  <a
                     class="navbar-item is-active"
                     href="https://bulma.io/documentation/components/breadcrumb/"
                  >
                     Components
                  </a>
               </div>
            </div>
         </div>

         <div class="navbar-end">
            <div class="navbar-item">
               <div class="field is-grouped">
                  <p class="control">
                     <a
                        class="button is-danger"
                        href="https://github.com/jgthms/bulma/releases/download/0.9.4/bulma-0.9.4.zip"
                     >
                        <!-- <span class="icon">
                           <i class="fas fa-download"></i>
                        </span> -->
                        <span>Login</span>
                     </a>
                  </p>
               </div>
            </div>
         </div>
      </div>
   </nav>
</header>

<style>
</style>

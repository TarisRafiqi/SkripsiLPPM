<script>
   import { Article, Icon } from "@cmp";
   // import { accountAdd } from "../../store/icons";
   import { route } from "../../store";

   function addUser() {
      $route("/admin/users");
   }
</script>

<Article>
   <h1 class="title is-1">Create User</h1>

   <hr />

   <div class="field">
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label class="label">Username</label>
      <div class="control">
         <input class="input" type="text" placeholder="Username..." />
      </div>
   </div>

   <div class="field">
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label class="label">Password</label>
      <div class="control">
         <input class="input" type="text" placeholder="Password..." />
      </div>
   </div>

   <div class="field">
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label class="label">Role</label>
      <div class="control">
         <div class="select">
            <select>
               <option>Ka.Departemen</option>
               <option>Ka.LPPM</option>
               <option>Ka.PusatKajian</option>
               <option>Reviewer</option>
               <option>Dosen</option>
            </select>
         </div>
      </div>
   </div>

   <br />

   <div class="field is-grouped">
      <div class="control">
         <button class="button is-link">Submit</button>
      </div>
      <div class="control">
         <button class="button is-link is-light">Cancel</button>
      </div>
   </div>
</Article>

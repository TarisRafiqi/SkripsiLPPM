import Abdimas from "./pages/Abdimas.svelte";
import About from "./pages/About.svelte";
import Index from "./pages/Index.svelte";
import Login from "./pages/Login.svelte";
import Logout from "./pages/Logout.svelte";
import Penelitian from "./pages/Penelitian.svelte";
import Register from "./pages/Register.svelte";
import Verify from "./pages/Verify.svelte";
import adminIndex from "./pages/admin/Index.svelte";
import dosenIndex from "./pages/dosen/Index.svelte";

export default [
	{ path: "/abdimas", page: Abdimas },
	{ path: "/about", page: About },
	{ path: "/", page: Index },
	{ path: "/login", page: Login },
	{ path: "/logout", page: Logout },
	{ path: "/penelitian", page: Penelitian },
	{ path: "/register", page: Register },
	{ path: "/verify", page: Verify },
	{ path: "/admin/:page", page: adminIndex },
	{ path: "/dosen/:page", page: dosenIndex },
]
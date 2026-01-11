import { createRouter, createWebHistory } from "vue-router";
import CharacterDetailPage from "./views/CharacterDetailPage.vue";
import WeaponsPage from "./views/WeaponsPage.vue";
import ArtifactsPage from "./views/ArtifactsPage.vue";
import WeaponDetailPage from "./views/WeaponDetailPage.vue";
import ContributePage from "./views/ContributePage.vue";
import CurrentBannerPage from "./views/CurrentBannerPage.vue";
import AdminPage from "./views/AdminPage.vue";
import { supabase } from "./supabaseClient";

let localUser;

const routes = [
  { path: "/", component: () => import("./views/HomePage.vue") },
  { path: "/about", component: () => import("./views/AboutPage.vue") },
  { path: "/teams", component: () => import("./views/TeamsPage.vue") },
  { path: "/login", component: () => import("./views/LoginPage.vue") },
  {
    path: "/unauthorized",
    component: () => import("./views/UnauthorizedPage.vue"),
  },
  {
    path: "/characters",
    component: () => import("./views/CharactersPage.vue"),
  },
  {
    path: "/characters/:id",
    name: "CharacterDetailPage",
    component: CharacterDetailPage,
  },
  { path: "/weapons", component: WeaponsPage },
  {
    path: "/weapons/:id",
    name: "WeaponDetailPage",
    component: WeaponDetailPage,
  },
  { path: "/artifacts", component: ArtifactsPage },
  {
    path: "/contribute",
    name: "ContributePage",
    component: ContributePage,
  },
  {
    path: "/current-banner",
    name: "CurrentBannerPage",
    component: CurrentBannerPage,
  },
  { path: "/admin", component: AdminPage, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from) {
    return { top: 0 };
  },
});

// Get User Function
async function getUser(next) {
  localUser = await supabase.auth.getSession();
  if (localUser.data.session === null) {
    next("/unauthorized");
  } else {
    next();
  }
}

// Auth Logic
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    getUser(next);
  } else {
    next();
  }
});

export default router;

import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./views/HomePage.vue";
import CharactersPage from "./views/CharactersPage.vue";
import TeamsPage from "./views/TeamsPage.vue";
import AboutPage from "./views/AboutPage.vue";
import CharacterDetailPage from "./views/CharacterDetailPage.vue";
import WeaponsPage from "./views/WeaponsPage.vue";
import ArtifactsPage from "./views/ArtifactsPage.vue";
import WeaponDetailPage from "./views/WeaponDetailPage.vue";
import ContributePage from "./views/ContributePage.vue";
import LoginPage from "./views/LoginPage.vue";
import CurrentBannerPage from "./views/CurrentBannerPage.vue";
import AdminPage from "./views/AdminPage.vue";
import UnauthorizedPage from "./views/UnauthorizedPage.vue";
import { supabase } from "./supabaseClient";

let localUser;

const routes = [
  { path: "/", component: HomePage },
  { path: "/about", component: AboutPage },
  { path: "/teams", component: TeamsPage },
  { path: "/login", component: LoginPage },
  { path: "/unauthorized", component: UnauthorizedPage },
  { path: "/characters", component: CharactersPage },
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

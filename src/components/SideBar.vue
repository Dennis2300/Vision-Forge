<template>
  <div class="bg-primary text-text">
    <h1 class="divider mt-5 px-4 text-2xl">Stratagema</h1>
    <nav class="mt-4 flex flex-col space-y-3 px-4">
      <router-link
        v-for="link in navLinks"
        :key="link.name"
        :to="link.path"
        class="px-3 py-2 rounded hover:bg-tertiary transition-colors no-underline text-inherit"
        :class="{ 'bg-tertiary font-semibold': isActive(link.path) }"
      >
        {{ link.name }}
      </router-link>
    </nav>
    <CharacterTOC
      v-if="route.path.startsWith('/characters/') && route.params.id"
    />
  </div>
</template>

<script setup>
import { user } from "../auth";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { supabase } from "../supabaseClient";

import CharacterTOC from "./CharacterTOC.vue";

const isAuth = computed(() => !!user.value);
const route = useRoute();
const loggingOut = ref(false);

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Characters", path: "/characters" },
  { name: "Weapons", path: "/weapons" },
  { name: "Artifacts", path: "/artifacts" },
  { name: "Banners", path: "/current-banner" },
  { name: "About", path: "/about" },
];

async function logout() {
  loggingOut.value = true;
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.log(error);
  } else {
    router.push("/");
    console.log("Logged Out");
    loggingOut.value = false;
  }
}

function isActive(path) {
  return route.path === path;
}
</script>

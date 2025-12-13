<template>
  <div class="flex flex-row w-screen">
    <div class="w-1/4 flex flex-row items-center">
      <img
        class="w-12"
        loading="lazy"
        src="./../assets/images/icons/webIcon.webp"
        alt=""
      />
      <h2 class="font-acme">Vision Forge</h2>
      <div class="h-[50px] flex items-end">
        <p class="text-sm ml-1 text-gray-500">Beta v0.1</p>
      </div>
    </div>
    <div class="w-2/4 flex flex-row gap-4 justify-around items-center">
      <RouterLink
        v-for="nav in navLinks"
        :key="nav.path"
        :to="nav.path"
        class="font-acme tracking-wide"
        :class="[
          'text-2xl no-underline transition duration-200',
          router.path === nav.path
            ? 'text-tertiary -translate-y-0.5'
            : 'text-white hover:text-tertiary hover:-translate-y-0.5',
        ]"
      >
        {{ nav.name }}
      </RouterLink>
    </div>
    <div class="w-1/4 flex justify-end items-center gap-4">
      <div v-if="isAuth" class="flex flex-row items-center gap-4">
        <div class="btn btn-primary px-4 tracking-wide">
          <RouterLink to="/admin" class="text-white no-underline"
            >Admin</RouterLink
          >
        </div>
        <button class="btn btn-primary px-4 mr-4" @click="logout">
          <p v-if="loggingOut">Logging out</p>
          <p v-else>Log out</p>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { user } from "../auth";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { supabase } from "./../supabaseClient";

const isAuth = computed(() => !!user.value);
const router = useRouter();
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
</script>

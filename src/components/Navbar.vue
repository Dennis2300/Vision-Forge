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
          route.path === nav.path
            ? 'text-tertiary -translate-y-0.5'
            : 'text-white hover:text-tertiary hover:-translate-y-0.5',
        ]"
      >
        {{ nav.name }}
      </RouterLink>
    </div>
    <div class="w-1/4 flex justify-end items-center">
      <div>Right</div>
      <div v-if="isAuth">Admin only</div>
    </div>
  </div>
</template>

<script setup>
import { user } from "../auth";
import { computed } from "vue";
import { useRoute } from "vue-router";

const isAuth = computed(() => !!user.value);
const route = useRoute();

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Characters", path: "/characters" },
  { name: "Weapons", path: "/weapons" },
  { name: "Artifacts", path: "/artifacts" },
  { name: "Current Banner", path: "/current-banner" },
  { name: "About", path: "/about" },
];
</script>

<template>
  <div class="w-3/4 bg-secondary p-8 rounded-2xl">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
      <router-link
        v-for="link in navLinks"
        :key="link.name"
        :to="link.path"
        class="group no-underline"
      >
        <div class="overflow-hidden rounded-xl relative">
          <img
            :src="link.image"
            :alt="link.name"
            class="w-full h-[400px] object-cover object-center rounded-xl transform transition-transform duration-300 ease-in-out"
          />
          <div
            class="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
          ></div>
        </div>
        <h2
          class="text-center mt-2 text-text group-hover:text-tertiary transition-colors"
        >
          {{ link.name }}
        </h2>
      </router-link>
    </div>
  </div>
</template>

<script setup>
const navLinks = [
  {
    name: "Characters",
    path: "/characters",
    image: "/src/assets/images/twins.webp",
  },
  {
    name: "Weapons",
    path: "/weapons",
    image: "/src/assets/images/skirk.webp",
  },
  {
    name: "Artifacts",
    path: "/artifacts",
    image: "/src/assets/images/chiori.webp",
  },
  {
    name: "Banners",
    path: "/current-banner",
    image: "/src/assets/images/twins2.png",
  },
];
</script>

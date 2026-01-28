<template>
  <div class="w-3/4 bg-secondary p-8 rounded-2xl">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
      <router-link
        v-for="link in navLinks"
        :key="link.name"
        :to="link.path"
        class="group no-underline block perspective-1000"
      >
        <div
          class="overflow-hidden rounded-xl relative transform transition-all duration-500 ease-out group-hover:scale-[1.02] group-hover:-translate-y-2 shadow-lg group-hover:shadow-2xl"
        >
          <img
            :src="link.image"
            :alt="link.name"
            class="w-full h-[400px] object-cover object-top rounded-xl transform transition-all duration-700 ease-out group-hover:scale-105"
          />

          <!-- Animated overlay with blur -->
          <div
            class="absolute inset-0 bg-gradient-to-br from-tertiary/30 via-transparent to-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"
          ></div>

          <!-- Shine effect -->
          <div
            class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out rounded-xl"
          ></div>
        </div>

        <h2
          class="text-center mt-3 text-text font-bold text-lg group-hover:text-tertiary transition-all duration-300 transform group-hover:scale-110"
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

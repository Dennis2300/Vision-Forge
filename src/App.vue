<template>
  <div class="flex min-h-screen">
    <SideBar class="fixed left-0 top-0 w-64 h-screen" />
    <main class="ml-[12.5%]">
      <router-view class="min-h-screen pl-4" />
      <Footer />
    </main>
  </div>
</template>

<script setup>
import SideBar from "./components/SideBar.vue";
import Footer from "./components/Footer.vue";
</script>

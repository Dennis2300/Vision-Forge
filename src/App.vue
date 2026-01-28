<template>
  <div class="min-h-screen">
    <SideBar class="fixed left-0 top-0 w-64 h-screen" />
    <div class="ml-56 flex flex-col min-h-screen">
      <main class="flex-1">
        <router-view />
      </main>
      <Footer />
    </div>
    <SupportPopUp />
  </div>
</template>

<script setup>
import SideBar from "./components/SideBar.vue";
import Footer from "./components/Footer.vue";
import SupportPopUp from "./components/SupportPopUp.vue";
</script>

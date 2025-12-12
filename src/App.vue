<template>
  <!-- Loading screen -->
  <div v-if="!isLoaded" class="loading-screen">
    <LoadingSpinner />
  </div>

  <!-- Main APP -->
  <div v-else>
    <!-- Navbar Component -->
    <div class="navbar-container flex items-center" :class="{ 'navbar-hidden': isScrollingDown }">
      <Navbar />
    </div>

    <!-- Main Content Section -->
    <div class="content z-0">
      <router-view />
    </div>

    <!-- Support button -->
    <div class="fixed top-16 right-1 m-4 z-10 cursor-pointer">
      <div
        @click="showPopup = !showPopup"
        class="text-white rounded-lg transition"
      >
        <img
          width="85"
          src="https://act-upload.hoyoverse.com/event-ugc-hoyowiki/2025/06/01/237301566/741d1a62ad6e8d6818c53c97eeccdce6_2278495532066979603.gif"
          alt=""
        />
      </div>

      <!-- Popup -->
      <SupportPopup v-if="showPopup" />
    </div>

    <!-- Footer Component -->
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import Navbar from "./components/Navbar.vue";
import SupportPopup from "./components/Home/SupportPopup.vue";
import Footer from "./components/Footer.vue";
import LoadingSpinner from "./components/Loadings/LoadingSpinner.vue";

// Pop up state
const showPopup = ref(false);

// Navbar scroll behavior
const isScrollingDown = ref(false);
let lastScrollY = window.scrollY;

// Loading state for the entire HTML
const isLoaded = ref(false);

const handleScroll = () => {
  const currentScrollY = window.scrollY;

  if (currentScrollY > lastScrollY && currentScrollY > 50) {
    // Scrolling down
    isScrollingDown.value = true;
  } else {
    // Scrolling up
    isScrollingDown.value = false;
  }

  lastScrollY = currentScrollY;
};

onMounted(() => {
  // Scroll listener
  window.addEventListener("scroll", handleScroll);

  // Check if already loaded
  if (document.readyState === "complete") {
    isLoaded.value = true;
  } else {
    const handleLoad = () => {
      isLoaded.value = true;
    };
    window.addEventListener("load", handleLoad);

    // Cleanup on unmount
    onBeforeUnmount(() => {
      window.removeEventListener("load", handleLoad);
      window.removeEventListener("scroll", handleScroll);
    });
  }
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
.navbar-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 66px;
  background-color: #0b192c;
  color: white;
  box-shadow: 0 5px 4px rgba(0, 0, 0, 0.5);
  z-index: 1000;
  transition: transform 0.3s ease-in-out;
}

.navbar-hidden {
  transform: translateY(-100%);
}

.content {
  min-height: 100vh;
}
</style>

<template>
  <!-- Loading screen -->
  <div v-if="!isLoaded" class="loading-screen">
    <LoadingSpinner />
  </div>

  <!-- Main APP -->
  <div v-else>
    <!-- Navbar Component -->
    <div class="navbar-container" :class="{ 'navbar-hidden': isScrollingDown }">
      <Navbar />
    </div>

    <!-- Main Content Section -->
    <div class="content z-0">
      <router-view />
    </div>

    <!-- Support button -->
    <div class="fixed top-20 right-5 m-4 z-10 cursor-pointer">
      <div
        @click="showPopup = !showPopup"
        class="bg-secondary text-white rounded-lg transition"
      >
        <img
          width="85"
          src="https://act-upload.hoyoverse.com/event-ugc-hoyowiki/2025/06/01/237301566/741d1a62ad6e8d6818c53c97eeccdce6_2278495532066979603.gif"
          alt=""
        />
      </div>

      <!-- Popup -->
      <div
        v-if="showPopup"
        class="absolute top-20 right-16 bg-white border shadow-lg p-4 w-64 rounded-b-xl rounded-tl-xl cursor-default"
      >
        <p class="text-sm text-gray-700 mb-2">
          If you like this website, please consider supporting it on Patreon.
          Every bit helps pay for server hosting and domain fees.
        </p>
        <a
          href="https://patreon.com/YOURUSERNAME"
          target="_blank"
          class="text-blue-600 underline text-sm font-medium"
        >
          Go to Patreon
        </a>
      </div>
    </div>

    <!-- Footer Component -->
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
import LoadingSpinner from "./components/LoadingSpinner.vue";

const showPopup = ref(false);

// Navbar scroll behavior
const isScrollingDown = ref(false);
let lastScrollY = window.scrollY;

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

// Loading state for the entire HTML
const isLoaded = ref(false);

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
  height: 60px;
  background-color: #0b192c;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  color: white;
  letter-spacing: 1px;
  font-size: 1.5rem;
  box-shadow: 0 5px 4px rgba(0, 0, 0, 0.5);
  padding-top: 5px;
  z-index: 1000;
  transition: transform 0.3s ease-in-out;
}

.navbar-hidden {
  transform: translateY(-100%);
}

.content {
  margin-top: 60px;
  min-height: 100vh;
}
</style>

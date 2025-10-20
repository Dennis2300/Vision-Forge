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
    <div class="content">
      <router-view />

      <!-- Support button -->
      <div class="fixed top-1/4 right-5 m-4">
        <button
          @click="showPopup = !showPopup"
          class="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Support Me
        </button>

        <!-- Popup -->
        <div
          v-if="showPopup"
          class="absolute bottom-12 right-0 bg-white border rounded-lg shadow-lg p-4 w-64"
        >
          <p class="text-sm text-gray-700 mb-2">
            If you enjoy my work and want to support me, check out my Patreon!
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

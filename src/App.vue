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

<template>
  <!-- Character Page Container -->
  <div class="character-page-container">
    <div class="character-page-header-container mt-5">
      <div class="character-page-header-banner">
        <h1 class="character-page-header">Character Page</h1>
        <img
          class="character-page-header-image"
          src="https://act-upload.hoyoverse.com/event-ugc-hoyowiki/2025/07/09/237301566/2627ae5e68e2632df6eeb87b58b6a4f6_8879732995034865752.png?x-oss-process=image%2Fformat%2Cwebp"
          alt=""
        />
      </div>
      <div class="divider px-10"></div>
      <p class="character-page-header-description">
        Here you can find a comprehensive list of all characters available in
        Genshin Impact, by clicking on their names to see their details,
        attributes and builds. Use the filter options to easily find characters
        based on your preferences.
      </p>
    </div>
    <div class="character-page">
      <div class="offset">Offset</div>
      <div class="character-display-container">Content</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"; // Import the Vue composition API
import { supabase } from "./../supabaseClient.js"; // Import the Supabase client
// ----------------------------------------------------------
import "./../css/Ribbon.css"; // Import the CSS for the ribbon effect
import "ldrs/trefoil"; // Import the loading spinner component
// ----------------------------------------------------------
import LoadingSpinner from "./../components/LoadingSpinner.vue"; // Import the loading spinner component
import Errorcomponent from "./../components/ErrorComponent.vue"; // Import the error component

// Loading and error states
const loading = ref(true);
const error = ref(null);

// Data states
const characters = ref([]);

// Fetch characters on page load
onMounted(async () => {});
</script>

<style scoped>
.character-page-container {
  width: 1400px;
  min-height: 100vh;
  margin: 0px auto;
}

.character-page-header-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.character-page-header-banner {
  background-color: var(--secondary);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
}

.character-page-header-image {
  width: 700px;
  height: 150px;
  object-fit: cover;
  overflow: hidden;
  border-radius: 15px;
  opacity: 0.4;
}

.character-page-header {
  position: absolute;
  color: white;
  font-size: 3rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  z-index: 1;
  letter-spacing: 1px;
  font-family: var(--font-bungee);
}

.character-page-header-description {
  font-size: 1.2rem;
  font-family: var(--font-roboto);
  letter-spacing: 1px;
  line-height: 1.5;
  width: 80%;
  text-align: center;
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
}
</style>

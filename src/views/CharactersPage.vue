<template>
  <!-- Character Page Container -->
  <div class="character-page-container">
    <div class="character-page-header-container">
      <div class="character-page-header-banner">
        <h1 class="character-page-header">Character Page</h1>
        <img
          class="character-page-header-image"
          src="https://act-upload.hoyoverse.com/event-ugc-hoyowiki/2025/07/09/237301566/2627ae5e68e2632df6eeb87b58b6a4f6_8879732995034865752.png?x-oss-process=image%2Fformat%2Cwebp"
          alt=""
        />
      </div>
      <div class="divider"></div>
      <p class="character-page-header-description">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio est
        nihil soluta consequatur voluptatem obcaecati voluptas illo explicabo
        iste saepe id, laboriosam laborum adipisci? Minima et molestias sapiente
        ipsa repellat.
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
  background-color: darkgreen;
  width: 1200px;
  min-height: 100vh;
  margin: 0px auto;
}

.character-page-header-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: darkolivegreen;
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
  font-family: var(--font-bungee);
}

.character-page-header-description {
  margin-top: 10px;
  font-size: 1.2rem;
  text-align: center;
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
}
</style>

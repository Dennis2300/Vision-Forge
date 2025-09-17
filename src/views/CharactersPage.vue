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
      <div class="character-display-container">
        <div
          class="character-item"
          v-for="character in characters"
          :key="character.id"
        >
          <div class="character-item-overview">{{ character.name }}</div>
          <div class="character-item-details">DETAILS</div>
        </div>
      </div>
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

// Function to fetch characters from Supabase
async function fetchAllCharacters() {
  loading.value = true;
  error.value = null;
  try {
    let { data, error: fetchError } = await supabase
      .from("characters")
      .select(
        "*, vision:vision(id, name, image_url), team_role:team_role(name), substat:substat(name), weapon_type:weapon_type(id, name), region:region(id, name)"
      )
      .order("release_date", { ascending: false });
    if (fetchError) throw fetchError;
    characters.value = data;
  } catch (err) {
    error.value = err.message || "An error occurred while fetching data.";
  } finally {
    loading.value = false;
  }
}

// Fetch characters on page load
onMounted(async () => {
  await fetchAllCharacters();
});
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

.character-page {
  background-color: darkblue;
  min-height: 100vh;
  display: flex;
}

.offset {
  flex: 1;
  background-color: darkgoldenrod;
}
.character-display-container {
  flex: 4;
  background-color: darkcyan;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.character-item {
  margin: 0px auto;
  background-color: gray;
  height: 250px;
  width: 1000px;
  display: flex;
  flex-direction: column;
  border-radius: 15px;
}

.character-item-overview {
  flex: 2;
  padding: 15px;
}
.character-item-details {
  flex: 1;
  padding: 15px;
  background-color: darkslategray;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
}
</style>

<template>
  <div class="characters-page-container mb-10">
    <div class="characters-page">
      <!-- Header -->
      <div class="page-header">Character List</div>
      <!-- Content Container -->
      <div class="characters-display-container">
        <!-- Sidebar -->
        <div class="offset">This is offset</div>
        <!-- Main Content -->
        <div class="character-display">
          <!-- Loading Spinner -->
          <LoadingSpinner v-if="loading" />
          <!-- Content -->
          <div
            v-if="!loading && !error"
            class="character-item"
            v-for="character in characters"
            :key="character.id"
            :class="{
              'rarity-5': character.rarity === 5,
              'rarity-4': character.rarity === 4,
            }"
          >
            <img class="character-avatar" :src="character.image_url" alt="" />
            <h1 class="character-name">{{ character.name }}</h1>
          </div>
          <!-- Error Message -->
          <div v-if="error">Failed to fetch characters</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.characters-page-container {
  min-height: 100vh;
  width: 100vw;
}

.characters-page {
  /* background-color: darkcyan; */
  margin: 0px auto;
}

.page-header {
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  color: white;
  padding: 20px 0;
  /* background-color: darkslateblue; */
  border-bottom: 1px solid #eaecef;
  width: 1400px;
  margin: 0px auto;
  margin-bottom: 25px;
}

.characters-display-container {
  display: flex;
  min-height: 100vh;
  max-width: 1400px;
  /* background-color: darkblue; */
  margin: 0px auto;
}

.offset {
  flex: 1;
  background-color: #44444e;
  padding: 30px;
  overflow-y: auto;
  max-height: 1000px;
  border-radius: 15px;
}

.character-display {
  flex: 4;
  padding-left: 30px;
}

.character-item {
  background-color: #4a4a55;
  margin-bottom: 25px;
  height: 125px;
  display: flex;
  align-items: center;
  padding: 15px;
  border-radius: 15px;
}

.character-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin: 15px;
}

.rarity-5 .character-avatar {
  background: linear-gradient(145deg, #e7944a, #b56a2b);
  box-shadow: 0px 0px 15px rgba(231, 148, 74, 0.8),
    0px 0px 30px rgba(231, 148, 74, 0.5);
}

.rarity-4 .character-avatar {
  background: linear-gradient(145deg, #9b72d5, #7149a3);
  box-shadow: 0px 0px 15px rgba(155, 114, 213, 0.8),
    0px 0px 30px rgba(155, 114, 213, 0.5);
}

.character-name {
  font-family: var(--font-bungee);
  margin-top: 10px;
}

@media (max-width: 768px) {
  .characters-display-container {
    flex-direction: column;
  }

  .offset {
    max-height: none;
    margin-bottom: 20px;
  }

  .character-display {
    padding-left: 0;
  }
}
</style>

<script setup>
import { ref, onMounted } from "vue"; // Import the Vue composition API
import { supabase } from "./../supabaseClient.js"; // Import the Supabase client
// ----------------------------------------------------------
import "./../css/Ribbon.css"; // Import the CSS for the ribbon effect
import "ldrs/trefoil"; // Import the loading spinner component
import CharacterFilter from "./../components/CharacterFilter.vue";
// ----------------------------------------------------------
import LoadingSpinner from "./../components/LoadingSpinner.vue"; // Import the loading spinner component
import Errorcomponent from "./../components/ErrorComponent.vue"; // Import the error component

// Loading and error states
const loading = ref(true);
const error = ref(null);

// Data states
const characters = ref([]);

// If the data is older than CACHE_DURATION, it will be removed
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

// cache functions will be made as modules later
// function to retrieve data from sessionStorage
function getCachedData(key) {
  const cachedData = sessionStorage.getItem(key);

  if (!cachedData) {
    return null;
  }

  const { timestamp, data } = JSON.parse(cachedData);
  const now = new Date().getTime();

  if (now - timestamp < CACHE_DURATION) {
    return data;
  } else {
    sessionStorage.removeItem(key);
    return null;
  }
}

// setCachedData function to store data in sessionStorage
function setCachedData(key, data) {
  const cache = {
    timestamp: new Date().getTime(),
    data,
  };
  sessionStorage.setItem(key, JSON.stringify(cache));
}

// Fetch all characters from the database
async function GetAllCharacters() {
  const cacheKey = "characters";

  const cachedCharacters = getCachedData(cacheKey);
  if (cachedCharacters) {
    characters.value = cachedCharacters;
    sortCharactersByReleaseDate();
    loading.value = false;
    return;
  }

  try {
    let { data, error: fetchError } = await supabase
      .from("characters")
      .select(
        "*, vision:vision(id, name, image_url), team_role:team_role(name), substat:substat(name), weapon_type:weapon_type(name)"
      )
      .order("id", { ascending: true });

    if (fetchError) throw fetchError;

    characters.value = data;
    setCachedData(cacheKey, data);
    sortCharactersByReleaseDate();
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
}

// Sort characters by release date
function sortCharactersByReleaseDate() {
  characters.value = [...characters.value].sort((a, b) => {
    // Upcoming characters first
    if (a.is_upcoming !== b.is_upcoming) {
      return b.is_upcoming - a.is_upcoming;
    }

    // Then sort by release date (newest first)
    return new Date(b.release_date) - new Date(a.release_date);
  });
}

// Check if a character is new
function isNewCharacter(character) {
  if (character && typeof character.new_character !== "undefined") {
    return Boolean(character.new_character);
  }
  return false;
}

function isUpcomingCharacter(character) {
  if (character && typeof character.is_upcoming !== "undefined") {
    return Boolean(character.is_upcoming);
  }
  return false;
}

// If there is a filter applied, display the filtered characters
function displayFilteredCharacters(filtered) {
  characters.value = filtered;
  sortCharactersByReleaseDate();
}

// Clear the filter and reset characters to the original list
function handleClearFilter() {
  characters.value = [...characters.value];
  sortCharactersByReleaseDate();
}

// Fetch characters on page load
onMounted(async () => {
  await GetAllCharacters();
  isNewCharacter();
});
</script>

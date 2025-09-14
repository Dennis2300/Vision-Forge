<template>
  <!-- Character Page Container -->
  <div class="characters-page-container mb-10">
    <!-- Character Page -->
    <div class="characters-page">
      <!-- Header -->
      <div class="page-header">
        <img
          class="header-background"
          src="https://act-upload.hoyoverse.com/event-ugc-hoyowiki/2025/07/09/237301566/2627ae5e68e2632df6eeb87b58b6a4f6_8879732995034865752.png?x-oss-process=image%2Fformat%2Cwebp"
          alt=""
        />
        <h2>Character Archive</h2>
      </div>
      <!-- Page Summary -->
      <div class="page-summary">
        <p>
          Here you can find a comprehensive list of all characters available in
          Genshin Impact, by clicking on their names to see their details,
          attributes and builds. Use the filter options to easily find
          characters based on your preferences.
        </p>
      </div>
      <!-- Search Bar -->
      <div class="search-bar-container mb-5">
        <div v-if="!loading && !error">
          <input
            class="search-bar"
            type="text"
            placeholder="Search characters..."
          />
        </div>
      </div>
      <!-- Content Container -->
      <div class="characters-display-container">
        <!-- Sidebar -->
        <div class="offset">
          <!-- Loading Spinner -->
          <LoadingSpinner v-if="loading" />
          <!-- Filter -->
          <CharacterFilter
            v-if="!loading && !error"
            @filteredCharacters="displayFilteredCharacters"
            @clearFilter="handleClearFilter"
          />
        </div>
        <!-- Main Content -->
        <div class="character-display">
          <!-- Loading Spinner -->
          <LoadingSpinner v-if="loading" />
          <!-- Content -->
          <router-link
            :to="`/characters/${character.id}?name=${encodeURIComponent(
              character.name
            )}`"
            class="character-item"
            v-else
            v-for="character in characters"
            :key="character.id"
            :class="{
              'rarity-5': character.rarity === 5,
              'rarity-4': character.rarity === 4,
            }"
          >
            <!-- Character Info-->
            <div class="character-info">
              <img
                class="character-splash-art"
                :src="character.splash_art"
                alt=""
              />
              <!-- New Character Ribbon -->
              <div
                v-if="isNewCharacter(character)"
                class="ribbon ribbon-top-right"
              >
                <span class="new">New</span>
              </div>
              <!-- Upcoming Character Ribbon -->
              <div
                v-if="isUpcomingCharacter(character)"
                class="ribbon ribbon-top-right"
              >
                <span class="upcoming">Upcoming</span>
              </div>
              <!-- Character Avatar and Name -->
              <img
                class="character-avatar mx-5"
                :src="character.image_url"
                alt=""
              />
              <h1 class="character-name">{{ character.name }}</h1>
            </div>
            <!-- Character Details -->
            <div class="character-details">
              <!-- Vision Icon -->
              <img
                class="vision-icon"
                :src="character.vision.image_url"
                alt=""
              />
              <!-- Character Tags -->
              <p class="tag">{{ character.vision.name }}</p>
              <p class="tag">{{ character.weapon_type.name }}</p>
              <p class="tag">{{ character.substat?.name || "N/A" }}</p>
              <p class="tag">{{ character.team_role?.name || "N/A" }}</p>
              <!-- Release Date -->
              <p class="tag release-date">
                <strong style="color: darkgray"> Release Date: </strong>
                {{
                  !character.release_date
                    ? "N/A"
                    : new Date(character.release_date).toLocaleDateString(
                        "en-GB",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }
                      )
                }}
              </p>
            </div>
          </router-link>
          <!-- Error Message -->
          <div v-if="error">Failed to fetch characters</div>
        </div>
      </div>
    </div>
    <!-- To The Top Button -->
    <button class="to-top-button" @click="scrollToTop">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-arrow-bar-up"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M8 10a.5.5 0 0 0 .5-.5V3.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 3.707V9.5a.5.5 0 0 0 .5.5m-7 2.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5"
        />
      </svg>
    </button>
  </div>
</template>

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

// --------------------- CACHE HANDLING --------------------------------------//
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

// --------------------- DATA FETCHING ---------------------------------------//
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
        "*, vision:vision(id, name, image_url), team_role:team_role(name), substat:substat(name), weapon_type:weapon_type(id, name)"
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

// --------------------- HELPER FUNCTIONS -------------------------------------//

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

// Check if a character is upcoming
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

// Scroll to the top of the page
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Fetch characters on page load
onMounted(async () => {
  await GetAllCharacters();
  isNewCharacter();
});
</script>

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
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
  color: white;
  padding: 20px 0;
  /* background-color: darkslateblue; */
  border-bottom: 1px solid #eaecef;
  width: 1100px;
  height: 100px;
  margin: 0px auto;
}

.page-header h2 {
  font-family: var(--font-acme);
  letter-spacing: 2px;
  text-transform: uppercase;
  text-shadow: 3px 3px 8px rgba(0, 0, 0, 0.8);
}

.header-background {
  position: absolute;
  width: 90%;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  opacity: 0.4;
  z-index: -1;
}

.page-summary {
  max-width: 1100px;
  margin: 15px auto;
}

.page-summary p {
  font-family: var(--font-roboto);
  letter-spacing: 1px;
  color: #eaecef;
  line-height: 1.6;
  font-size: 1.1em;
  text-align: center;
}

.search-bar-container {
  display: flex;
  justify-content: center;
}

.search-bar {
  width: 300px;
  padding: 10px 15px;
  border: 1.5px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  letter-spacing: 1px;
  font-family: var(--font-roboto);
  transition: border-color 0.3s ease;
}

.characters-display-container {
  display: flex;
  min-height: 100vh;
  max-width: 1300px;
  /* background-color: darkblue; */
  margin: 0px auto;
}

.offset {
  flex: 1;
  background-color: #44444e;
  padding: 30px;
  overflow-y: auto;
  max-height: 1200px;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.character-display {
  flex: 4;
  padding-left: 30px;
}

.character-item {
  margin-bottom: 25px;
  height: 250px;
  padding: 0;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.character-info {
  position: relative;
  flex: 4;
  display: flex;
  flex-direction: row;
  padding: 20px;
  background-color: #5a5a65;
  align-items: center;
  z-index: 999;
}

.character-details {
  flex: 1;
  padding: 20px;
  background-color: #3a3a45;
  display: flex;
  align-items: center;
  align-items: center;
  border-top: 2px solid black;
  z-index: 999;
}

.character-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}

.character-name {
  font-family: var(--font-bungee);
  letter-spacing: 1.5px;
  margin-top: 10px;
  text-shadow: 3px 3px 8px rgba(0, 0, 0, 0.8);
}

.vision-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.character-item-details {
  height: 100px;
  background-color: #44444e;
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

.tag {
  background-color: #6c6c78;
  color: white;
  padding: 10px;
  border-radius: 5px;
  font-size: 1rem;
  letter-spacing: 1px;
  font-family: var(--font-roboto);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  margin-left: 10px;
  border: 1.5px solid black;
}

.upcoming {
  font-size: 0.5em;
}

.new {
  font-size: 0.8em;
}

.character-splash-art {
  position: absolute;
  object-fit: cover;
  width: 35%;
  right: 0;
  opacity: 0.3;
  z-index: -1;
}

.release-date {
  margin-left: auto;
}

.to-top-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #44444e;
  color: white;
  border: none;
  border-radius: 10px;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.to-top-button:hover {
  background-color: #666673;
}
</style>

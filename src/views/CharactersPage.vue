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
      <div class="page-abstract">
        <p>
          Here you can find a comprehensive list of all characters available in
          Genshin Impact, complete with their details, attributes and builds.
          Use the filter options to easily find characters based on your
          preferences.
        </p>
      </div>
      <!-- Content Container -->
      <div class="characters-display-container">
        <!-- Sidebar -->
        <div class="offset">
          <CharacterFilter
            @filteredCharacters="displayFilteredCharacters"
            @clearFilter="handleClearFilter"
          />
        </div>
        <!-- Main Content -->
        <div class="character-display">
          <!-- Loading Spinner -->
          <LoadingSpinner v-if="loading" />
          <!-- Content -->
          <div
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
          </div>
          <!-- Error Message -->
          <div v-if="error">Failed to fetch characters</div>
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
  margin-bottom: 25px;
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

.page-abstract {
  max-width: 1100px;
  margin: 0px auto;
  margin-bottom: 25px;
}

.page-abstract p {
  font-family: var(--font-roboto);
  letter-spacing: 1px;
  color: #eaecef;
  line-height: 1.6;
  font-size: 1.1em;
  text-align: center;
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
  max-height: 1000px;
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
</style>

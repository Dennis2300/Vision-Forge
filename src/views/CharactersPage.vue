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
    <div class="character-page mb-16" v-if="!error">
      <div class="offset">Offset</div>
      <div class="character-display-container">
        <router-link
          :to="`/characters/${character.id}`"
          class="character-item"
          v-for="character in characters"
          :key="character.id"
          :class="{
            'rarity-5': character.rarity === 5,
            'rarity-4': character.rarity === 4,
          }"
        >
          <div class="character-item-overview">
            <div
              v-if="isNewCharacter(character)"
              class="ribbon ribbon-top-right"
            >
              <span class="new">New</span>
            </div>
            <div
              v-if="isUpcomingCharacter(character)"
              class="ribbon ribbon-top-right"
            >
              <span class="upcoming">Upcoming</span>
            </div>
            <img
              v-if="character.splash_art"
              class="character-item-splash-art"
              :src="character.splash_art"
              alt=""
            />
            <div v-if="!character.splash_art"></div>
            <div class="character-item-info">
              <img
                class="character-item-image"
                :src="character.image_url"
                :alt="character.name"
              />
              <h1 class="character-name mt-3">{{ character.name }}</h1>
            </div>
          </div>
          <div class="character-item-details">
            <img
              class="character-vision-image"
              :src="character.vision.image_url"
              alt=""
            />
            <p class="character-detail-tag">{{ character.vision.name }}</p>
            <p class="character-detail-tag">{{ character.weapon_type.name }}</p>
            <p class="character-detail-tag">{{ character.substat.name }}</p>
            <p class="character-detail-tag">{{ character.team_role.name }}</p>
            <p class="character-detail-release-date">
              <strong> Released: </strong>
              {{
                character.release_date
                  ? new Date(character.release_date).toLocaleDateString(
                      "en-GB",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      }
                    )
                  : "N/A"
              }}
            </p>
          </div>
        </router-link>

        <div ref="loadMoreTrigger" class="load-more-trigger" v-if="hasMore">
          <p>Loading More...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// import necessary modules and components
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import { supabase } from "./../supabaseClient.js";
import "./../css/Ribbon.css";
import "./../css/CharacterPage.css";

// state variables
const loading = ref(false);
const error = ref(null);

// data states
const characters = ref([]); // array to hold character data
const page = ref(1); // current page number
const pageSize = 10; // number of characters per page
const hasMore = ref(true); // flag to indicate if more characters are available
const loadMoreTrigger = ref(null); // reference to the load more trigger element

// Intersection Observer instance
let observer = null;

// function to fetch characters from Supabase
async function fetchCharacters() {
  // prevent multiple fetches or fetching when no more data
  if (!hasMore.value || loading.value) return;

  // set loading state
  loading.value = true;

  // calculate range for pagination
  const from = (page.value - 1) * pageSize;
  const to = from + pageSize - 1;

  // fetch data from Supabase
  try {
    // Fetch characters with related data
    const { data, error: fetchError } = await supabase
      .from("characters") // specify the table name
      .select(
        // select specific columns and related data
        "*, vision:vision(id, name, image_url), team_role:team_role(name), substat:substat(name), weapon_type:weapon_type(id, name), region:region(id, name), new_character, is_upcoming"
      )
      .order("release_date", { ascending: false }) // order by release date descending
      .range(from, to); // apply range for pagination

    // handle fetch error
    if (fetchError) throw fetchError;

    // if less data than pageSize is returned, no more data is available
    if (data.length < pageSize) hasMore.value = false;

    // append new data to characters array and increment page number
    characters.value.push(...data);
    page.value++;

    sessionStorage.setItem(
      "characters",
      JSON.stringify({
        characters: characters.value,
        page: page.value,
        hasMore: hasMore.value,
      })
    );
  } catch (err) {
    // handle any errors
    error.value = err.message || "Failed to load characters";
  } finally {
    // reset loading state
    loading.value = false;
  }
}

// Helper Functions
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

onMounted(async () => {
  const cached = sessionStorage.getItem("characters");

  if (cached) {
    const {
      characters: cachedChars,
      page: cachedPage,
      hasMore: cachedHasMore,
    } = JSON.parse(cached);

    characters.value = cachedChars;
    page.value = cachedPage;
    hasMore.value = cachedHasMore;
  } else {
    await fetchCharacters(); // First time load from Supabase
  }

  // Setup observer
  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        console.log("▶ Sentinel visible → fetching next page...");
        fetchCharacters();
      }
    },
    {
      root: null,
      rootMargin: "200px",
      threshold: 0.1,
    }
  );

  await nextTick();
  if (loadMoreTrigger.value) {
    observer.observe(loadMoreTrigger.value);
  }
});

// clean up observer on component unmount
onUnmounted(() => {
  if (observer && loadMoreTrigger.value) {
    observer.unobserve(loadMoreTrigger.value);
    observer.disconnect();
  }
});
</script>



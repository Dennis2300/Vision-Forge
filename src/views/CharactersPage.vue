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
    <div class="character-page" v-if="!error">
      <div class="offset">Offset</div>
      <div class="character-display-container">
        <div
          class="character-item"
          v-for="character in characters"
          :key="character.id"
          :class="{
            'rarity-5': character.rarity === 5,
            'rarity-4': character.rarity === 4,
          }"
        >
          <div class="character-item-overview">
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
                  ? new Date(character.release_date).toLocaleDateString("en-GB", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                  : "N/A"
                }}
            </p>
          </div>
        </div>

        <div ref="loadMoreTrigger" class="load-more-trigger" v-if="hasMore">
          Loading more...
        </div>
      </div>
    </div>
    <LoadingSpinner v-if="loading" />
  </div>
</template>

<script setup>
// import necessary modules and components
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import { supabase } from "./../supabaseClient.js";
import LoadingSpinner from "./../components/LoadingSpinner.vue";

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
        "*, vision:vision(id, name, image_url), team_role:team_role(name), substat:substat(name), weapon_type:weapon_type(id, name), region:region(id, name)"
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

<style scoped>
.character-page-container {
  width: 1500px;
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
  min-height: 100vh;
  display: flex;
}

.offset {
  flex: 1;
  background-color: var(--secondary);
  border-radius: 15px;
  height: fit-content;
}
.character-display-container {
  flex: 4;
  display: flex;
  flex-direction: column;
  gap: 50px;
}

.character-item {
  margin: 0px auto;
  height: 250px;
  width: 1100px;
  display: flex;
  flex-direction: column;
}

.character-item-overview {
  flex: 2;
  padding: 15px;
  background-color: #44444e;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  display: flex;
  align-items: center;
  padding-left: 25px;
  overflow: hidden;
  position: relative;
}

.character-item-info {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 20px;
}

.character-item-image {
  height: 100px;
  width: 100px;
  border-radius: 100%;
  object-fit: contain;
}

.character-name {
  font-size: 2rem;
  letter-spacing: 1px;
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
  font-family: var(--font-bungee);
}

.character-item-splash-art {
  position: absolute;
  height: 300px;
  border-radius: 15px;
  object-fit: cover;
  right: 15px;
  opacity: 0.3;
}

.character-item-details {
  flex: 1;
  padding: 15px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  background-color: #37353e;
  display: flex;
  align-items: center;
  gap: 15px;
  position: relative;
  border-top: 2px solid black;
}

.character-vision-image {
  height: 60px;
  width: 60px;
  object-fit: contain;
}

.character-detail-tag {
  background-color: var(--primary);
  color: white;
  padding: 10px 15px;
  border-radius: 10px;
  font-size: 1rem;
  font-family: var(--font-acme);
  text-transform: uppercase;
  letter-spacing: 1px;
  border: 1px solid black;
}

.character-detail-release-date {
  position: absolute;
  right: 20px;
  background-color: var(--primary);
  padding: 10px 15px;
  border-radius: 10px;
  font-size: 1rem;
  font-family: var(--font-acme);
  text-transform: uppercase;
  letter-spacing: 1px;
  border: 1px solid black;
}

.load-more-trigger {
  height: 100px;
  background: red; /* for testing */
}

.rarity-5 .character-item-image {
  background: linear-gradient(145deg, #e7944a, #b56a2b);
  box-shadow: 0px 0px 15px rgba(231, 148, 74, 0.8),
    0px 0px 30px rgba(231, 148, 74, 0.5);
}

.rarity-4 .character-item-image {
  background: linear-gradient(145deg, #9b72d5, #7149a3);
  box-shadow: 0px 0px 15px rgba(155, 114, 213, 0.8),
    0px 0px 30px rgba(155, 114, 213, 0.5);
}
</style>

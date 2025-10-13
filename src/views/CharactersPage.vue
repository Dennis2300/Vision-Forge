<template>
  <div class="character-page-container mt-10">
    <!-- Character Header -->
    <div class="character-page-header">
      <h1 class="text-center">Character Archive</h1>
    </div>

    <!-- Character Display -->
    <div class="character-page mt-10 flex gap-16">
      <!--Offset-->
      <div class="character-page-offset">
        <h1>Offset</h1>
      </div>

      <!--Main-->
      <div class="character-main-content flex flex-col gap-10">
        <!--Character Card-->
        <div
          class="character-card flex flex-col mx-3"
          v-for="character in characters"
          :key="character.id"
        >
          <!--Card Top-->
          <div class="card-top px-5 rounded-t-xl flex flex-row">
            <div class="flex flex-row items-center gap-5">
              <img
                class="character-avatar"
                :class="{
                  'rarity-5': character.rarity === 5,
                  'rarity-4': character.rarity === 4,
                }"
                :src="character.avatar_url"
                :alt="character.name"
                loading="lazy"
              />
              <h1 class="character-page-name tracking-wide">
                {{ character.name }}
              </h1>
            </div>
            <img
              class="character-splash-art"
              :src="character.splash_art_url"
              :alt="character.name"
              loading="lazy"
            />
          </div>

          <!--Card Bottom-->
          <div
            class="card-bottom px-5 rounded-b-xl flex flex-row justify-between"
          >
            <div class="flex flex-row items-center gap-5">
              <img
                class="vision-image p-1"
                :src="character.vision.image_url"
                alt=""
              />
              <div class="tags flex flex-row gap-5">
                <p>{{ character.weaponTypes.name }}</p>
                <p>{{ character.role.name }}</p>
                <p>{{ character.main_stat.name }}</p>
              </div>
            </div>
            <div class="flex items-center">
              <div class="release-wrapper flex flex-row gap-1">
                <p class="release-text">Released:</p>
                <p>
                  {{
                    new Date(character.release_date).toLocaleDateString(
                      "gb-GB",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      }
                    )
                  }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Infinite Scroll Trigger -->
        <div ref="loadMoreRef" class="text-center py-10">
          <span v-if="loading">
            <LoadingMoreSpinner />
          </span>
          <span class="flex justify-center" v-else-if="!hasMore">
            <h1 class="no-more-character px-10 py-2 rounded-2xl tracking-wide">No More Characters</h1>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { supabase } from "./../supabaseClient.js";
import LoadingMoreSpinner from "./../components/LoadingMoreSpinner.vue";
import "./../css/CharacterPage.css";

const characters = ref([]);
const regions = ref([]);
const error = ref(null);
const loading = ref(false);
const hasMore = ref(true);
const page = ref(0);
const pageSize = 10;
const loadMoreRef = ref(null);

let observer = null;

// --- Cache keys ---
const CHARACTER_CACHE_KEY = "characterCache";
const REGION_CACHE_KEY = "regionCache";

function cache(key, data = null, ttl = 24 * 60 * 60 * 1000) {
  const now = Date.now();

  // --- Setter ---
  if (data) {
    const item = {
      data,
      expiry: now + ttl,
    };
    sessionStorage.setItem(key, JSON.stringify(item));
    return data;
  }

  // --- Getter ---
  const cachedItem = sessionStorage.getItem(key);
  if (!cachedItem) return null;

  try {
    const parsedItem = JSON.parse(cachedItem);
    if (now > parsedItem.expiry) {
      sessionStorage.removeItem(key);
      return null;
    }
    return parsedItem.data;
  } catch (e) {
    console.warn("Failed to parse cache item:", e);
    sessionStorage.removeItem(key);
    return null;
  }
}

// --- Fetch Characters ---
async function fetchCharacters() {
  if (loading.value || !hasMore.value) return;
  loading.value = true;

  try {
    const from = page.value * pageSize;
    const to = from + pageSize - 1;

    const { data, error: supabaseError } = await supabase
      .from("characters")
      .select(
        `
        *,
        regions:character_region(region_id(id, name)),
        vision(id, name, image_url),
        weaponTypes(id, name),
        role(name),
        main_stat(id, name)
      `
      )
      .order("release_date", { ascending: false })
      .range(from, to);

    if (supabaseError) throw supabaseError;

    if (data.length < pageSize) hasMore.value = false;

    characters.value.push(...data);
    page.value++;

    cache(CHARACTER_CACHE_KEY, {
      characters: characters.value,
      page: page.value,
      hasMore: hasMore.value,
    });
  } catch (err) {
    error.value = err.message || "Failed to load characters";
    console.error(error.value);
  } finally {
    loading.value = false;
  }
}

// --- Fetch Regions ---
async function fetchRegions() {
  try {
    const { data, error: supabaseError } = await supabase
      .from("regions")
      .select("*");

    if (supabaseError) throw supabaseError;
    regions.value = data;

    cache(REGION_CACHE_KEY, data);
  } catch (err) {
    error.value = err.message || "Failed to load regions";
    console.error(error.value);
  }
}

// --- Intersection Observer ---
function setupObserver() {
  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) fetchCharacters();
    },
    { rootMargin: "300px", threshold: 0.1 }
  );

  if (loadMoreRef.value) observer.observe(loadMoreRef.value);
}

// --- Lifecycle ---
onMounted(() => {
  const cachedCharacters = cache(CHARACTER_CACHE_KEY);
  const cachedRegions = cache(REGION_CACHE_KEY);

  if (cachedCharacters) {
    characters.value = cachedCharacters.characters;
    page.value = cachedCharacters.page;
    hasMore.value = cachedCharacters.hasMore;
  } else {
    fetchCharacters();
  }

  if (cachedRegions) {
    regions.value = cachedRegions;
  } else {
    fetchRegions();
  }

  setupObserver();
});

onBeforeUnmount(() => {
  if (observer && loadMoreRef.value) {
    observer.unobserve(loadMoreRef.value);
    observer.disconnect();
  }
});
</script>

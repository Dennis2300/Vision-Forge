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
          <span v-if="loading">Loading...</span>
          <span v-else-if="!hasMore">No more characters</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { supabase } from "./../supabaseClient.js";
import "./../css/CharacterPage.css";

const characters = ref([]);
const error = ref(null);
const loading = ref(false);
const hasMore = ref(true);
const page = ref(0);
const pageSize = 10;
const loadMoreRef = ref(null);

let observer = null;

const CACHE_KEY = "characterArchiveCache";

async function fetchCharacters() {
  // check if it need to load more characters
  if (loading.value || !hasMore.value) return;
  loading.value = true;

  try {
    // calculate the range of characters to fetch
    const from = page.value * pageSize;
    const to = from + pageSize - 1;

    // supabase query
    let query = supabase
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

    // GET method to fetch from db
    const { data, error: supabaseError } = await query;
    // if error throw the error
    if (supabaseError) throw supabaseError;

    // disables hasMore if data is less than page size
    if (data.length < pageSize) {
      hasMore.value = false;
    }

    // push the data to the already fetched array
    characters.value.push(...data);
    // and increase page size
    page.value++;
    setCache();
  } catch (err) {
    error.value = err.message || "Failed to load characters";
    console.error(error.value);
  } finally {
    loading.value = false;
  }
}

function setCache() {
  const cacheData = {
    characters: characters.value,
    page: page.value,
    hasMore: hasMore.value,
  };
  sessionStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
}

function getCache() {
  const cache = sessionStorage.getItem(CACHE_KEY);
  if (!cache) return false;

  try {
    const parsed = JSON.parse(cache);
    if (!parsed.characters || !Array.isArray(parsed.characters)) return false;

    characters.value = parsed.characters;
    page.value = parsed.page;
    hasMore.value = parsed.hasMore;
    return true;
  } catch (e) {
    console.log("Failed to parse cache:", e);
    return false;
  }
}

function setupObserver() {
  observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) fetchCharacters();
    },
    {
      rootMargin: "300px", // load a bit before bottom is reached
      threshold: 0.1,
    }
  );

  if (loadMoreRef.value) observer.observe(loadMoreRef.value);
}

onMounted(() => {
  const cached = getCache();
  if (!cached) {
    fetchCharacters();
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

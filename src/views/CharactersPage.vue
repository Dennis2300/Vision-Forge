<template>
  <!-- Character Page Container -->
  <div class="character-page-container">
    <!-- Character Page Header -->
    <div class="character-page-header-container mt-5">
      <div class="character-page-header-banner">
        <h1 class="character-page-header">Character Page</h1>
        <img
          class="character-page-header-image"
          src="https://act-upload.hoyoverse.com/event-ugc-hoyowiki/2025/07/09/237301566/2627ae5e68e2632df6eeb87b58b6a4f6_8879732995034865752.png?x-oss-process=image%2Fformat%2Cwebp"
          alt=""
          loading="lazy"
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
    <!-- Character Page Content -->
    <div class="character-page mb-16" v-if="!error">
      <!-- Offset For Filters -->
      <div class="offset">
        <!-- rarity -->
        <h2 class="divider">Rarity</h2>
        <div class="rarity-container mb-10">
          <div
            class="rarity-item selected"
            :class="{ active: selectedRarity === 5 }"
            @click="selectRarity(5)"
          >
            5 star
          </div>
          <div
            class="rarity-item selected"
            :class="{ active: selectedRarity === 4 }"
            @click="selectRarity(4)"
          >
            4 star
          </div>
        </div>
        <!-- vision -->
        <h2 class="divider">Vision</h2>
        <div class="filter-container mb-10">
          <div class="custom-dropdown">
            <!-- Selected item -->
            <div class="dropdown-selected" @click="toggleDropdown('vision')">
              <img
                v-if="selectedVisionObj"
                :src="selectedVisionObj.image_url"
                alt=""
                loading="lazy"
                class="dropdown-icon"
              />
              <span>
                {{ selectedVisionObj ? selectedVisionObj.name : "All" }}
              </span>
              <span class="arrow">▼</span>
            </div>

            <!-- Dropdown options -->
            <ul v-if="isOpen('vision')" class="dropdown-list">
              <li @click="selectVision(null)">
                <span>All</span>
              </li>
              <li
                v-for="vision in visions"
                :key="vision.id"
                @click="selectVision(vision)"
              >
                <img
                  loading="lazy"
                  :src="vision.image_url"
                  alt=""
                  class="dropdown-icon"
                />
                <span>{{ vision.name }}</span>
              </li>
            </ul>
          </div>
        </div>
        <!-- weapon -->
        <h2 class="divider">Weapon Type</h2>
        <div class="filter-container mb-10">
          <div class="custom-dropdown">
            <!-- Selected item -->
            <div class="dropdown-selected" @click="toggleDropdown('weapon')">
              <img
                v-if="selectedWeaponTypeObj"
                :src="selectedWeaponTypeObj.image_url"
                loading="lazy"
                alt=""
                class="dropdown-icon"
              />
              <span>
                {{ selectedWeaponTypeObj ? selectedWeaponTypeObj.name : "All" }}
              </span>
              <span class="arrow">▼</span>
            </div>

            <!-- Dropdown options -->
            <ul v-if="isOpen('weapon')" class="dropdown-list">
              <li @click="selectWeaponType(null)">
                <span>All</span>
              </li>
              <li
                v-for="weaponType in weaponTypes"
                :key="weaponType.id"
                @click="selectWeaponType(weaponType)"
              >
                <img
                  loading="lazy"
                  :src="weaponType.image_url"
                  alt=""
                  class="dropdown-icon"
                />
                <span>{{ weaponType.name }}</span>
              </li>
            </ul>
          </div>
        </div>
        <!-- region -->
        <h2 class="divider">Region</h2>
        <div class="filter-container mb-8">
          <div class="custom-dropdown">
            <!-- Selected item -->
            <div class="dropdown-selected" @click="toggleDropdown('region')">
              <img
                v-if="selectedRegionObj"
                :src="selectedRegionObj.image_url"
                alt=""
                loading="lazy"
                class="dropdown-icon"
              />
              <span>
                {{ selectedRegionObj ? selectedRegionObj.name : "All" }}
              </span>
              <span class="arrow">▼</span>
            </div>

            <!-- Dropdown options -->
            <ul v-if="isOpen('region')" class="dropdown-list">
              <li @click="selectRegion(null)">
                <span>All</span>
              </li>
              <li
                v-for="region in regions"
                :key="region.id"
                @click="selectRegion(region)"
              >
                <img
                  loading="lazy"
                  :src="region.image_url"
                  alt=""
                  class="dropdown-icon"
                />
                <span>{{ region.name }}</span>
              </li>
            </ul>
          </div>
        </div>
        <!-- Apply And Reset Button -->
        <div class="divider"></div>
        <div class="filter-buttons-container mb-4">
          <button class="filter-button" @click="resetFilters">Reset</button>
          <button class="filter-button" @click="applyFilters">Apply</button>
        </div>
        <!-- Character Amount -->
        <div class="character-amount-container">
          <div class="character-amount" v-if="filterActive">
            {{ characters.length }} Characters Found
          </div>
        </div>
      </div>
      <!-- Character Display -->
      <div class="character-display-container">
        <!-- Character Card -->
        <router-link
          :to="`/characters/${character.id}?name=${encodeURIComponent(
            character.name
          )}`"
          target="_blank"
          class="character-item"
          v-for="character in characters"
          :key="character.id"
          :class="{
            'rarity-5': character.rarity === 5,
            'rarity-4': character.rarity === 4,
          }"
        >
          <!-- Character Overview -->
          <div class="character-item-overview">
            <div
              v-if="isUpcomingCharacter(character)"
              class="ribbon ribbon-top-left"
            >
              <span class="upcoming">Upcoming</span>
            </div>
            <div
              v-if="isNewCharacter(character)"
              class="ribbon ribbon-top-right"
            >
              <span class="new">New</span>
            </div>
            <img
              v-if="character.splash_art"
              class="character-item-splash-art"
              :src="character.splash_art"
              loading="lazy"
              alt=""
            />
            <div v-if="!character.splash_art"></div>
            <div class="character-item-info">
              <img
                class="character-item-image"
                :src="character.image_url"
                loading="lazy"
                :alt="character.name"
              />
              <h1 class="character-name mt-3">{{ character.name }}</h1>
            </div>
          </div>
          <!-- Character Details -->
          <div class="character-item-details">
            <img
              class="character-vision-image"
              :src="character.vision.image_url"
              loading="lazy"
              alt=""
            />
            <p class="character-detail-tag">
              {{ character.vision.name }}
            </p>
            <p class="character-detail-tag">
              {{ character.weapon_type.name }}
            </p>
            <p v-if="character.substat" class="character-detail-tag">
              {{ character.substat.name }}
            </p>
            <p v-if="character.team_role" class="character-detail-tag">
              {{ character.team_role.name }}
            </p>
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
                  : "UPCOMING"
              }}
            </p>
          </div>
        </router-link>
        <!-- Sentinel For Loading More -->
        <div ref="loadMoreTrigger" class="load-more-trigger" v-if="hasMore">
          <LoadingMoreSpinner />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// import necessary modules and components
import { ref, onMounted, onUnmounted, nextTick, computed } from "vue";
import { supabase } from "./../supabaseClient.js";
import "./../css/Ribbon.css";
import "./../css/CharacterPage.css";
import LoadingMoreSpinner from "../components/LoadingMoreSpinner.vue";

// state variables
const loading = ref(false);
const error = ref(null);
const openDropdown = ref(null);
const filterActive = ref(false);

// data states
const characters = ref([]); // array to hold character data
const visions = ref([]); // array to hold vision data
const weaponTypes = ref([]); // array to hold weapon type data
const regions = ref([]); // array to hold region data

// Select options states
const selectedVision = ref(null); // holds the selected vision
const selectedRarity = ref(null); // holds the selected rarity
const selectedWeaponType = ref(null); // holds the selected weapon type
const selectedRegion = ref(null); // holds the selected region

// pagination states
const page = ref(1); // current page number
const pageSize = 10; // number of characters per page
const hasMore = ref(true); // flag to indicate if more characters are available
const loadMoreTrigger = ref(null); // reference to the load more trigger element

// Intersection Observer instance
let observer = null;

// -------- Cache Functions -------------
function cache(key, data = null, ttl = 24 * 60 * 60 * 1000) {
  const now = new Date().getTime();

  if (data) {
    const item = {
      data,
      expiry: now + ttl,
    };
    localStorage.setItem(key, JSON.stringify(item));
    return data;
  } else {
    const cachedItem = localStorage.getItem(key);
    if (!cachedItem) return null;

    const parsedItem = JSON.parse(cachedItem);
    if (now > parsedItem.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return parsedItem.data;
  }
}

// -------- Data Fetching Function --------
async function fetchVisions() {
  try {
    // Check cache first
    const cached = cache("visions");
    if (cached) {
      visions.value = cached;
      return;
    }
    // Fetch visions from Supabase
    const { data, error: fetchError } = await supabase
      .from("visions")
      .select("*,id, name, image_url");
    if (fetchError) throw fetchError;

    cache("visions", data);
    visions.value = data;
  } catch (err) {
    console.error("Error fetching visions:", err);
  }
}

async function fetchWeaponTypes() {
  try {
    // Check cache first
    const cached = cache("weaponTypes");
    if (cached) {
      weaponTypes.value = cached;
      return;
    }
    // Fetch weapon types from Supabase
    const { data, error: fetchError } = await supabase
      .from("weaponTypes")
      .select("*,id, name, image_url");
    if (fetchError) throw fetchError;

    cache("weaponTypes", data);
    weaponTypes.value = data;
  } catch (err) {
    console.error("Error fetching weapon types:", err);
  }
}

async function fetchRegions() {
  try {
    // Check cache first
    const cached = cache("regions");
    if (cached) {
      regions.value = cached;
      return;
    }
    // Fetch regions from Supabase
    const { data, error: fetchError } = await supabase
      .from("regions")
      .select("*,id, name, image_url");
    if (fetchError) throw fetchError;

    cache("regions", data);
    regions.value = data;
  } catch (err) {
    console.error("Error fetching regions:", err);
  }
}

async function fetchCharacters({ reset = false } = {}) {
  if (reset) {
    page.value = 1;
    characters.value = [];
    hasMore.value = true;
  }

  if (!hasMore.value || loading.value) return;
  loading.value = true;

  const from = (page.value - 1) * pageSize;
  const to = from + pageSize - 1;

  try {
    const cached = cache("characters");
    if (cached && !reset) {
      characters.value = cached;
      hasMore.value = cached.length >= pageSize;
      loading.value = false;
      return;
    }

    let query = supabase
      .from("characters")
      .select(
        `*,
        vision:vision(id, name, image_url),
        team_role:team_role(name),
        substat:substat(name),
        weapon_type:weapon_type(id, name),
        region:region(id, name),
        new_character,
        is_upcoming`
      )
      .order("release_date", { ascending: false })
      .range(from, to);

    const { data, error: fetchError } = await query;
    if (fetchError) throw fetchError;

    if (data.length < pageSize) hasMore.value = false;

    characters.value.push(...data);
    page.value++;

    // cache session for devveloper convenience
    sessionStorage.setItem(
      "characters",
      JSON.stringify({
        characters: characters.value,
        page: page.value,
        hasMore: hasMore.value,
      })
    );
  } catch (err) {
    error.value = err.message || "Failed to load characters";
  } finally {
    loading.value = false;
  }
}

async function fetchFilteredCharacters(filters = {}) {
  loading.value = true;
  characters.value = [];
  hasMore.value = false; // disables infinite scroll

  try {
    let query = supabase
      .from("characters")
      .select(
        `*,
        vision:vision(id, name, image_url),
        team_role:team_role(name), substat:substat(name),
        weapon_type:weapon_type(id, name),
        region:region(id, name),
        new_character,
        is_upcoming`
      )
      .order("release_date", { ascending: false });

    if (filters.vision) query = query.eq("vision", filters.vision);
    if (filters.rarity) query = query.eq("rarity", filters.rarity);
    if (filters.weaponType) query = query.eq("weapon_type", filters.weaponType);
    if (filters.region) query = query.eq("region", filters.region);

    const { data, error: fetchError } = await query;
    if (fetchError) throw fetchError;

    characters.value = data;
  } catch (err) {
    error.value = err.message || "Failed to load filtered characters";
  } finally {
    loading.value = false;
  }
}

// ------ Dropdown Functions -------------
function selectRarity(rarity) {
  // Toggle rarity selection
  if (selectedRarity.value === rarity) {
    selectedRarity.value = null;
  } else {
    selectedRarity.value = rarity;
  }
}

function selectVision(vision) {
  // Set selected vision and close dropdown
  selectedVision.value = vision ? vision.id : null;
  openDropdown.value = false;
}

function selectWeaponType(weaponType) {
  // Set selected weapon type and close dropdown
  selectedWeaponType.value = weaponType ? weaponType.id : null;
  openDropdown.value = false;
}

function selectRegion(region) {
  // Set selected region and close dropdown
  selectedRegion.value = region ? region.id : null;
  openDropdown.value = false;
}

function toggleDropdown(type) {
  // Toggle dropdown visibility
  openDropdown.value = openDropdown.value === type ? null : type;
}

function isOpen(type) {
  // Check if a specific dropdown is open
  return openDropdown.value === type;
}

// -------- Filter Functions -------------
function getActiveFilters() {
  // Get currently selected filters
  return {
    vision: selectedVision.value,
    rarity: selectedRarity.value,
    weaponType: selectedWeaponType.value,
    region: selectedRegion.value,
  };
}

function applyFilters() {
  const filters = getActiveFilters();

  const noFiltersSelected =
    !filters.vision &&
    !filters.rarity &&
    !filters.weaponType &&
    !filters.region;

  if (noFiltersSelected) {
    alert("Please select at least one filter before applying.");
    return;
  }

  fetchFilteredCharacters(filters);
  filterActive.value = true;
}

function resetFilters() {
  selectedVision.value = null;
  selectedRarity.value = null;
  selectedWeaponType.value = null;
  selectedRegion.value = null;

  characters.value = [];
  page.value = 1;
  hasMore.value = true;

  fetchCharacters({ reset: true }).then(() => {
    setupObserver(); // Re-setup observer after resetting
  });
  filterActive.value = false;
}

// -------- Utility Functions -------------
function isNewCharacter(character) {
  // Check if character is new
  if (character && typeof character.new_character !== "undefined") {
    return Boolean(character.new_character);
  }
  return false;
}
function isUpcomingCharacter(character) {
  // Check if character is upcoming
  if (character && typeof character.is_upcoming !== "undefined") {
    return Boolean(character.is_upcoming);
  }
  return false;
}
function setupObserver() {
  if (observer && loadMoreTrigger.value) {
    observer.unobserve(loadMoreTrigger.value);
    observer.disconnect();
  }

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

  nextTick(() => {
    if (loadMoreTrigger.value) {
      observer.observe(loadMoreTrigger.value);
    }
  });
}

// -------- Computed Properties -------------
const selectedVisionObj = computed(() =>
  visions.value.find((v) => v.id === selectedVision.value)
);
const selectedWeaponTypeObj = computed(() =>
  weaponTypes.value.find((wt) => wt.id === selectedWeaponType.value)
);
const selectedRegionObj = computed(() =>
  regions.value.find((r) => r.id === selectedRegion.value)
);
// -------- Lifecycle Hooks -------------
// on component mount, fetch initial data and setup observer
onMounted(async () => {
  await fetchVisions();
  await fetchWeaponTypes();
  await fetchRegions();

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
    await fetchCharacters();
  }

  setupObserver();
});
// clean up observer on component unmount
onUnmounted(() => {
  if (observer && loadMoreTrigger.value) {
    observer.unobserve(loadMoreTrigger.value);
    observer.disconnect();
  }
});
</script>

<template>
  <div class="character-page-container mt-10">
    <!-- Character Header -->
    <div class="character-page-header">
      <h1 class="text-center">Character Archive</h1>
    </div>

    <!-- Character Display -->
    <div class="character-page mt-10 flex gap-16">
      <!--Offset-->
      <div class="character-page-offset px-8 py-2 rounded-xl">
        <h2 class="divider">Rarity</h2>
        <!-- Rarity Filter -->
        <div class="flex flex-row justify-around mb-10 mt-5">
          <div
            class="rarity-filter px-8 py-2 rounded-md"
            :class="{ 'active-filter': selectedRarity === 4 }"
            @click="selectRarity(4)"
          >
            <p>4 star</p>
          </div>
          <div
            class="rarity-filter px-8 py-2 rounded-md"
            :class="{ 'active-filter': selectedRarity === 5 }"
            @click="selectRarity(5)"
          >
            <p>5 star</p>
          </div>
        </div>
        <!-- Vision Dropdown -->
        <h2 class="divider">Visions</h2>
        <div
          class="flex flex-col items-center mb-10"
          :ref="(el) => setDropdownRef(el, 0)"
        >
          <div
            class="dropdown-default flex items-center justify-center py-2 rounded-md cursor-pointer"
            @click="toggleDropdown('vision')"
          >
            <img
              v-if="selectedVision"
              :src="selectedVision.image_url"
              alt=""
              class="w-6 h-6 object-contain"
            />
            <p class="pl-1">
              {{ selectedVision ? selectedVision.name : "Select Vision" }}
            </p>
          </div>

          <div
            v-if="openDropdown === 'vision'"
            class="dropdown-menu absolute mt-14 flex flex-col gap-2"
          >
            <div
              class="dropdown-item flex flex-row items-center py-2"
              v-for="vision in visions"
              :key="vision.name"
              @click="selectVision(vision)"
            >
              <img class="w-8 h-8 pl-2" :src="vision.image_url" alt="" />
              <p class="pl-1">{{ vision.name }}</p>
            </div>
          </div>
        </div>
        <!-- Weapon Dropdown -->
        <h2 class="divider">Weapons</h2>
        <div
          class="flex flex-col items-center mb-10"
          :ref="(el) => setDropdownRef(el, 1)"
        >
          <div
            class="dropdown-default flex items-center justify-center py-2 rounded-md cursor-pointer"
            @click="toggleDropdown('weapon')"
          >
            <img
              v-if="selectedWeaponType"
              :src="selectedWeaponType.image_url"
              alt=""
              class="w-6 h-6 object-contain"
            />
            <p class="pl-1">
              {{
                selectedWeaponType ? selectedWeaponType.name : "Select Weapon"
              }}
            </p>
          </div>

          <div
            v-if="openDropdown === 'weapon'"
            class="dropdown-menu absolute mt-14 flex flex-col gap-2"
          >
            <div
              class="dropdown-item flex flex-row items-center py-2"
              v-for="weaponType in weaponTypes"
              :key="weaponType.name"
              @click="selectWeaponTypes(weaponType)"
            >
              <img class="w-8 h-8 pl-2" :src="weaponType.image_url" alt="" />
              <p class="pl-1">{{ weaponType.name }}</p>
            </div>
          </div>
        </div>
        <!-- Region Dropdown -->
        <h2 class="divider">Regions</h2>
        <div
          class="flex flex-col items-center mb-10"
          :ref="(el) => setDropdownRef(el, 2)"
        >
          <div
            class="dropdown-default flex items-center justify-center py-2 rounded-md cursor-pointer"
            @click="toggleDropdown('region')"
          >
            <img
              v-if="selectedRegion"
              :src="selectedRegion.image_url"
              alt=""
              class="w-6 h-6 object-contain"
            />
            <p class="pl-1">
              {{ selectedRegion ? selectedRegion.name : "Select Region" }}
            </p>
          </div>

          <div
            v-if="openDropdown === 'region'"
            class="dropdown-menu absolute mt-14 flex flex-col gap-2"
          >
            <div
              class="dropdown-item flex flex-row items-center py-2"
              v-for="region in regions"
              :key="region.name"
              @click="selectRegion(region)"
            >
              <img class="w-8 h-8 pl-2" :src="region.image_url" alt="" />
              <p class="pl-1">{{ region.name }}</p>
            </div>
          </div>
        </div>
        <!-- Apply and Reset Button-->
        <div class="divider"></div>
        <div class="flex flex-row justify-around">
          <div class="filter-button px-8 py-2 rounded-md tracking-wider">
            Reset
          </div>
          <div
            class="filter-button px-8 py-2 rounded-md tracking-wider"
            @click="filterCharacter"
          >
            Apply
          </div>
        </div>
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
            <h1 class="no-more-character px-10 py-2 rounded-2xl tracking-wide">
              No More Characters
            </h1>
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
import { data } from "autoprefixer";

const characters = ref([]);
const visions = ref([]);
const regions = ref([]);
const weaponTypes = ref([]);
const error = ref(null);
const loading = ref(false);
const hasMore = ref(true);
const page = ref(0);
const pageSize = 10;
const loadMoreRef = ref(null);

const openDropdown = ref(null);
const dropdownRefs = ref([]);
const selectedRarity = ref(null);
const selectedVision = ref(null);
const selectedWeaponType = ref(null);
const selectedRegion = ref(null);

let observer = null;

// --- Cache keys ---
const CHARACTER_CACHE_KEY = "characterCache";
const VISION_CACHE_KEY = "visionCache";
const WEAPON_TYPES_CACHE_KEY = "weaponTypesCache";
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

async function fetchVisions() {
  try {
    let query = supabase.from("visions").select("*");
    const { data, error: supabaseError } = await query;
    if (supabaseError) throw supabaseError;
    visions.value = data;
    cache(VISION_CACHE_KEY, data);
  } catch (err) {
    error.value = err.message || "Failed to load visions";
    console.error(error.value);
  }
}

// --- Fetch Regions ---
async function fetchRegions() {
  try {
    let query = supabase
      .from("regions")
      .select("*")
      .in("id", [1, 2, 3, 4, 5, 6, 7]);
    const { data, error: supabaseError } = await query;
    if (supabaseError) throw supabaseError;
    regions.value = data;
    cache(REGION_CACHE_KEY, data);
  } catch (err) {
    error.value = err.message || "Failed to load regions";
    console.error(error.value);
  }
}
// --- Fetch Weapon Types ---
async function fetchWeaponTypes() {
  try {
    let query = supabase.from("weaponTypes").select("*");
    const { data, error: supabaseError } = await query;
    if (supabaseError) throw supabaseError;
    weaponTypes.value = data;
    cache(WEAPON_TYPES_CACHE_KEY, data);
  } catch (err) {
    error.value = err.message || "Failed to load weapon types";
    console.error(error.value);
  }
}

// --- Select Function ---
function selectRarity(rarity) {
  selectedRarity.value = selectedRarity.value === rarity ? null : rarity;
  console.log(selectedRarity.value);
}

function selectVision(vision) {
  selectedVision.value = vision;
  openDropdown.value = null;
  console.log(selectedVision.value.id);
}
function selectWeaponTypes(weaponType) {
  selectedWeaponType.value = weaponType;
  openDropdown.value = null;
  console.log(selectedWeaponType.value.id);
}
function selectRegion(region) {
  selectedRegion.value = region;
  openDropdown.value = null;
  console.log(selectedRegion.value.id);
}

// Filter Function
async function filterCharacter() {
  // No filter warning
  if (
    !selectedRarity.value &&
    !selectedVision.value &&
    !selectedWeaponType.value &&
    !selectedRegion.value
  ) {
    alert("⚠️ Please select at least one filter before applying!");
    return;
  }

  // loading and disabling infinite scroll
  loading.value = true;
  hasMore.value = false;
  page.value = 0;
  characters.value = [];

  try {
    let regionIds = null;
    // --- Step 1: handle region separately ---
    if (selectedRegion.value) {
      let query = supabase
        .from("character_region")
        .select("character_id")
        .eq("region_id", selectedRegion.value.id);

      const { data: regionCharacters, error: regionError } = await query;
      if (regionError) throw regionError;
      regionIds = regionCharacters.map((r) => r.character_id);
    }

    // --- Step 2: base character query ---
    let query = supabase.from("characters").select(`
        *,
        regions:character_region(region_id(id, name)),
        vision(id, name, image_url),
        weaponTypes(id, name),
        role(name),
        main_stat(id, name)
      `);

    if (selectedRarity.value) {
      query = query.eq("rarity", selectedRarity.value);
    }

    if (selectedVision.value) {
      query = query.eq("vision:vision.id", selectedVision.value.id);
    }

    if (selectedWeaponType.value) {
      query = query.eq(
        "weapon_type:weaponTypes.id",
        selectedWeaponType.value.id
      );
    }

    if (regionIds && regionIds.length > 0) {
      query = query.in("id", regionIds);
    }

    const { data, error } = await query;
    if (error) throw error;

    characters.value = data;
  } catch (err) {
    error.value = err.message || "Failed to filter characters";
    console.error(error.value);
  } finally {
    loading.value = false;
  }
}

// --- Dropdown Menu ---
function toggleDropdown(name) {
  openDropdown.value = openDropdown.value === name ? null : name;
}

function handleClickOutside(e) {
  // If no dropdown is open, ignore
  if (!openDropdown.value) return;

  // Check if the click target is inside any dropdown wrapper
  const clickedInside = dropdownRefs.value.some((refEl) =>
    refEl?.contains(e.target)
  );

  if (!clickedInside) {
    openDropdown.value = null;
  }
}

function setDropdownRef(el, index) {
  if (el) dropdownRefs.value[index] = el;
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
  document.addEventListener("click", handleClickOutside);
  const cachedCharacters = cache(CHARACTER_CACHE_KEY);
  const cachedRegions = cache(REGION_CACHE_KEY);
  const cachedVisions = cache(VISION_CACHE_KEY);
  const cachedWeaponTypes = cache(WEAPON_TYPES_CACHE_KEY);

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

  if (cachedVisions) {
    visions.value = cachedVisions;
  } else {
    fetchVisions();
  }

  if (cachedWeaponTypes) {
    weaponTypes.value = cachedWeaponTypes;
  } else {
    fetchWeaponTypes();
  }

  console.log(characters.value);

  setupObserver();
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
  if (observer && loadMoreRef.value) {
    observer.unobserve(loadMoreRef.value);
    observer.disconnect();
  }
});
</script>

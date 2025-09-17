<template>
  <div v-if="!loading && !error" class="character-filter-container">
    <!-- Vision Filter -->
    <h4 class="filter-header divider">Sort By Vision</h4>
    <div class="vision-filter-container mt-5 mb-16">
      <div
        v-for="vision in visions"
        :key="vision.id"
        class="vision-filter-item filter-hover"
        :class="{ selected: selectedVisionId === vision.id }"
        @click="selectVision(vision)"
      >
        <img
          :src="vision.image_url"
          :alt="vision.name"
          class="vision-filter-icon"
        />
      </div>
    </div>

    <!-- Rarity Filter -->
    <h4 class="filter-header divider">Sort By Rarity</h4>
    <div class="rarity-filter-container mt-5 mb-16">
      <div
        class="rarity-filter-item filter-hover"
        :class="{ selected: selectedRarity === 5 }"
        @click="selectRarity(5)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="bi bi-star-fill rarity-star"
        >
          <path
            d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="bi bi-star-fill rarity-star"
        >
          <path
            d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="bi bi-star-fill rarity-star"
        >
          <path
            d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="bi bi-star-fill rarity-star"
        >
          <path
            d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="bi bi-star-fill rarity-star"
        >
          <path
            d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
          />
        </svg>
      </div>
      <div
        class="rarity-filter-item filter-hover"
        :class="{ selected: selectedRarity === 4 }"
        @click="selectRarity(4)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="bi bi-star-fill rarity-star"
        >
          <path
            d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="bi bi-star-fill rarity-star"
        >
          <path
            d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="bi bi-star-fill rarity-star"
        >
          <path
            d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="bi bi-star-fill rarity-star"
        >
          <path
            d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
          />
        </svg>
      </div>
    </div>

    <!-- Weapon Filter -->
    <h4 class="filter-header divider">Sort By Weapon</h4>
    <div class="weapon-filter-container mt-5 mb-16">
      <div
        class="weapon-filter-item filter-hover"
        v-for="weapon in weaponTypes"
        :key="weapon.id"
        :class="{ selected: selectedWeaponTypeId === weapon.id }"
        @click="selectWeaponType(weapon)"
      >
        <p>{{ weapon.name }}</p>
      </div>
    </div>

    <!-- Region Filter -->
    <h4 class="filter-header divider">Sort By Region</h4>
    <div class="region-filter-container mt-5 mb-6">
      <div
        v-for="region in regions"
        :key="region.id"
        class="region-filter-item filter-hover"
        :class="{ selected: selectedRegionId === region.id }"
        @click="selectRegion(region)"
      >
        <img class="region-image" :src="region.image_url" alt="" />
        <p>{{ region.name }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { supabase } from "../supabaseClient.js";

const emits = defineEmits(["filtered-characters", "clear-filter"]);
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour in milliseconds

// Loading and error states
const loading = ref(true);
const error = ref(null);
// Data states
const visions = ref([]);
const weaponTypes = ref([]);
const regions = ref([]);

// Select Filter states
const selectedVisionId = ref(null);
const selectedRarity = ref(null);
const selectedWeaponTypeId = ref(null);
const selectedRegionId = ref(null);

// Caching functions
function getCachedData(key) {
  const cachedData = sessionStorage.getItem(key);

  if (!cachedData) {
    return null;
  }

  const { data, timestamp } = JSON.parse(cachedData);
  const now = new Date().getTime();

  if (now - timestamp < CACHE_DURATION) {
    return data;
  } else {
    sessionStorage.removeItem(key);
    return null;
  }
}
function setCachedData(key, data) {
  const cache = {
    timestamp: new Date().getTime(),
    data,
  };
  sessionStorage.setItem(key, JSON.stringify(cache));
}

// Data fetching functions
async function getAllVisions() {
  const cacheKey = "visions";

  const cachedVisions = getCachedData(cacheKey);
  if (cachedVisions) {
    visions.value = cachedVisions;
    loading.value = false;
    return;
  }

  try {
    const { data, error: fetchError } = await supabase
      .from("visions")
      .select("*, name, image_url");
    if (fetchError) throw fetchError;

    visions.value = data;
    setCachedData(cacheKey, data);
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
}
async function getAllWeaponTypes() {
  const cachedWeaponTypes = getCachedData("weaponTypes");
  if (cachedWeaponTypes) {
    weaponTypes.value = cachedWeaponTypes;
    loading.value = false;
    return;
  }

  try {
    const { data, error: fetchError } = await supabase
      .from("weaponTypes")
      .select("*, name");
    if (fetchError) throw fetchError;

    weaponTypes.value = data;
    setCachedData("weaponTypes", data);
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
}
async function getAllRegions() {
  const cachedRegions = getCachedData("regions");
  if (cachedRegions) {
    regions.value = cachedRegions;
    loading.value = false;
    return;
  }

  try {
    const { data, error: fetchError } = await supabase
      .from("regions")
      .select("*, name, image_url")
      .order("id", { ascending: true });
    if (fetchError) throw fetchError;

    regions.value = data;
    setCachedData("regions", data);
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
}

// Filter selection functions
function selectVision(vision) {
  selectedVisionId.value =
    selectedVisionId.value === vision.id ? null : vision.id;
}
function selectRarity(stars) {
  selectedRarity.value = selectedRarity.value === stars ? null : stars;
}
function selectWeaponType(weaponType) {
  selectedWeaponTypeId.value =
    selectedWeaponTypeId.value === weaponType.id ? null : weaponType.id;
}
function selectRegion(region) {
  selectedRegionId.value =
    selectedRegionId.value === region.id ? null : region.id;
  console.log(selectedRegionId.value, region.name);
}

// Computed property to filter characters based on selected filters
const filteredCharacters = computed(() => {
  const cachedCharacters = sessionStorage.getItem("characters");
  if (!cachedCharacters) return [];

  try {
    const { data: characters } = JSON.parse(cachedCharacters);

    return characters.filter((char) => {
      // Vision filter (compare vision object's ID)
      const visionMatch =
        !selectedVisionId.value || char.vision?.id === selectedVisionId.value;

      // Rarity filter
      const rarityMatch =
        !selectedRarity.value || char.rarity === selectedRarity.value;

      // Weapon Type filter (compare weapon_type number ID directly)
      const weaponTypeMatch =
        !selectedWeaponTypeId.value ||
        char.weapon_type?.id === selectedWeaponTypeId.value;

      // Region filter (compare region object's ID)
      const regionMatch =
        !selectedRegionId.value || char.region?.id === selectedRegionId.value;
      console.log(char.region?.id, selectedRegionId.value, regionMatch);

      return visionMatch && rarityMatch && weaponTypeMatch && regionMatch;
    });
  } catch (err) {
    console.error("Error filtering characters:", err);
    return [];
  }
});

// Watch statement to update the filtered characters if the selected vision or rarity changes
watch(
  filteredCharacters,
  (newVal) => {
    emits("filtered-characters", newVal);
  },
  { immediate: true }
);

onMounted(async () => {
  await getAllVisions();
  await getAllWeaponTypes();
  await getAllRegions();
});
</script>

<style scoped>
.filter-container {
  width: 100%;
  font-family: var(--font-acme);
}

.vision-filter-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 15px;
}

.filter-header {
  font-size: 18px;
  font-family: var(--font-acme);
  letter-spacing: 1.5px;
  cursor: default;
  text-shadow: 1px 1px 2px black, 0 0 1em black, 0 0 0.2em black;
}

.vision-filter-item {
  height: 60px;
  width: 60px;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 100px;
  background-color: var(--filter-color);
  outline: 1px solid black;
  transition: background-color 0.3s;
}

.vision-filter-item.selected {
  outline: 2px solid gold;
}

.vision-filter-icon {
  height: 100%;
  width: 100%;
  border-radius: 100px;
}

.rarity-filter-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 10px;
}

.rarity-filter-item {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  padding: 10px;
  background-color: var(--filter-color);
  border-radius: 10px;
  cursor: pointer;
  outline: 1px solid black;
  transition: background-color 0.3s;
}

.rarity-filter-item.selected {
  outline: 1px solid gold;
}

.rarity-star {
  color: #f5c518;
  fill: #f5c518;
  width: 16px;
  height: 16px;
  background-color: transparent;
}

.weapon-filter-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.weapon-filter-item {
  width: 90%;
  padding: 10px;
  cursor: pointer;
  letter-spacing: 1px;
  border-radius: 10px;
  outline: 1px solid black;
  font-family: var(--font-acme);
  transition: background-color 0.3s;
  background-color: var(--filter-color);
}

.weapon-filter-item.selected {
  outline: 1px solid gold;
}

.region-filter-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.region-filter-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 90%;
  padding: 10px;
  cursor: pointer;
  letter-spacing: 1px;
  border-radius: 10px;
  outline: 1px solid black;
  font-family: var(--font-acme);
  transition: background-color 0.3s;
  background-color: var(--filter-color);
}

.region-filter-item.selected {
  outline: 1px solid gold;
}

.region-image {
  height: 40px;
  margin-bottom: 5px;
  margin-right: 5px;
}

.filter-hover:hover {
  background-color: var(--filter-color-hover);
}
</style>

<template>
  <div class="w-3/4 min-h-screen mb-32">
    <div class="h-[150px] w-3/4 relative rounded-2xl mx-auto">
      <h1
        class="absolute inset-0 z-20 flex items-center justify-center text-7xl font-acme tracking-wide outline-4"
      >
        Character Archive
      </h1>
      <div class="absolute inset-0 bg-black/50 z-10 rounded-2xl"></div>
      <img
        class="w-full h-full object-cover object-bottom rounded-2xl"
        src="https://act-upload.hoyoverse.com/event-ugc-hoyowiki/2025/07/09/237301566/2627ae5e68e2632df6eeb87b58b6a4f6_8879732995034865752.png?x-oss-process=image%2Fformat%2Cwebp"
        alt=""
        loading="lazy"
      />
    </div>

    <div class="divider my-4 px-24"></div>

    <p class="text-center px-32 text-lg/6 tracking-wide">
      Here you can find a comprehensive list of all playable characters
      available in Genshin Impact, by clicking on their names to see their
      details, attributes and builds. Use the filter options to easily find
      characters based on your preferences.
    </p>

    <div v-if="!error" class="w-full min-h-screen flex gap-8 mt-8">
      <div
        class="bg-secondary h-fit w-1/4 px-4 py-8 rounded-xl flex flex-col gap-6"
      >
        <h2 class="divider">Rarity</h2>
        <div class="flex flex-rows justify-center items-center gap-8">
          <div
            class="selected text-yellow-400 bg-primary hover:border hover:border-solid hover:border-tertiary px-4 py-2 rounded-xl border border-solid border-black cursor-pointer tracking-wider"
            :class="{ active: selectedRarity === 5 }"
            @click="selectRarity(5)"
          >
            ★★★★★
          </div>
          <div
            class="selected text-yellow-400 bg-primary hover:border hover:border-solid hover:border-tertiary px-4 py-2 rounded-xl border border-solid border-black cursor-pointer tracking-wider"
            :class="{ active: selectedRarity === 4 }"
            @click="selectRarity(4)"
          >
            ★★★★
          </div>
        </div>
        <h2 class="divider">Vision</h2>
        <div
          class="custom-dropdown mx-auto bg-primary rounded-lg border border-solid border-black py-1"
        >
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
          <ul
            v-if="isOpen('vision')"
            class="dropdown-list bg-primary border border-solid border-black"
          >
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
        <h2 class="divider">Weapon Type</h2>
        <div
          class="custom-dropdown mx-auto bg-primary rounded-lg border border-solid border-black py-1"
        >
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
          <ul
            v-if="isOpen('weapon')"
            class="dropdown-list bg-primary border border-solid border-black"
          >
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
        <h2 class="divider">Region</h2>
        <div
          class="custom-dropdown mx-auto bg-primary rounded-lg border border-solid border-black py-1"
        >
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
          <ul
            v-if="isOpen('region')"
            class="dropdown-list bg-primary border border-solid border-black"
          >
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
        <div class="divider"></div>
        <div class="flex flex-row justify-center items-center gap-8">
          <button class="btn btn-soft px-6 tracking-wide" @click="applyFilters">
            Apply
          </button>
          <button class="btn btn-soft px-6 tracking-wide" @click="resetFilters">
            Reset
          </button>
        </div>
      </div>

      <div class="h-fit w-3/4 flex flex-col gap-16">
        <RouterLink
          :to="`/characters/${character.id}?name=${encodeURIComponent(
            character.name
          )}`"
          class="relative group rounded-2xl no-underline text-white"
          :class="{
            'rarity-5': character.rarity === 5,
            'rarity-4': character.rarity === 4,
          }"
          v-for="character in characters"
          :key="character.id"
        >
          <div v-if="character.is_new" class="absolute -top-3 -right-3 z-20">
            <div
              class="flex items-center justify-center h-8 w-8 rounded-full bg-red-500 text-white text-xs font-semibold shadow-md uppercase"
            >
              New
            </div>
          </div>
          <div
            v-if="character.is_upcoming"
            class="absolute -top-3 -right-3 z-20"
          >
            <div
              class="flex items-center justify-center px-3 h-7 rounded-full bg-blue-500 text-white text-xs font-semibold uppercase shadow-md whitespace-nowrap"
            >
              Upcoming
            </div>
          </div>
          <div
            class="relative bg-secondary flex flex-row justify-between overflow-hidden rounded-t-2xl"
          >
            <div class="flex flex-row items-center justify-center p-6 gap-4">
              <img
                class="w-32 rounded-full"
                :class="{
                  'rarity-5': character.rarity === 5,
                  'rarity-4': character.rarity === 4,
                }"
                :src="character.avatar_url"
                loading="lazy"
                :alt="character.name"
              />
              <h1
                class="relative text-4xl font-acme tracking-wide after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[3px] after:w-0 after:bg-current after:transition-all after:duration-300 group-hover:after:w-full"
              >
                {{ character.name }}
              </h1>
            </div>
            <img
              v-if="character.splash_art_url"
              class="absolute w-64 h-64 right-0 -top-10 opacity-50"
              :src="character.splash_art_url"
              loading="lazy"
              alt=""
            />
            <div v-if="!character.splash_art"></div>
          </div>
          <div
            class="bg-gray-600 flex flex-row justify-between rounded-b-2xl p-4 border-0 border-t-2 border-solid border-black"
          >
            <div class="flex flex-row gap-4 items-center">
              <img
                class="w-12 ml-2"
                :src="character.vision.image_url"
                loading="lazy"
                alt=""
              />
              <p
                v-if="character.vision.name"
                class="badge badge-soft px-5 py-2 font-acme text-lg text-tertiary"
              >
                {{ character.vision.name }}
              </p>
              <p
                v-if="character.role"
                class="badge badge-soft px-5 py-2 font-acme text-lg text-tertiary"
              >
                {{ character.role.name }}
              </p>
              <p
                v-if="character.weapon_type"
                class="badge badge-soft px-5 py-2 font-acme text-lg text-tertiary"
              >
                {{ character.weapon_type.name }}
              </p>
              <p
                v-if="character.main_stat"
                class="badge badge-soft px-5 py-2 font-acme text-lg text-tertiary"
              >
                {{ character.main_stat.name }}
              </p>
              <p
                v-if="character.team_role"
                class="badge badge-soft px-5 py-2 font-acme text-lg text-tertiary"
              >
                {{ character.team_role.name }}
              </p>
            </div>
            <div class="flex items-center">
              <p class="badge badge-soft px-5 py-2 text-md text-tertiary">
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
          </div>
        </RouterLink>
        <div ref="loadMoreTrigger" class="load-more-trigger" v-if="hasMore">
          <LoadingMoreSpinner />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, computed } from "vue";
import { supabase } from "./../supabaseClient.js";
import "./../css/Ribbon.css";
// import "./../css/CharacterPage.css";
import LoadingMoreSpinner from "../components/Loadings/LoadingMoreSpinner.vue";

// state variables
const loading = ref(false);
const error = ref(null);
const openDropdown = ref(null);
const filterActive = ref(false);

// data states
const characters = ref([]);
const visions = ref([]);
const weaponTypes = ref([]);
const regions = ref([]);

// Select options states
const selectedVision = ref(null);
const selectedRarity = ref(null);
const selectedWeaponType = ref(null);
const selectedRegion = ref(null);

// pagination states
const page = ref(1);
const pageSize = 5;
const hasMore = ref(true);
const loadMoreTrigger = ref(null);

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
    const cached = cache("visions");
    if (cached) {
      visions.value = cached;
      return;
    }
    let query = supabase.from("visions").select("*,id, name, image_url");
    const { data, error: fetchError } = await query;
    if (fetchError) throw fetchError;
    cache("visions", data);
    visions.value = data;
  } catch (err) {
    console.error("Error fetching visions:", err);
  }
}

async function fetchWeaponTypes() {
  try {
    const cached = cache("weaponTypes");
    if (cached) {
      weaponTypes.value = cached;
      return;
    }
    let query = supabase.from("weaponTypes").select("*,id, name, image_url");
    const { data, error: fetchError } = await query;
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
      .select("*,id, name, image_url")
      .in("id", [1, 2, 3, 4, 5, 6, 7]);
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
        "*, vision:visions(id, name, image_url), main_stat:stats(id, name), weapon_type:weaponTypes(id, name), role(id, name)"
      )
      .order("release_date", { ascending: false })
      .range(from, to);
    const { data, error: fetchError } = await query;
    if (fetchError) throw fetchError;
    if (data.length < pageSize) hasMore.value = false;
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
        "*, released_region:regions(id) , vision:visions(id, name, image_url), main_stat:stats(id, name), weapon_type:weaponTypes(id, name), role(id,name)"
      )
      .order("release_date", { ascending: false });
    if (filters.vision) query = query.eq("vision", filters.vision);
    if (filters.rarity) query = query.eq("rarity", filters.rarity);
    if (filters.weaponType) query = query.eq("weapon_type", filters.weaponType);
    if (filters.region) query = query.eq("released_region", filters.region);
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
  if (selectedRarity.value === rarity) {
    selectedRarity.value = null;
  } else {
    selectedRarity.value = rarity;
  }
}

function selectVision(vision) {
  selectedVision.value = vision ? vision.id : null;
  openDropdown.value = false;
}

function selectWeaponType(weaponType) {
  selectedWeaponType.value = weaponType ? weaponType.id : null;
  openDropdown.value = false;
}

function selectRegion(region) {
  selectedRegion.value = region ? region.id : null;
  openDropdown.value = false;
}

function toggleDropdown(type) {
  openDropdown.value = openDropdown.value === type ? null : type;
}

function isOpen(type) {
  return openDropdown.value === type;
}

// -------- Filter Functions -------------
function getActiveFilters() {
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

<style scoped>
.selected.active {
  border: 1px solid var(--tertiary);
}
.custom-dropdown {
  position: relative;
  width: 220px;
  letter-spacing: 1.5px;
}

.dropdown-selected {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 0.6rem 1rem;
  cursor: pointer;
}

.dropdown-selected img.dropdown-icon {
  width: 20px;
  height: 20px;
  object-fit: contain;
}

.dropdown-list {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  margin-top: 0.25rem;
  list-style: none;
  padding: 0;
  z-index: 10;
}

.dropdown-list li {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0.6rem 1rem;
  cursor: pointer;
}

.dropdown-list li:hover {
  background: var(--filter-color-hover);
}

.dropdown-list img.dropdown-icon {
  width: 20px;
  height: 20px;
  object-fit: contain;
}

.arrow {
  margin-left: auto;
  font-size: 0.8rem;
  color: white;
}
.rarity-5 {
  background: linear-gradient(145deg, #e7944a, #b56a2b);
  box-shadow: 0px 0px 15px rgba(231, 148, 74, 0.8),
    0px 0px 30px rgba(231, 148, 74, 0.5);
}
.rarity-4 {
  background: linear-gradient(145deg, #9b72d5, #7149a3);
  box-shadow: 0px 0px 15px rgba(155, 114, 213, 0.8),
    0px 0px 30px rgba(155, 114, 213, 0.5);
}
</style>

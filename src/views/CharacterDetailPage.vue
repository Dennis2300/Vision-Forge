<template>
  <div class="character-detail-container">
    <!-- Loading Spinner -->
    <LoadingSpinner v-if="loading" />
    <!-- Character Detail Page -->
    <div
      v-else-if="character"
      class="character-detail"
      :class="{
        'rarity-5': character.rarity === 5,
        'rarity-4': character.rarity === 4,
      }"
    >
      <!-- Background Image -->
      <img
        v-if="character.splash_art"
        class="background-img"
        :src="character.splash_art"
        alt="Character Art"
        loading="lazy"
      />
      <div v-else></div>
      <!-- Fallback if no splash art is available -->

      <!-- character detail image container -->
      <div class="character-detail-image-container">
        <!-- character avatar -->
        <div class="character-avatar-container">
          <div class="character-avatar-wrapper">
            <img
              class="character-avatar-img"
              :src="character.image_url"
              :alt="character.name"
              loading="lazy"
            />
            <img
              class="character-vision-img"
              :src="character.vision.image_url"
              loading="lazy"
              alt=""
            />
          </div>
          <h1 v-if="character.fullname" class="character-name mt-3">
            {{ character.fullname }}
          </h1>
          <h1 v-else class="character-name mt-3">{{ character.name }}</h1>
          <div class="character-tags-container mt-2">
            <p class="character-tags">{{ character.vision.name }}</p>
            <p class="character-tags" v-if="character.team_role?.name">
              {{ character.team_role?.name || "" }}
            </p>
            <p class="character-tags" v-if="character.substat?.name">
              {{ character.substat?.name || "" }}
            </p>
            <p class="character-tags">{{ character.weapon_type.name }}</p>
          </div>
        </div>

        <!-- character overview -->
        <div class="character-overview-container">
          <div class="character-overview">
            <!-- character voice actors -->
            <h1 class="divider">Voice Actors</h1>
            <div class="character-va-container" v-if="character.va">
              <div v-for="(name, lang) in character.va" :key="lang">
                <p class="character-list-view">
                  {{ flagEmoji(lang) }} &rarr;
                  <span v-html="formatVoiceActorName(name)"></span>
                </p>
              </div>
            </div>

            <div v-else>
              <p class="text-center my-9">No voice actors announced yet.</p>
            </div>

            <!-- character affiliation -->
            <h1 class="divider mt-5">Affiliation</h1>
            <div
              v-if="character.affiliation"
              v-for="affiliation in character.affiliation"
              :key="affiliation"
            >
              <p class="character-list-view">
                {{ affiliation ? affiliation : "" }}
              </p>
            </div>

            <div v-else>
              <p class="text-center my-9">No affiliation yet.</p>
            </div>

            <!-- character regions -->
            <h1 class="divider mt-5">Region</h1>
            <div
              class="character-list-view mt-8"
              v-for="region in character.regions"
              :key="region.id"
            >
              <img
                loading="lazy"
                :src="region.image_url"
                alt=""
                class="region-image"
              />
              <p class="region-name">
                {{ region.name }}
              </p>
            </div>
            <div v-if="!character.regions.length">
              <p class="text-center my-9">No regions yet.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- character detail container  -->
      <div class="character-info-container">
        <h1 class="divider">Character Information</h1>
        <div class="character-info character-info-grid">
          <!-- Character Info Grid -->
          <div class="character-info-grid-item left">
            <p class="character-info-text">
              <span style="color: gray">Rarity</span>
              <span style="color: gold">{{
                "★".repeat(character.rarity)
              }}</span>
            </p>
            <div class="divider m-0"></div>
            <p class="character-info-text">
              <span style="color: gray">Birthday (mm/dd)</span>
              <span>{{ character.birthday }}</span>
            </p>
            <div class="divider m-0"></div>

            <p class="character-info-text">
              <span style="color: gray">Constellation</span>
              <span>{{ character.constellation }}</span>
            </p>
          </div>

          <!-- Character Info Grid -->
          <div class="character-info-grid-item right">
            <p class="character-info-text">
              <span style="color: gray">Weapon</span>
              <span>{{ character.weapon_type.name }}</span>
            </p>
            <div class="divider m-0"></div>
            <p class="character-info-text">
              <span style="color: gray">Release Date</span>
              <span>{{ formatDate(character.release_date) }}</span>
            </p>
            <div class="divider m-0"></div>
            <p class="character-info-text">
              <span style="color: gray">Favourite Dish</span>
              <span>{{ character.favourite_dish }}</span>
            </p>
          </div>
        </div>
      </div>

      <!-- character best artifact -->
      <div class="character-artifact-container">
        <h1 class="divider">Best Artifact for {{ character.name }}</h1>
        <div class="character-bis-list-container">
          <router-link
            :to="`/artifacts/${artifact.id}?name=${encodeURIComponent(
              artifact.name
            )}`"
            class="character-bis-item"
            v-for="artifact in character.artifacts"
            :key="artifact.id"
          >
            <img
              class="character-bis-image"
              :src="artifact.flower_url"
              loading="lazy"
              alt=""
            />
            <p class="character-bis-name">{{ artifact.name }}</p>
            <span class="character-weapon-rank">{{ artifact.rank }}</span>
          </router-link>
          <div v-if="!character.artifacts.length">
            <p class="not-found mb-6">No artifacts found for this character.</p>
          </div>
        </div>

        <div class="character-build-container my-5">
          <div class="character-build-text">
            <MarkdownRender :content="character.artifact_build_note" />
            <p
              class="no-build-yet text-3xl"
              v-if="!character.artifact_build_note.length"
            >
              Not available yet
            </p>
          </div>
          <div class="character-artifact-stats">
            <div
              class="character-artifact-text"
              v-for="build in character.build"
              :key="build.id"
            >
              <div class="divider text-3xl mb-3 sands">Sands</div>
              <h2>{{ build.sands_main_stat }}</h2>
              <div class="divider text-3xl mt-8 mb-3 goblet">Goblet</div>
              <h2>{{ build.goblet_main_stat }}</h2>
              <div class="divider text-3xl mt-8 mb-3 circlet">Circlet</div>
              <h2>{{ build.circlet_main_stat }}</h2>
              <div class="divider text-xl mt-8 substat">Substat priority</div>
              <div
                class="text-left"
                v-for="substat in build.substat_priority"
                :key="build.id"
              >
                <p class="text-lg">- {{ substat }}</p>
              </div>
            </div>
            <p
              class="no-build-yet text-3xl"
              v-if="!character.artifact_build_note.length"
            >
              Not available yet
            </p>
          </div>
        </div>
      </div>

      <!-- character best weapon -->
      <div class="character-weapon-container">
        <h1 class="divider">Best Weapon for {{ character.name }}</h1>
        <div class="character-bis-list-container">
          <router-link
            :to="`/weapons/${weapon.id}?name=${encodeURIComponent(
              weapon.name
            )}`"
            class="character-bis-item"
            v-for="weapon in character.weapons"
            :key="weapon.id"
          >
            <img
              class="character-bis-weapon-image"
              :class="{
                'weapon-rarity-5': weapon.rarity === 5,
                'weapon-rarity-4': weapon.rarity === 4,
              }"
              :src="weapon.image_url"
              loading="lazy"
              alt=""
            />
            <p class="character-bis-name">
              {{ weapon.name }}
            </p>
            <span class="character-weapon-rank">{{ weapon.rank }}</span>
          </router-link>
          <div v-if="!character.weapons.length">
            <p class="not-found">No weapons found for this character.</p>
          </div>
        </div>
      </div>

      <!-- Placeholder for character build infographic -->
      <div class="character-mats-container">
        <h1 class="divider">{{ character.name }} Level up materials</h1>
        <div>
          <img
            class="character-mats-infographic"
            :src="`https://placehold.co/1000x700/222831/white?text=Character+mats+not+available+yet+for+${character.name}`"
            loading="lazy"
            alt=""
          />
        </div>
      </div>

      <!-- Talent description and priority -->
      <div v-if="character.talents" class="character-talents-container">
        <h1 class="divider">{{ character.name }}'s kit</h1>
        <div class="character-talents">
          <!-- Talent Menu -->
          <div class="character-talents-menu">
            <div
              class="talent-menu-item"
              @click="selectTalent('normal_attack')"
            >
              Normal Attack
            </div>
            <div
              class="talent-menu-item"
              @click="selectTalent('elemental_skill')"
            >
              Elemental Skill
            </div>
            <div
              class="talent-menu-item"
              @click="selectTalent('elemental_burst')"
            >
              Elemental Burst
            </div>
            <div class="talent-menu-item" @click="selectTalent('passive1')">
              Passive 1
            </div>
            <div class="talent-menu-item" @click="selectTalent('passive2')">
              Passive 2
            </div>
            <div class="talent-menu-item" @click="selectTalent('passive3')">
              Passive 3
            </div>
          </div>
          <!-- Description -->
          <div class="character-talents-content mt-5 p-5">
            <MarkdownRender :content="currentTalentContent" />
          </div>
        </div>
      </div>

      <!-- Source -->
      <div class="character-source-container">
        <h3 class="divider">Sources</h3>
        <div class="character-source">
          <a class="source-link" :href="character.wiki_url" target="_blank"
            >Hoyo wiki</a
          >
        </div>
      </div>
    </div>

    <!-- Error Message-->
    <div v-else>
      <p>Character not found.</p>
    </div>
  </div>
</template>

<script setup>
// Import the necessary functions and components
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { supabase } from "./../supabaseClient.js";

import "./../css/CharacterDetailPage.css";
import "ldrs/trefoil";
import LoadingSpinner from "./../components/LoadingSpinner.vue"; // Import the loading spinner component
import MarkdownRender from "./../components/MarkdownRender.vue";

const route = useRoute();
const character = ref(null);
const loading = ref(true);

const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

const selectedTalent = ref("normal_attack");

// Function to get cached data from local storage
function getCachedData(key) {
  // const cachedData = localStorage.getItem(key); while dev
  const cachedData = sessionStorage.getItem(key);
  if (!cachedData) return null;

  const { timestamp, data } = JSON.parse(cachedData);
  const now = new Date().getTime();

  if (now - timestamp < CACHE_DURATION) {
    return data;
  } else {
    localStorage.removeItem(key);
    return null;
  }
}

// Function to set cached data in local storage if it doesn't already exist
function setCachedData(key, data) {
  const cache = {
    timestamp: new Date().getTime(),
    data,
  };
  // localStorage.setItem(key, JSON.stringify(cache)); while dev
  sessionStorage.setItem(key, JSON.stringify(cache));
}

// Fetch base character details
async function fetchBaseCharacterDetails(characterId) {
  const { data, error } = await supabase
    .from("characters")
    .select(
      "*, vision:vision(name, image_url), team_role:team_role(name), substat:substat(name), weapon_type:weapon_type(name)"
    )
    .eq("id", characterId)
    .single();

  if (error) throw error;
  return data;
}

// Fetch character regions
async function fetchCharacterRegions(characterId) {
  const { data, error } = await supabase
    .from("region_character")
    .select("region:region_id(id, name, image_url)")
    .eq("character_id", characterId);

  if (error) throw error;
  return data.map((item) => item.region);
}

// Fetch character weapons
async function fetchCharacterWeapons(characterId) {
  const { data, error } = await supabase
    .from("weapon_character")
    .select(
      "rank, weapon:weapon_id(*, bonus_effect:bonus_effect_type_id(name), weapon_type:weapon_type_id(name))"
    )
    .eq("character_id", characterId)
    .order("rank", { ascending: true });

  if (error) throw error;
  return data.map((item) => ({ ...item.weapon, rank: item.rank }));
}

// Fetch character artifacts
async function fetchCharacterArtifacts(characterId) {
  const { data, error } = await supabase
    .from("character_artifact")
    .select("rank, artifact:artifact_id(*)")
    .eq("character_id", characterId)
    .order("rank", { ascending: true });

  if (error) throw error;
  console.log("Fetched artifacts:", data);
  return data.map((item) => ({ ...item.artifact, rank: item.rank }));
}

async function fetchCharacterBuild(characterId) {
  const { data, error } = await supabase
    .from("characterBuild")
    .select("*")
    .eq("character_id", characterId);

  if (error) throw error;
  return data;
}

async function fetchCharacterTalents(characterId) {
  const { data, error } = await supabase
    .from("characterTalents")
    .select(
      `
      id,
      normal_attack_name,
      normal_attack,
      elemental_skill_name,
      elemental_skill,
      elemental_burst_name,
      elemental_burst,
      passive1_name,
      passive1,
      passive2_name,
      passive2,
      passive3_name,
      passive3
    `
    )
    .eq("character_id", characterId)
    .maybeSingle();

  if (error) throw error;

  return data;
}

// Main function to fetch character details
async function fetchCharacterDetails(characterId) {
  const cacheKey = `character-${characterId}`;
  const cachedCharacter = getCachedData(cacheKey);
  if (cachedCharacter) return cachedCharacter;

  try {
    const [characterData, regions, weapons, artifacts, build, talents] =
      await Promise.all([
        fetchBaseCharacterDetails(characterId),
        fetchCharacterRegions(characterId),
        fetchCharacterWeapons(characterId),
        fetchCharacterArtifacts(characterId),
        fetchCharacterBuild(characterId),
        fetchCharacterTalents(characterId),
      ]);

    const result = {
      ...characterData,
      regions,
      weapons,
      artifacts,
      build,
      talents,
    };

    setCachedData(cacheKey, result);
    return result;
  } catch (err) {
    console.error("Error fetching character:", err);
    return null;
  }
}

function formatDate(dateString) {
  if (!dateString) return "Upcoming";
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
}

function flagEmoji(lang) {
  const flagMap = {
    chinese: "🇨🇳",
    english: "🇺🇸",
    japanese: "🇯🇵",
    korean: "🇰🇷",
  };
  return flagMap[lang.toLowerCase()] || "Additional"; // Default to white flag if language not found
}

function formatVoiceActorName(name) {
  return name.includes("&") ? name.replace(/\s*&\s*/g, "<br>& ") : name;
}

function selectTalent(talentName) {
  selectedTalent.value = talentName;
  console.log("Selected talent:", talentName);
}

const currentTalentContent = computed(() => {
  return character.value?.talents?.[selectedTalent.value];
});

onMounted(async () => {
  const characterId = route.params.id;
  loading.value = true;
  character.value = await fetchCharacterDetails(characterId);
  loading.value = false;
});
</script>

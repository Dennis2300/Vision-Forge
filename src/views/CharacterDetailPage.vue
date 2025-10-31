<template>
  <!-- Loading -->
  <div v-if="loading">
    <LoadingSpinner />
  </div>
  <!-- Content -->
  <div
    v-if="character"
    class="character-detail-page relative mt-12 mb-20 rounded-2xl overflow-hidden"
  >
    <!-- Splash Art as Background Image -->
    <div class="absolute top-0 w-full z-0 opacity-10 overflow-hidden">
      <img
        v-if="character.splash_art_url"
        :src="character.splash_art_url"
        :alt="character.name"
        class="w-full"
        loading="lazy"
      />
      <div v-else></div>
    </div>
    <!-- Character Detail Content -->
    <div class="relative z-10">
      <!-- Character Detail -->
      <div
        class="character-detail flex flex-row justify-around items-center pt-16"
      >
        <div class="flex flex-col justify-center items-center">
          <div class="relative">
            <img
              class="vision-avatar absolute -top-8 -left-6 w-16 h-16 p-2"
              :src="character.vision.image_url"
              alt=""
            />
            <div
              :class="{
                'rarity-5': character.rarity === 5,
                'rarity-4': character.rarity === 4,
              }"
            >
              <img
                class="character-avatar w-48 flex items-center justify-center"
                :src="character.avatar_url"
                :alt="character.name"
              />
            </div>
          </div>

          <h1 class="character-detail-name tracking-wide">
            {{ character.name }}
          </h1>
          <div class="divider mx-0 mt-0 mb-1 px-10"></div>
          <div class="flex flex-row gap-3">
            <p class="tags">{{ character.vision.name }}</p>
            <p class="tags">{{ character.weapon_type.name }}</p>
            <p class="tags">{{ character.main_stat.name }}</p>
            <p class="tags">{{ character.released_region.name }}</p>
          </div>
        </div>
        <div
          class="character-detail-item flex flex-col px-5 py-2 rounded-xl justify-around"
        >
          <div class="voice-actor-container">
            <h2 class="divider tracking-wider">Voice Actors</h2>
            <div
              class="flex flex-row justify-around"
              v-if="character.va?.length"
            >
              <!---->
              <div class="flex flex-col gap-2">
                <p v-for="item in sortedGroupedVA" :key="item.code">
                  <span :class="`fi fi-${item.code}`"></span>
                  <strong class="ml-2">{{ item.label }}: </strong>
                </p>
              </div>
              <!---->
              <div class="flex flex-col gap-2">
                <p v-for="item in sortedGroupedVA" :key="item.code">
                  <template v-if="item.actors.length">
                    <template v-for="(a, index) in item.actors" :key="a.id">
                      <template v-if="a.link">
                        <a
                          :href="a.link"
                          target="_blank"
                          rel="noopener"
                          class="link"
                        >
                          {{ a.name }}
                        </a>
                      </template>
                      <template v-else>
                        {{ a.name }}
                      </template>
                      <span v-if="index < item.actors.length - 1"> & </span>
                    </template>
                  </template>
                  <template v-else>
                    <span>No VA</span>
                  </template>
                </p>
              </div>
            </div>

            <div v-else class="text-center">No VA Announced Yet</div>
          </div>

          <div class="flex flex-row">
            <!-- Regions -->
            <div class="w-1/2">
              <h2 class="divider tracking-wider">Regions</h2>

              <div
                v-if="character.regions?.length"
                class="list-view tracking-wide flex flex-col items-center gap-2"
              >
                <p
                  v-for="region in character.regions"
                  :key="region.region_id.id"
                >
                  {{ region.region_id.name }}
                </p>
              </div>
              <div v-else class="text-center">No Regions Revealed</div>
            </div>

            <!-- Affiliation -->
            <div class="w-1/2">
              <h2 class="divider tracking-wider">Affiliation</h2>
              <div
                v-if="character.affiliations?.length"
                class="list-view tracking-wide flex flex-col items-center gap-2"
              >
                <p
                  v-for="affiliation in character.affiliations"
                  :key="affiliation.affiliation_id.id"
                >
                  {{ affiliation.affiliation_id.name }}
                </p>
              </div>
              <div v-else class="text-center">No Affiliations Revealed</div>
            </div>
          </div>
        </div>
      </div>
      <!-- Character Info -->
      <h1 class="divider mt-20 px-32 mb-5 tracking-wide">
        {{ character.name }}'s Information
      </h1>
      <div
        class="character-info flex flex-row justify-between items-center h-72 mx-24 px-5 rounded-2xl gap-24"
      >
        <!--Left-->
        <div class="flex flex-col justify-around w-full h-full">
          <!-- Rarity -->
          <div class="flex flex-col">
            <div class="flex flex-row justify-between">
              <h2 class="font-acme text-gray-500">Rarity:</h2>
              <h2 class="tracking-wide text-yellow-400">
                <span v-for="n in character.rarity" :key="n">★</span>
              </h2>
            </div>
            <div class="divider m-0"></div>
          </div>
          <!-- Cons -->
          <div class="flex flex-col">
            <div class="flex flex-row justify-between">
              <h2 class="font-acme text-gray-500">Constellation:</h2>
              <h2 class="tracking-wide text-tertiary">
                {{ character.constellation }}
              </h2>
            </div>
            <div class="divider m-0"></div>
          </div>
          <!-- Signature Dish-->
          <div class="flex flex-col">
            <div class="flex flex-row justify-between">
              <h2 class="font-acme text-gray-500">Signature Dish:</h2>
              <div
                v-if="character.signature_dish"
                class="flex flex-row gap-2 items-center group relative"
              >
                <!-- Dish Image-->
                <img
                  class="w-fit h-8 cursor-pointer"
                  :src="character.signature_dish.image_url"
                  alt=""
                />

                <!-- Dish Pop up -->
                <div
                  class="dish-pop-up absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex flex-col items-center rounded-lg"
                >
                  <div
                    class="bg-secondary backdrop-blur-md p-2 w-96 h-auto flex flex-col items-center rounded-lg shadow-xl"
                  >
                    <img
                      class="w-48"
                      :src="character.signature_dish.image_url"
                      alt=""
                    />
                    <h3 class="text-center text-tertiary tracking-wide">
                      {{ character.signature_dish.name }}
                    </h3>
                    <div class="divider m-0"></div>
                    <p class="text-center px-5 mb-3">
                      {{ character.signature_dish.description }}
                    </p>
                  </div>
                </div>
                <!-- Dish name-->
                <h2 class="tracking-wide text-tertiary max-w-64 truncate">
                  <a
                    class="link"
                    :href="character.signature_dish.url"
                    target="_blank"
                  >
                    {{ character.signature_dish.name }}
                  </a>
                </h2>
              </div>
              <div v-else>Not Revealed Yet</div>
            </div>

            <div class="divider m-0"></div>
          </div>
        </div>
        <!--Right-->
        <div class="flex flex-col justify-around w-full h-full">
          <div class="flex flex-col">
            <div class="flex flex-row justify-between">
              <h2 class="font-acme text-gray-500">Weapon:</h2>
              <div class="flex flex-row gap-2">
                <h2 class="tracking-wide text-tertiary">
                  {{ character.weapon_type.name }}
                </h2>
                <img
                  class="w-fit h-8"
                  :src="character.weapon_type.image_url"
                  alt=""
                />
              </div>
            </div>
            <div class="divider m-0"></div>
          </div>
          <div class="flex flex-col">
            <div class="flex flex-row justify-between">
              <h2 class="font-acme text-gray-500">Birthday:</h2>
              <h2 class="tracking-wide text-tertiary">
                {{ character.birthday }}
              </h2>
            </div>
            <div class="divider m-0"></div>
          </div>
          <div class="flex flex-col">
            <div class="flex flex-row justify-between">
              <h2 class="font-acme text-gray-500">Date Released:</h2>
              <h2 class="tracking-wide text-tertiary">
                {{
                  new Date(character.release_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                }}
              </h2>
            </div>
            <div class="divider m-0"></div>
          </div>
        </div>
      </div>
      <!-- Character Weapons-->
      <h1 class="divider mt-20 px-32 mb-5 tracking-wide">Best Weapon</h1>
      <div class="w-full h-auto">
        <div
          class="flex flex-row justify-around items-center gap-12 bg-primary mx-24 w-auto py-10 rounded-2xl"
        >
          <router-link
            v-if="character.weapons?.length"
            v-for="weapon in character.weapons"
            :to="`/weapons/${weapon.weapon_id.id}?name=${encodeURIComponent(
              weapon.weapon_id.name
            )}`"
            target="_blank"
            class="weapon-card relative flex flex-col justify-center items-center bg-secondary rounded-2xl py-10 w-72 h-fit no-underline"
          >
            <div class="absolute top-5 left-5">
              <span
                class="relative flex items-center justify-center w-8 h-8 font-acme rounded-full border-2 border-white shadow-md overflow-hidden"
                :class="{
                  'bg-gradient-to-b from-yellow-300 to-yellow-500 text-black animate-shine':
                    weapon.rank === 1,
                  'bg-gradient-to-b from-gray-200 to-gray-400 text-black':
                    weapon.rank === 2,
                  'bg-gradient-to-b from-amber-700 to-amber-900 text-white':
                    weapon.rank === 3,
                }"
              >
                {{ weapon.rank }}
              </span>
            </div>
            <div
              :class="{
                'rarity-5': weapon.weapon_id.rarity === 5,
                'rarity-4': weapon.weapon_id.rarity === 4,
              }"
            >
              <img
                class="w-32 weapon-image rounded-xl"
                :src="weapon.weapon_id.image_url"
                alt=""
              />
            </div>
            <p class="text-tertiary tracking-wide mt-8">
              {{ weapon.weapon_id.name }}
            </p>
          </router-link>
          <div class="tracking-wide" v-else>No Weapons Assigned Yet</div>
        </div>
      </div>
      <!-- Character Artifacts -->
      <h1 class="divider mt-20 px-32 mb-5 tracking-wide">Best Artifacts</h1>
      <div class="w-full h-auto">
        <div
          class="flex flex-row justify-around items-center gap-12 bg-primary mx-24 w-auto py-10 rounded-2xl"
        >
          <div
            class="relative flex flex-col justify-center items-center bg-secondary rounded-2xl py-10 w-72 h-fit"
            v-if="character.artifacts?.length"
            v-for="artifact in character.artifacts"
          >
            <div class="absolute top-5 left-5">
              <span
                class="relative flex items-center justify-center w-8 h-8 font-acme rounded-full border-2 border-white shadow-md overflow-hidden"
                :class="{
                  'bg-gradient-to-b from-yellow-300 to-yellow-500 text-black animate-shine':
                    artifact.rank === 1,
                  'bg-gradient-to-b from-gray-200 to-gray-400 text-black':
                    artifact.rank === 2,
                  'bg-gradient-to-b from-amber-700 to-amber-900 text-white':
                    artifact.rank === 3,
                }"
              >
                {{ artifact.rank }}
              </span>
            </div>

            <div class="artifact-image rounded-xl">
              <img
                class="w-32"
                :src="artifact.artifact_id.flower_img_url"
                alt=""
              />
            </div>
            <p class="text-tertiary tracking-wide mt-8">
              {{ artifact.artifact_id.name }}
            </p>
          </div>
          <div class="tracking-wide" v-else>No Artifacts Assigned Yet</div>
        </div>
      </div>
      <!-- Character Build -->
      <h1 class="divider mt-20 px-32 mb-5 tracking-wide">Build</h1>
      <div class="w-full h-auto">
        <div class="flex flex-row justify-between mx-24 w-auto min-h-96 gap-8">
          <!--Left-->
          <div class="bg-primary w-1/3 rounded-2xl p-6 h-fit">
            <div
              v-if="character.builds?.length"
              v-for="build in character.builds"
            >
              <h2 class="divider mt-0 tracking-wide">Main Stats</h2>
              <div class="flex flex-col gap-8">
                <!-- Sands -->
                <div
                  class="flex flex-row justify-between"
                  v-for="slot of ['sands']"
                  :key="slot"
                >
                  <p class="capitalize">{{ slot }}</p>
                  <p class="text-tertiary tracking-wide">
                    {{
                      build.build_stat
                        .filter((stat) => stat.slot === slot)
                        .map((stat) => stat.stat_id.name)
                        .join(" or ")
                    }}
                  </p>
                </div>
                <!-- Goblet -->
                <div
                  class="flex flex-row justify-between"
                  v-for="slot of ['goblet']"
                  :key="slot"
                >
                  <p class="capitalize">{{ slot }}</p>
                  <p class="text-tertiary tracking-wide">
                    {{
                      build.build_stat
                        .filter((stat) => stat.slot === slot)
                        .map((stat) => stat.stat_id.name)
                        .join(" or ")
                    }}
                  </p>
                </div>
                <!-- Circlet -->
                <div
                  class="flex flex-row justify-between"
                  v-for="slot of ['circlet']"
                  :key="slot"
                >
                  <p class="capitalize">{{ slot }}</p>
                  <p class="text-tertiary tracking-wide">
                    {{
                      build.build_stat
                        .filter((stat) => stat.slot === slot)
                        .map((stat) => stat.stat_id.name)
                        .join(" or ")
                    }}
                  </p>
                </div>
              </div>
              <h2 class="divider mb-0 mt-6">Substats</h2>
              <div
                class="flex flex-col mt-5"
                v-for="stat in build.build_stat.filter(
                  (s) => s.slot === 'substats'
                )"
                :key="stat.id"
              >
                <p class="text-tertiary tracking-wide">
                  {{ stat.stat_id.name }}
                </p>
              </div>
            </div>
            <div v-else class="text-center tracking-wide">No Builds Yet</div>
          </div>
          <!--Right-->
          <div class="bg-primary w-2/3 rounded-2xl p-6">
            <div
              v-if="character.builds?.length"
              v-for="build in character.builds"
            >
              <MarkdownRender :content="build.notes" />
            </div>
            <div class="text-center tracking-wide" v-else>No Build Yet</div>
          </div>
        </div>
      </div>
      <!-- Footer -->
      <div class="divider my-10 px-10"></div>
    </div>
  </div>
</template>

<script setup>
import { supabase } from "@/supabaseClient";
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import "./../css/CharacterDetailPage.css";
import "flag-icons/css/flag-icons.min.css";
import LoadingSpinner from "./../components/LoadingSpinner.vue";
import MarkdownRender from "@/components/MarkdownRender.vue";

const route = useRoute();
const loading = ref(null);
const error = ref(null);

const character = ref(null);
const languages = [
  { label: "English", code: "us" },
  { label: "Japanese", code: "jp" },
  { label: "Chinese", code: "cn" },
  { label: "Korean", code: "kr" },
];

// To Use Later in Production
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

function checkCharacterId() {
  const characterId = route.params.id;
  if (!characterId) {
    error.value = "No character ID found in route.";
    return null; // return null if invalid
  }
  return characterId;
}

async function fetchCharacterById(characterId) {
  loading.value = true;
  try {
    // The Supabase Query
    let query = supabase
      .from("characters")
      .select(
        `
        *,
        signature_dish(id, name, image_url, url, description),
        vision:visions(*),
        main_stat:stats(*),
        weapon_type:weaponTypes(*),
        released_region(id, name),
        va:voiceActors(*, lang(*)),
        regions:character_region(region_id(name, image_url)),
        affiliations:character_affiliation(affiliation_id(name)),
        builds(*, build_stat(*, stat_id(name))),
        artifacts:character_artifact(*, artifact_id(id, name, flower_img_url)),
        weapons:character_weapon(*, weapon_id(id, name, rarity, image_url))
        `
      )
      .eq("id", characterId)
      .single();

    // The Fetch to Supabase
    const { data, error: fetchError } = await query;
    if (fetchError) throw fetchError;

    // Sort Artifacts and Weapons by the rank column
    if (data.artifacts) {
      data.artifacts.sort((a, b) => (a.rank ?? 0) - (b.rank ?? 0));
    }

    if (data.weapons) {
      data.weapons.sort((a, b) => (a.rank ?? 0) - (b.rank ?? 0));
    }

    // Insert the Fetched Data to Character State
    character.value = data;

    // Session Storage for Caching
    sessionStorage.setItem(
      "character",
      JSON.stringify({
        characters: character.value,
      })
    );
  } catch (err) {
    error.value = err.message || "Failed to load character";
  } finally {
    loading.value = false;
  }
}

const groupedVA = computed(() => {
  if (!character.value?.va) return {};

  return character.value.va.reduce((acc, actor) => {
    const code = actor.lang.code;
    if (!acc[code]) acc[code] = [];
    acc[code].push(actor);
    return acc;
  }, {});
});

const sortedGroupedVA = computed(() => {
  return languages.map((lang) => ({
    code: lang.code,
    label: lang.label,
    actors: groupedVA.value[lang.code] || [],
  }));
});

onMounted(async () => {
  const characterId = checkCharacterId();
  if (!characterId) return;
  await fetchCharacterById(characterId);
});
</script>

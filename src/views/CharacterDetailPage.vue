<template>
  <div v-if="loading">
    <LoadingSpinner />
  </div>
  <div
    v-if="character"
    class="character-detail-page relative mt-12 mb-20 rounded-2xl overflow-hidden"
  >
    <!-- Splash Art as Background Image -->
    <div class="absolute top-0 w-full z-0 opacity-5 overflow-hidden">
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
          <div>
            <h2 class="divider tracking-wider">Voice Actors</h2>
            <div
              class="text-center flex flex-row justify-center gap-6"
              v-if="character.va"
            >
              <div class="lang tracking-wider text-left flex flex-col gap-2">
                <p v-for="lang in languages" :key="lang.name">
                  <span :class="`fi fi-${lang.code}`"></span> -
                  {{ lang.label }}:
                </p>
              </div>

              <div class="va tracking-wider text-left flex flex-col gap-2">
                <a
                  class="link"
                  v-for="key in va_key"
                  :key="key"
                  :href="character.va[key.replace('_name', '_link')]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {{ character.va[key] }}
                </a>
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
          <div class="flex flex-col">
            <div class="flex flex-row justify-between">
              <h2 class="font-acme text-gray-500">Rarity:</h2>
              <h2 class="tracking-wide text-yellow-400">
                <span v-for="n in character.rarity" :key="n">★</span>
              </h2>
            </div>
            <div class="divider m-0"></div>
          </div>
          <div class="flex flex-col">
            <div class="flex flex-row justify-between">
              <h2 class="font-acme text-gray-500">Constellation:</h2>
              <h2 class="tracking-wide text-tertiary">
                {{ character.constellation }}
              </h2>
            </div>
            <div class="divider m-0"></div>
          </div>
          <div class="flex flex-col">
            <!-- Signature Dish-->
            <div class="flex flex-row justify-between">
              <h2 class="font-acme text-gray-500">Signature Dish:</h2>
              <div
                v-if="character.signature_dish"
                class="flex flex-row gap-2 items-center group relative"
              >
                <img
                  class="w-fit h-8 cursor-pointer"
                  :src="character.signature_dish.image_url"
                  alt=""
                />
                <div
                  class="dish-pop-up absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex flex-col items-center rounded-lg"
                >
                  <div
                    class="bg-secondary backdrop-blur-md p-2 rounded-lg shadow-xl"
                  >
                    <img
                      class="w-36 h-auto"
                      :src="character.signature_dish.image_url"
                      alt=""
                    />
                  </div>
                </div>

                <h2 class="tracking-wide text-tertiary">
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
      <!-- Character Artifacts -->
      <h1 class="divider mt-20 px-32 mb-5 tracking-wide">Artifacts</h1>
      <div class="w-full h-auto">
        <div
          class="flex flex-row justify-around items-center gap-12 bg-primary mx-24 w-auto h-72 rounded-2xl"
        >
          <div
            class="relative flex flex-col justify-center items-center bg-secondary rounded-2xl pt-2 pb-5 w-72"
            v-for="artifact in character.artifacts"
          >
            <span class="absolute top-3 left-3 bg-primary py-1 px-2 rounded-full">{{ artifact.rank }}</span>
            <img
              class="w-32"
              :src="artifact.artifact_id.flower_img_url"
              alt=""
            />
            <p class="text-tertiary tracking-wide">
              {{ artifact.artifact_id.name }}
            </p>
          </div>
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
                <!-- Goblet -->
                <div
                  class="flex flex-row justify-between"
                  v-for="stat in build.build_stat.filter(
                    (s) => s.slot === 'goblet'
                  )"
                  :key="stat.id"
                >
                  <p class="capitalize">{{ stat.slot }}</p>
                  <p class="text-tertiary tracking-wide">
                    {{ stat.stat_id.name }}
                  </p>
                </div>
                <!-- Sands -->
                <div
                  class="flex flex-row justify-between"
                  v-for="stat in build.build_stat.filter(
                    (s) => s.slot === 'sands'
                  )"
                  :key="stat.id"
                >
                  <p class="capitalize">{{ stat.slot }}</p>
                  <p class="text-tertiary tracking-wide">
                    {{ stat.stat_id.name }}
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
                class="flex flex-col mt-2"
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
            <div v-else class="text-center">No Builds Yet</div>
          </div>
          <!--Right-->
          <div class="bg-primary w-2/3 rounded-2xl p-6">
            <div
              v-if="character.builds?.length"
              v-for="build in character.builds"
            >
              {{ build.notes }}
            </div>
            <div class="text-center" v-else>No Build Yet</div>
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
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import "./../css/CharacterDetailPage.css";
import "flag-icons/css/flag-icons.min.css";
import LoadingSpinner from "./../components/LoadingSpinner.vue";

const route = useRoute();
const loading = ref(null);
const error = ref(null);

const character = ref(null);
const va_key = ref(["en_name", "jp_name", "cn_name", "kr_name"]);
const languages = [
  { label: "English", code: "us" },
  { label: "Japanese", code: "jp" },
  { label: "Chinese", code: "cn" },
  { label: "Korean", code: "kr" },
];

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
    let query = supabase
      .from("characters")
      .select(
        `
        *,
        signature_dish(*),
        vision:visions(*),
        main_stat:stats(*),
        weapon_type:weaponTypes(*),
        released_region(id, name),
        va:voiceActors(*),
        regions:character_region(region_id(name, image_url)),
        affiliations:character_affiliation(affiliation_id(name)),
        builds(*, build_stat(*, stat_id(name))),
        artifacts:character_artifact(*, artifact_id(*))
        `
      )
      .eq("id", characterId)
      .single()
      .order("rank", { foreignTable: "character_artifact", ascending: true });
    const { data, error: fetchError } = await query;
    if (fetchError) throw fetchError;
    data.va = data.va?.[0] || null;
    character.value = data;
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

onMounted(async () => {
  const characterId = checkCharacterId();
  if (!characterId) return;
  await fetchCharacterById(characterId);
  console.log("Character fetched:", character.value);
});
</script>

<template>
  <LoadingSpinner v-if="loading" />
  <main v-else-if="character">
    <div
      class="w-[1400px] min-h-full bg-secondary relative mb-20 rounded-2xl overflow-hidden"
    >
      <CharacterSplashArt :character="character" />
      <section class="relative z-10">
        <article class="min-h-[350px]">
          <div class="mx-24 pt-10 flex flex-row">
            <CharacterBasicInfo
              class="w-1/2 h-[350px]"
              :character="character"
            />
            <div
              class="w-1/2 flex flex-col bg-primary justify-around px-4 rounded-2xl"
            >
              <CharacterVoiceActors :character="character" />
              <div class="flex flex-row">
                <CharacterRegions :character="character" />
                <CharacterAffiliation :character="character" />
              </div>
            </div>
          </div>
        </article>
        <!-- <article class="bg-primary min-h-[350px] mx-24">
          <CharacterBasicInfo class="w-1/2 h-[350px] ml-24" :character="character" />
          <div class="w-1/2 h-[350px]">
            <div class="bg-primary h-full mr-24 rounded-2xl flex flex-col justify-around px-8 pb-2">
              <CharacterVoiceActors :character="character" />
              <div class="flex flex-row">
                <CharacterRegions :character="character" />
                <CharacterAffiliation :character="character" />
              </div>
            </div>
          </div>
        </article> -->

        <CharacterInfo :character="character" />
        <div class="w-full h-auto mt-20 mb-5 flex flex-row gap-8">
          <CharacterWeapons :character="character" />
          <CharacterArtifacts :character="character" />
        </div>
        <CharacterBuild :character="character" />
        <CharacterMaterials :character="character" />
        <!-- Footer -->
        <div class="divider my-10 px-10"></div>
      </section>
    </div>
    <div
      class="fixed bottom-6 right-6 btn btn-soft btn-info px-4"
      @click="scrollToTop"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-arrow-up"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"
        />
      </svg>
    </div>
  </main>
  <CharacterNotFound v-else />
</template>

<script setup>
import { supabase } from "@/supabaseClient";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import "./../css/CharacterDetailPage.css";
import "flag-icons/css/flag-icons.min.css";

// Page Loading component
import LoadingSpinner from "../components/Loadings/LoadingSpinner.vue";

// Character Detail Components
import CharacterSplashArt from "@/components/CharacterDetail/CharacterSplashArt.vue";
import CharacterBasicInfo from "@/components/CharacterDetail/CharacterBasicInfo.vue";
import CharacterRegions from "@/components/CharacterDetail/CharacterRegions.vue";
import CharacterAffiliation from "@/components/CharacterDetail/CharacterAffiliation.vue";
import CharacterInfo from "@/components/CharacterDetail/CharacterInfo.vue";
import CharacterWeapons from "@/components/CharacterDetail/CharacterWeapons.vue";
import CharacterArtifacts from "@/components/CharacterDetail/CharacterArtifacts.vue";
import CharacterBuild from "@/components/CharacterDetail/CharacterBuild.vue";
import CharacterMaterials from "@/components/CharacterDetail/CharacterMaterials.vue";
import CharacterVoiceActors from "@/components/CharacterDetail/CharacterVoiceActors.vue";
import CharacterNotFound from "@/components/CharacterDetail/CharacterNotFound.vue";

const route = useRoute();
const loading = ref(null);
const error = ref(null);

const character = ref(null);

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
        builds(*, build_stat(*, stat_id(name), rank)),
        artifacts:character_artifact(*, artifact_id(id, name, two_piece(name), four_piece, flower_img_url)),
        weapons:character_weapon(*, weapon_id(id, name, rarity, base_attack, image_url, bonus_effect_type(name), bonus_effect_value)),
        ascension_mats:character_ascension(*, materials_ascension_id(name, img_url)),
        exp_mats:character_exp(*, materials_exp_id(name, img_url)),
        level_up_mats:character_level_up(*, materials_level_up_id(name, img_url)),
        talent_mats:character_talent(*, materials_talent_id(name, img_url)),
        enhancement_mats:character_enhancement(*, materials_enhancement_id(name, img_url)),
        local_specialty:character_local_specialty(*, local_specialty_id(name, img_url))
      `,
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
      }),
    );
  } catch (err) {
    error.value = err.message || "Failed to load character";
  } finally {
    loading.value = false;
    console.log(character);
  }
}

const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (!el) return;

  el.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

onMounted(async () => {
  const characterId = checkCharacterId();
  if (!characterId) return;
  await fetchCharacterById(characterId);
});
</script>

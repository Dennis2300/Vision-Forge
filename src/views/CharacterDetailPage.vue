<template>
  <LoadingSpinner v-if="loading" />
  <main
    class="character-detail-page relative mt-12 mb-20 rounded-2xl overflow-hidden"
    v-else-if="character"
  >
    <CharacterSplashArt :character="character" />
    <section class="relative z-10">
      <!-- Character Detail -->
      <article
        class="character-detail flex flex-row justify-around items-center pt-16"
      >
        <CharacterBasicInfo :character="character" />
        <!-- Character Metadata (VA, Regions, Affiliation) -->
        <div
          class="character-detail-item flex flex-col px-5 py-2 rounded-xl justify-around"
        >
          <CharacterVoiceActors :character="character" />
          <div class="flex flex-row">
            <CharacterRegions :character="character" />
            <CharacterAffiliation :character="character" />
          </div>
        </div>
      </article>

      <CharacterInfo :character="character" />
      <CharacterWeapons :character="character" />
      <CharacterArtifacts :character="character" />
      <CharacterBuild :character="character" />
      <CharacterMaterials :character="character" />
      <!-- Footer -->
      <div class="divider my-10 px-10"></div>
    </section>
  </main>
  <CharacterNotFound v-else />
</template>

<script setup>
import { supabase } from "@/supabaseClient";
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import "./../css/CharacterDetailPage.css";
import "flag-icons/css/flag-icons.min.css";

// Page Loading component
import LoadingSpinner from "./../components/LoadingSpinner.vue";

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
        weapons:character_weapon(*, weapon_id(id, name, rarity, image_url)),
        materials:character_materials(*, materials_id(*), mat_type(*))
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

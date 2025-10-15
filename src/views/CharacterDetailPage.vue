<template>
  <div
    v-if="character"
    class="character-detail-page relative my-20 rounded-xl overflow-hidden"
  >
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

    <div class="relative z-10">
      <!-- Avatar and VA info -->
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
            <img
              class="character-avatar w-48"
              :src="character.avatar_url"
              :alt="character.name"
            />
          </div>

          <h1 class="character-detail-name tracking-wide">
            {{ character.name }}
          </h1>
          <div class="divider mx-0 mt-0 mb-1 px-16"></div>
          <div class="flex flex-row gap-3">
            <p class="tags">{{ character.vision.name }}</p>
            <p class="tags">{{ character.weapon_type.name }}</p>
            <p class="tags">{{ character.main_stat.name }}</p>
            <p class="tags">{{ character.released_region.name }}</p>
          </div>
        </div>
        <div
          class="character-info flex flex-col px-5 py-2 rounded-xl justify-around"
        >
          <div>
            <h2 class="divider tracking-wider">Voice Actors</h2>
            <div class="text-center flex flex-row justify-center gap-6">
              <div class="lang tracking-wider text-left flex flex-col gap-2">
                <p v-for="lang in languages" :key="lang.name">
                  <span :class="`fi fi-${lang.code}`"></span>
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
          </div>
          <div class="flex flex-row mb-10">
            <div class="w-1/2">
              <h2 class="divider tracking-wider">Regions</h2>
              <div class="text-center">
                <p>Mondstadt</p>
                <p>Mondstadt</p>
                <p>Mondstadt</p>
              </div>
            </div>
            <div class="w-1/2">
              <h2 class="divider tracking-wider">Affiliation</h2>
              <div class="text-center">
                <p>Fatui</p>
                <p>Fatui</p>
                <p>Fatui</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { supabase } from "@/supabaseClient";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import "./../css/CharacterDetailPage.css";
import "flag-icons/css/flag-icons.min.css";

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
        vision:visions(id, name, image_url),
        main_stat:stats(id, name),
        weapon_type:weaponTypes(id, name),
        released_region(id, name),
        va:voiceActors(*)
        `
      )
      .eq("id", characterId)
      .single();
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

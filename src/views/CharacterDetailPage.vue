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
      <div class="character-detail flex flex-row justify-around items-center">
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
          <div class="divider mx-0 mt-0 mb-1"></div>
          <div class="flex flex-row gap-3">
            <p class="tags">{{ character.vision.name }}</p>
            <p class="tags">{{ character.weapon_type.name }}</p>
            <p class="tags">{{ character.main_stat.name }}</p>
            <p class="tags">{{ character.released_region.name }}</p>
          </div>
        </div>
        <div>VA-REGION-AFF</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { supabase } from "@/supabaseClient";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import "./../css/CharacterDetailPage.css";

const route = useRoute();
const loading = ref(null);
const error = ref(null);

const character = ref(null);

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
        "*, vision:visions(id, name, image_url), main_stat:stats(id, name), weapon_type:weaponTypes(id, name), released_region(id, name)"
      )
      .eq("id", characterId)
      .single();
    const { data, error: fetchError } = await query;
    if (fetchError) throw fetchError;
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

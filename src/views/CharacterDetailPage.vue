<template>
  <h1>Character Detail Page</h1>
</template>

<script setup>
import { supabase } from "@/supabaseClient";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const loading = ref(null);
const error = ref(null);

const character = ref([]);

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
        "*, vision:visions(id, name, image_url), main_stat:stats(id, name), weapon_type:weaponTypes(id, name)"
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

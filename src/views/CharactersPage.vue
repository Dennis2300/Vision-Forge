<template>
  <div class="mt-10">
    <div v-for="character in characters">
      <h1>{{ character.name }}</h1>
      <div v-for="region in character.regions">
        <p>{{ region.region_id.name }}</p>
      </div>
      <div v-for="affiliation in character.affiliations">
        <p>{{ affiliation.affiliation_id.name }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "./../supabaseClient.js";

const error = ref(null);
const characters = ref([]);

async function fetchCharacters() {
  console.log("fetching characters");
  try {
    let query = supabase.from("characters").select(`*, 
      regions:character_region(region_id(name)),
      affiliations:character_affiliation(affiliation_id(name))
      `);

    const { data, error: supabaseError } = await query;
    if (supabaseError) throw supabaseError;
    characters.value = data;
    console.log(characters.value);
  } catch (err) {
    error.value = err.message || "Failed to load characters";
    console.error(error.value);
  }
}

onMounted(() => {
  fetchCharacters();
});
</script>

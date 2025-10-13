<template>
  <div class="character-page-container mt-10 flex gap-16">
    <!--Offset-->
    <div class="character-page-offset">
      <h1>Offset</h1>
    </div>
    <!--Main-->
    <div class="character-main-content">
      <h1>Main</h1>
      <div
        class="character-card flex flex-col m-3"
        v-for="character in characters"
      >
        <div class="card-top px-5 rounded-t-lg flex flex-row">
          <div class="flex flex-row items-center gap-5">
            <img
              class="character-avatar"
              :class="{
                'rarity-5': character.rarity === 5,
                'rarity-4': character.rarity === 4,
              }"
              :src="character.avatar_url"
              alt=""
            />
            <h1 class="character-page-name tracking-wide">{{ character.name }}</h1>
          </div>
          <img
            class="character-splash-art"
            :src="character.splash_art_url"
            alt=""
          />
        </div>
        <div class="card-bottom px-5 rounded-b-lg">Bottom</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "./../supabaseClient.js";
import "./../css/CharacterPage.css";

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

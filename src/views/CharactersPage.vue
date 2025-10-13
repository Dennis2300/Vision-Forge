<template>
  <div class="character-page-container mt-10">
    <div class="character-page-header">
      <h1 class="text-center">Character Archive</h1>
    </div>
    <div class="character-page mt-10 flex gap-16">
      <!--Offset-->
      <div class="character-page-offset">
        <h1>Offset</h1>
      </div>
      <!--Main-->
      <div class="character-main-content flex flex-col gap-10">
        <!--Character Card-->
        <div
          class="character-card flex flex-col mx-3"
          v-for="character in characters"
        >
          <!--Card Top-->
          <div class="card-top px-5 rounded-t-xl flex flex-row">
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
              <h1 class="character-page-name tracking-wide">
                {{ character.name }}
              </h1>
            </div>
            <img
              class="character-splash-art"
              :src="character.splash_art_url"
              alt=""
            />
          </div>
          <!--Card Bottom-->
          <div
            class="card-bottom px-5 rounded-b-xl flex flex-row justify-between"
          >
            <div class="flex flex-row items-center gap-5">
              <img
                class="vision-image p-1"
                :src="character.vision.image_url"
                alt=""
              />
              <div class="tags flex flex-row gap-5">
                <p>{{ character.weaponTypes.name }}</p>
                <p>{{ character.role.name }}</p>
                <p>{{ character.main_stat.name }}</p>
              </div>
            </div>
            <div class="flex items-center">
              <div class="release-wrapper flex flex-row gap-1">
                <p class="release-text">Released:</p>
                <p>
                  {{
                    new Date(character.release_date).toLocaleDateString(
                      "gb-GB",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      }
                    )
                  }}
                </p>
              </div>
            </div>
          </div>
        </div>
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
    let query = supabase
      .from("characters")
      .select(
        `*, 
    regions:character_region(region_id(id, name)),
    vision(id, name, image_url),
    weaponTypes(id, name),
    role(name),
    main_stat(id, name)
  `
      )
      .order("release_date", { ascending: false });

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

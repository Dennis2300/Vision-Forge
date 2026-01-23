<template>
  <article class="w-screen h-screen flex justify-center items-center">
    <LoadingSpinner v-if="loading && !weapon" />
    <div v-if="weapon" class="bg-secondary h-2/3 w-2/3 rounded-2xl p-8">
      <div class="flex flex-row gap-4 items-center">
        <div
          :class="{
            'rarity-5': weapon.rarity === 5,
            'rarity-4': weapon.rarity === 4,
            'rarity-3': weapon.rarity === 3,
          }"
          class="w-36 h-36 rounded-2xl"
        >
          <img class="w-full h-full" :src="weapon.image_url" alt="" />
        </div>
        <div class="flex flex-col gap-1 justify-around">
          <h1>{{ weapon.name }}</h1>
          <h3 class="flex items-center gap-1 text-yellow-400 bg-primary rounded-lg w-fit px-2">
            <span v-for="n in weapon.rarity" :key="n" class="text-xl"> ★ </span>
          </h3>

          <h3>
            <strong class="text-gray-500">Type:</strong> {{ weapon.type.name }}
          </h3>
          <h3>
            <strong class="text-gray-500">Bonus Effect:</strong>
            {{ weapon.bonus_effect_value }}%
            {{ weapon.bonus_effect_type.name }}
          </h3>
          <h3>
            <strong class="text-gray-500">Source:</strong>
            {{ weapon.source?.name || "Unknown" }}
          </h3>
        </div>
      </div>
      <div class="divider m-0"></div>
      <p class="p-4 tracking-wide text-base/6">
        {{ weapon.common_describe }}
      </p>
      <div class="bg-primary p-6 rounded-xl">
        <h1 class="divider font-acme">Attribute</h1>
        <MarkdownRender :content="weapon.attribute" class="pt-4" />
      </div>
    </div>
  </article>
</template>

<script setup>
import { supabase } from "./../supabaseClient.js";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

import LoadingSpinner from "../components/Loadings/LoadingSpinner.vue";
import MarkdownRender from "@/components/MarkdownRender.vue";

const route = useRoute();
const loading = ref(true);
const error = ref(null);

const weapon = ref(null);

function checkWeaponId() {
  const weaponId = route.params.id;
  if (!weaponId) {
    error.value = "No Weapon ID founnd in route";
    return null;
  }
  return weaponId;
}

async function fetchWeaponById(weaponId) {
  try {
    let query = supabase
      .from("weapons")
      .select("*, type(name, image_url), bonus_effect_type(name), source(name)")
      .eq("id", weaponId)
      .single();
    const { data, error: fetchError } = await query;
    if (fetchError) throw fetchError;
    weapon.value = data;
    console.log(weapon.value);
  } catch (err) {
    error.value = err.message || "Failed to load weapon";
  } finally {
  }
}

onMounted(async () => {
  const weaponId = checkWeaponId();
  if (!weaponId) return;
  await fetchWeaponById(weaponId);
});
</script>

<style scoped>
.rarity-5 {
  background: linear-gradient(145deg, #e7944a, #b56a2b);
  box-shadow:
    0px 0px 15px rgba(231, 148, 74, 0.8),
    0px 0px 30px rgba(231, 148, 74, 0.5);
}

.rarity-4 {
  background: linear-gradient(145deg, #9b72d5, #7149a3);
  box-shadow:
    0px 0px 15px rgba(155, 114, 213, 0.8),
    0px 0px 30px rgba(155, 114, 213, 0.5);
}

.rarity-3 {
  background: linear-gradient(145deg, #567496, #3a77b1);
  box-shadow:
    0px 0px 15px rgba(86, 116, 150, 0.8),
    0px 0px 30px rgba(86, 116, 150, 0.5);
}
</style>

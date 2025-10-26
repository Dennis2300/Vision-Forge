<template>
  <div v-if="loading">
    <LoadingSpinner />
  </div>
  <div class="weapon-detail-page my-5 bg-secondary mt-10 rounded-2xl" v-else>
    <!--Header-->
    <div class="flex justify-around items-center h-96 w-full">
      <div class="w-1/2 h-full flex flex-col justify-center items-center">
        <div
          :class="{
            'rarity-5': weapon.rarity === 5,
            'rarity-4': weapon.rarity === 4,
          }"
        >
          <img
            class="weapon-image w-48 rounded-xl"
            :src="weapon.image_url"
            alt=""
          />
        </div>
        <div class="divider px-48"></div>
        <h1 class="font-acme">{{ weapon.name }}</h1>
      </div>
      <div class="w-1/2 h-full flex flex-col justify-center items-center gap-5">
        <div class="bg-primary w-3/4 h-3/4 p-8 text-tertiary rounded-xl overflow-scroll">
          <h1 class="text-center uppercase tracking-wide">Details</h1>
          <div class="divider m-0"></div>
          <h3>
            <strong class="text-gray-500">Type:</strong> {{ weapon.type.name }}
          </h3>
          <div class="divider m-0"></div>
          <h3>
            <strong class="text-gray-500">Bonus Effect:</strong>
            {{ weapon.bonus_effect_type.name }}
          </h3>
          <div class="divider m-0"></div>
          <h3>
            <strong class="text-gray-500">Value:</strong>
            {{ weapon.bonus_effect_value }}%
          </h3>
          <div class="divider m-0"></div>
          <h3>
            <strong class="text-gray-500">Source:</strong>
            {{ weapon.source.name }}
          </h3>
          <div class="divider m-0"></div>
          <p class="text-white">{{ weapon.common_describe }}</p>
        </div>
      </div>
    </div>
    <!--Content-->
    <div>
      <h1>Content</h1>
    </div>
  </div>
</template>

<script setup>
import { supabase } from "./../supabaseClient.js";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

import LoadingSpinner from "./../components/LoadingSpinner.vue";

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
    loading.value = false;
  }
}

onMounted(async () => {
  const weaponId = checkWeaponId();
  if (!weaponId) return;
  await fetchWeaponById(weaponId);
});
</script>

<style scoped>
.weapon-detail-page {
  width: 1400px;
  min-height: 100vh;
}

.weapon-image .rarity-4 {
  background: linear-gradient(145deg, #e7944a, #b56a2b);
  box-shadow: 0px 0px 15px rgba(231, 148, 74, 0.8),
    0px 0px 30px rgba(231, 148, 74, 0.5);
}
.weapon-image .rarity-5 {
  background: linear-gradient(145deg, #9b72d5, #7149a3);
  box-shadow: 0px 0px 15px rgba(155, 114, 213, 0.8),
    0px 0px 30px rgba(155, 114, 213, 0.5);
}
</style>

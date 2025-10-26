<template>
  <div v-if="loading">
    <LoadingSpinner />
  </div>
  <div v-else>
    <h1>Weapons Page</h1>
    <h2>{{ weapon.name }}</h2>
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
      .select("*")
      .eq("id", weaponId)
      .single();
    const { data, error: fetchError } = await query;
    if (fetchError) throw fetchError;
    weapon.value = data;
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

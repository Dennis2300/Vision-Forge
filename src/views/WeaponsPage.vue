<template>
  <div>
    <!---->
    <div v-if="loading">
      <LoadingSpinner />
    </div>
    <!---->
    <div v-else>
      <h1>Weapon page</h1>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "./../supabaseClient.js";
import LoadingSpinner from "./../components/LoadingSpinner.vue";

const loading = ref(false);
const error = ref(null);

const weapons = ref([]);

async function fetchAllWeapons() {
  try {
    let query = supabase.from("weapons").select("*");
    const { data, error: fetchError } = await query;
    if (fetchError) throw fetchError;
    weapons.value = data;
    console.log(weapons.value);
  } catch (err) {
    error.value = err.message || "Failed to fetch weapons";
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  loading.value = true;
  fetchAllWeapons();
});
</script>

<style scoped></style>

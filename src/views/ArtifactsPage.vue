<template>
  <!--Loader-->
  <div v-if="loading">
    <LoadingSpinner />
  </div>
  <!--Content-->
  <div class="artifacts-page" v-else>
    <!--Header-->
    <div class="flex flex-col justify-center items-center mt-10">
      <h1 class="divider tracking-wider px-32">Artifacts Archive</h1>
    </div>
    <!--Content-->
    <div class="grid grid-cols-3 gap-3">
      <div v-for="artifact in artifacts">
        <p>{{ artifact.name }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "./../supabaseClient.js"; // Import the Supabase client
import LoadingSpinner from "./../components/LoadingSpinner.vue"; // Import the loading spinner component
import ErrorComponent from "./../components/ErrorComponent.vue"; // Import the error component

const loading = ref(true);
const error = ref(null);

const artifacts = ref([]);

async function getAllArtifacts() {
  try {
    let query = supabase.from("artifacts").select("id, name, flower_img_url");
    const { data, error: fetchError } = await query;
    if (fetchError) throw fetchError;
    console.log(data[0]);
    artifacts.value = data;
  } catch (err) {
    error.value = err.message || "Failed to load characters";
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  getAllArtifacts();
});
</script>

<style scoped>
.artifacts-page {
  width: 1300px;
  min-height: 100vh;
}
</style>

<template>
  <!-- Loader -->
  <div v-if="loading">
    <LoadingSpinner />
  </div>

  <!-- Content -->
  <div v-else class="artifacts-page mb-24">
    <!-- Header -->
    <div class="flex flex-col justify-center items-center mt-10">
      <h1 class="divider tracking-wider px-32">Artifacts Archive</h1>
    </div>

    <!-- Artifacts Grid -->
    <div class="mt-8">
      <div class="grid grid-cols-3 gap-8">
        <template v-for="artifact in artifacts" :key="artifact.id">
          <div
            class="text-center bg-secondary px-8 py-4 rounded-xl cursor-pointer hover:shadow-lg transition-all duration-200"
            @click="toggleArtifact(artifact.id)"
          >
            <img class="w-32 mx-auto" :src="artifact.flower_img_url" alt="" />
            <h3 class="w-full truncate tracking-wide font-acme mt-2">
              {{ artifact.name }}
            </h3>
          </div>
        </template>
      </div>
    </div>

    <!-- Popup Overlay -->
    <transition name="fade">
      <div
        v-if="expandedArtifact"
        class="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
        @click.self="closeArtifact"
      >
        <div class="bg-primary w-[800px] h-[600px] p-6 rounded-xl relative">
          <div
            class="absolute top-5 right-5 text-black hover:text-red-500 text-xl cursor-pointer px-2 rounded-full bg-tertiary"
            @click="closeArtifact"
          >
            ✕
          </div>

          <!-- Find the selected artifact -->
          <div v-if="selectedArtifact">
            <h1 class="text-4xl font-acme tracking-wide">
              {{ selectedArtifact.name }}
            </h1>
            <div class="flex flex-row justify-center items-center w-[90%] mt-8">
              <img
                class="w-24 mx-auto mb-4"
                :src="selectedArtifact.flower_img_url"
                alt=""
              />
              <img
                class="w-24 mx-auto mb-4"
                :src="selectedArtifact.plume_img_url"
                alt=""
              />
              <img
                class="w-24 mx-auto mb-4"
                :src="selectedArtifact.sands_img_url"
                alt=""
              />
              <img
                class="w-24 mx-auto mb-4"
                :src="selectedArtifact.goblet_img_url"
                alt=""
              />
              <img
                class="w-24 mx-auto mb-4"
                :src="selectedArtifact.circlet_img_url"
                alt=""
              />
            </div>
            <div class="divider m-0"></div>
            <div class="px-10">
              <div class="my-4">
                <h2 class="mb-2 text-tertiary">2 Piece Set Bonus</h2>
                <p>{{ selectedArtifact.two_piece.name }}</p>
              </div>
              <div class="my-4">
                <h2 class="mb-2 text-tertiary">4 Piece Set Bonus</h2>
                <p>{{ selectedArtifact.four_piece }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { supabase } from "./../supabaseClient.js";
import LoadingSpinner from "./../components/LoadingSpinner.vue";

const loading = ref(true);
const error = ref(null);
const artifacts = ref([]);
const expandedArtifact = ref(null);

async function getAllArtifacts() {
  try {
    const { data, error: fetchError } = await supabase
      .from("artifacts")
      .select("*, two_piece:twoPieceSets(name)");
    if (fetchError) throw fetchError;
    artifacts.value = data;
  } catch (err) {
    error.value = err.message || "Failed to load artifacts";
  } finally {
    loading.value = false;
  }
}

onMounted(getAllArtifacts);

function toggleArtifact(id) {
  expandedArtifact.value = expandedArtifact.value === id ? null : id;
}

function closeArtifact() {
  expandedArtifact.value = null;
}

const selectedArtifact = computed(() =>
  artifacts.value.find((a) => a.id === expandedArtifact.value)
);
</script>

<style scoped>
.artifacts-page {
  width: 1200px;
  min-height: 100vh;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

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
      <div class="grid grid-cols-4 gap-8">
        <template v-for="artifact in artifacts" :key="artifact.id">
          <div
            class="artifact-card text-center bg-secondary px-8 py-4 rounded-xl cursor-pointer hover:shadow-lg transition-all duration-200"
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
        <div
          class="bg-primary w-[800px] h-[600px] p-6 rounded-xl relative overflow-y-scroll"
        >
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
import LoadingSpinner from "../components/Loadings/LoadingSpinner.vue";

const loading = ref(true);
const error = ref(null);
const artifacts = ref([]);
const expandedArtifact = ref(null);

function cache(key, data = null, ttl = 24 * 60 * 60 * 1000) {
  const now = new Date().getTime();
  if (data) {
    const item = {
      data,
      expiry: now + ttl,
    };
    localStorage.setItem(key, JSON.stringify(item));
    return data;
  } else {
    const cachedItem = localStorage.getItem(key);
    if (!cachedItem) return null;

    const parsedItem = JSON.parse(cachedItem);
    if (now > parsedItem.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return parsedItem.data;
  }
}

function toggleArtifact(id) {
  expandedArtifact.value = expandedArtifact.value === id ? null : id;
}

function closeArtifact() {
  expandedArtifact.value = null;
}

async function getAllArtifacts() {
  try {
    const cached = cache("artifacts");
    if (cached) {
      artifacts.value = cached;
      return;
    }
    const { data, error: fetchError } = await supabase
      .from("artifacts")
      .select("*, two_piece:twoPieceSets(name)");
    if (fetchError) throw fetchError;
    cache("artifacts", data);
    artifacts.value = data;
  } catch (err) {
    error.value = err.message || "Failed to load artifacts";
  } finally {
    loading.value = false;
  }
}

const selectedArtifact = computed(() =>
  artifacts.value.find((a) => a.id === expandedArtifact.value)
);

onMounted(() => {
  getAllArtifacts();
});
</script>

<style scoped>
.artifacts-page {
  width: 1200px;
  min-height: 100vh;
}

.artifact-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
}

.artifact-card:hover {
  background: var(--filter-color-hover);
  transform: translateY(-6px) scale(1.03);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
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

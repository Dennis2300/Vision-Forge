<template>
  <main>
    <LoadingSpinner v-if="loading" />
    <section class="w-[1400px] min-h-screen mt-10" v-else>
      <h1 class="text-center">Current Banners</h1>
      <article class="flex flex-row justify-around mt-10">
        <div class="space-y-6">
          <h2 class="text-2xl font-bold">Current 5 STAR Increased Drop Rate</h2>
          <div v-for="banner in fiveStarBanners" :key="banner.id">
            <div class="bg-secondary px-8 py-2">
              <div class="flex flex-row items-center">
                <img class="w-32" :src="banner.character.avatar_url" alt="" />
                <h1>{{ banner.character.name }}</h1>
              </div>
              <div class="flex flex-row">
                <p>Sword</p>
                <p>Sword</p>
                <p>Sword</p>
                <p>Sword</p>
              </div>
            </div>
          </div>
        </div>

        <div class="space-y-6">
          <h2 class="text-2xl font-bold">Current 4 STAR Increased Drop Rate</h2>
          <div v-for="banner in fourStarBanners" :key="banner.id">
            <div class="bg-secondary px-8 py-2">
              <h1>{{ banner.character.name }}</h1>
            </div>
          </div>
        </div>
      </article>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { supabase } from "./../supabaseClient.js";
import LoadingSpinner from "@/components/Loadings/LoadingSpinner.vue";

const currentBanners = ref([]);
const loading = ref(true);
const error = ref(null);

async function getCurrentBanners() {
  console.log("Called getCurrentBanners");
  try {
    let query = supabase
      .from("currentBanners")
      .select(
        "*, character:character_id(id, name, rarity, avatar_url, splash_art_url)"
      );
    const { data, error: fetchError } = await query;
    if (fetchError) throw fetchError;
    currentBanners.value = data;
  } catch (err) {
    console.error("Error fetching The Current Banners", err);
    error.value = err.message || "Failed to load Current Banners";
  } finally {
    loading.value = false;
  }
}

const fiveStarBanners = computed(() =>
  currentBanners.value.filter((b) => b.character?.rarity === 5)
);

const fourStarBanners = computed(() =>
  currentBanners.value.filter((b) => b.character?.rarity === 4)
);

onMounted(() => {
  getCurrentBanners();
});
</script>

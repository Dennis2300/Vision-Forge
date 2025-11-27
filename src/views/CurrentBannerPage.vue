<template>
  <main>
    <LoadingSpinner v-if="loading" />
    <section class="w-[1400px] min-h-screen mt-10" v-else>
      <article class="flex flex-col gap-10">
        <div class="flex gap-5 justify-center mt-4">
          <div>
            <span class="countdown font-mono text-4xl">
              <span :style="`--value:${countdownParts.days}`"></span>
            </span>
            Days
          </div>
          <div>
            <span class="countdown font-mono text-4xl">
              <span :style="`--value:${countdownParts.hours}`"></span>
            </span>
            Hours
          </div>
          <div>
            <span class="countdown font-mono text-4xl">
              <span :style="`--value:${countdownParts.minutes}`"></span>
            </span>
            Min
          </div>
          <div>
            <span class="countdown font-mono text-4xl">
              <span :style="`--value:${countdownParts.seconds}`"></span>
            </span>
            Sec
          </div>
        </div>
        <div class="text-center">
          <h2>
            Banner ends
            <span class="text-tertiary">{{ formattedEndDate }}</span>
          </h2>
        </div>
      </article>
      <article class="flex flex-row justify-around mt-10">
        <div class="space-y-6">
          <h2 class="text-2xl font-bold">Current 5 STAR Increased Drop Rate</h2>
          <div v-for="banner in fiveStarBanners" :key="banner.id">
            <div class="bg-secondary px-8 py-4">
              <div class="flex flex-col justify-center items-center gap-4">
                <img
                  class="w-32 rounded-2xl"
                  :class="{
                    'rarity-5': banner.character.rarity === 5,
                    'rarity-4': banner.character.rarity === 4,
                  }"
                  :src="banner.character.avatar_url"
                  alt=""
                />
                <h1 class="font-acme">{{ banner.character.name }}</h1>
              </div>
              <div class="divider m-0"></div>
              <div class="flex flex-row justify-center gap-4">
                <p class="badge">{{ banner.character.vision.name }}</p>
                <p class="badge">{{ banner.character.weapon_type.name }}</p>
                <p class="badge">{{ banner.character.role.name }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="space-y-6">
          <h2 class="text-2xl font-bold">Current 4 STAR Increased Drop Rate</h2>
          <div v-for="banner in fourStarBanners" :key="banner.id">
            <div class="bg-secondary px-8 py-4">
              <div class="flex flex-col justify-center items-center gap-4">
                <img
                  class="w-32 rounded-2xl"
                  :class="{
                    'rarity-5': banner.character.rarity === 5,
                    'rarity-4': banner.character.rarity === 4,
                  }"
                  :src="banner.character.avatar_url"
                  alt=""
                />
                <h1 class="font-acme">{{ banner.character.name }}</h1>
              </div>
              <div class="divider m-0"></div>
              <div class="flex flex-row justify-center gap-4">
                <p class="badge">{{ banner.character.vision.name }}</p>
                <p class="badge">{{ banner.character.weapon_type.name }}</p>
                <p class="badge">{{ banner.character.role.name }}</p>
              </div>
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

const loading = ref(true);
const error = ref(null);

const currentBanners = ref([]);
const now = ref(Date.now());

setInterval(() => {
  now.value = Date.now();
}, 1000);

const countdownParts = computed(() => {
  if (currentBanners.value.length === 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const end = new Date(currentBanners.value[0].end_date).getTime();
  const diff = end - now.value;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds };
});

const formattedEndDate = computed(() => {
  if (!currentBanners.value.length) return "";
  const endDate = new Date(currentBanners.value[0].end_date);
  return new Intl.DateTimeFormat("en-US", {
    month: "short", // short month name e.g., "Dec"
    day: "numeric", // day number e.g., 2
    year: "numeric", // full year e.g., 2025
  }).format(endDate);
});

async function getCurrentBanners() {
  console.log("Called getCurrentBanners");
  try {
    let query = supabase
      .from("currentBanners")
      .select(
        "*, character:character_id(id, name, rarity, avatar_url, splash_art_url, vision(name), weapon_type(name), role(name))"
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

<style scoped>
.rarity-5 {
  background: linear-gradient(145deg, #e7944a, #b56a2b);
  box-shadow: 0px 0px 15px rgba(231, 148, 74, 0.8),
    0px 0px 30px rgba(231, 148, 74, 0.5);
}

.rarity-4 {
  background: linear-gradient(145deg, #9b72d5, #7149a3);
  box-shadow: 0px 0px 15px rgba(155, 114, 213, 0.8),
    0px 0px 30px rgba(155, 114, 213, 0.5);
}
</style>

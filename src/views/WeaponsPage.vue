<template>
  <!---->
  <div v-if="loading">
    <LoadingSpinner />
  </div>
  <!---->
  <div class="weapon-page-container" v-else>
    <!-- Header -->
    <div class="flex flex-col justify-center items-center mt-10">
      <h1 class="divider tracking-wider px-32">Weapon Archive</h1>
    </div>
    <!-- Grid -->
    <div class="grid grid-cols-4 gap-8 p-5">
      <!-- Weapon Card -->
      <RouterLink
        class="weapon-card flex flex-col justify-center items-center py-12 gap-10 rounded-xl"
        v-for="weapon in weapons"
        :key="weapon.id"
        :to="`/weapons/${weapon.id}?name=${encodeURIComponent(weapon.name)}`"
        target="_blank"
      >
        <img
          class="rounded-2xl pt-2 w-32"
          :class="{
            'rarity-5': weapon.rarity === 5,
            'rarity-4': weapon.rarity === 4,
            'rarity-3': weapon.rarity === 3,
          }"
          :src="weapon.image_url"
          alt=""
        />
        <h3>{{ weapon.name }}</h3>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "./../supabaseClient.js";
import LoadingSpinner from "../components/Loadings/LoadingSpinner.vue";

const loading = ref(true);
const error = ref(null);

const weapons = ref([]);

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

async function fetchAllWeapons() {
  try {
    const cached = cache("weapons");
    if (cached) {
      weapons.value = cached;
      return;
    }
    let query = supabase
      .from("weapons")
      .select("id, name, rarity, image_url")
      .order("name", { ascending: true });
    const { data, error: fetchError } = await query;
    if (fetchError) throw fetchError;
    cache("weapons", data);
    weapons.value = data;
  } catch (err) {
    error.value = err.message || "Failed to fetch weapons";
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchAllWeapons();
});
</script>

<style scoped>
.weapon-page-container {
  width: 1350px;
  min-height: 100vh;
  margin: 0px auto;
}

.weapon-card {
  text-decoration: none;
  color: white;
  background: var(--secondary);
  transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
}

.weapon-card:hover {
  background: var(--filter-color-hover);
  transform: translateY(-6px) scale(1.03);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.rarity-3 {
  background: linear-gradient(145deg, #567496, #3a77b1);
  box-shadow: 0px 0px 15px rgba(86, 116, 150, 0.8),
    0px 0px 30px rgba(86, 116, 150, 0.5);
}
.rarity-4 {
  background: linear-gradient(145deg, #e7944a, #b56a2b);
  box-shadow: 0px 0px 15px rgba(231, 148, 74, 0.8),
    0px 0px 30px rgba(231, 148, 74, 0.5);
}

.rarity-5 {
  background: linear-gradient(145deg, #9b72d5, #7149a3);
  box-shadow: 0px 0px 15px rgba(155, 114, 213, 0.8),
    0px 0px 30px rgba(155, 114, 213, 0.5);
}
</style>

<template>
  <LoadingSpinner v-if="loading" />
  <div v-else class="w-3/4 min-h-screen">
    <div class="h-[175px] w-3/4 relative rounded-2xl mx-auto">
      <h1
        class="absolute inset-0 z-20 flex items-center justify-center text-7xl font-acme tracking-wide outline-4"
      >
        Weapon Archive
      </h1>
      <div class="absolute inset-0 bg-black/50 z-10 rounded-2xl"></div>
      <img
        class="w-full h-full object-cover rounded-2xl"
        src="https://upload-static.hoyoverse.com/hoyolab-wiki/2023/06/03/77454259/c9ca59e15d1f61f53d0b3135794d001e_1968227873859734274.png?x-oss-process=image%2Fformat%2Cwebp"
        alt=""
        loading="lazy"
      />
    </div>
    <div class="divider my-4 px-24"></div>
    <div class="grid grid-cols-4 gap-8">
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
  <!--
  <div >
  </div>
  <div class="weapon-page-container" v-else>
    <div class="flex flex-col justify-center items-center">
      <h1 class="divider tracking-wider px-32">Weapon Archive</h1>
    </div>
    <div class="grid grid-cols-4 gap-8 p-5">
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
  -->
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
.weapon-page {
  width: 1200px;
  min-height: 100vh;
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

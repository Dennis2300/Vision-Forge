<template>
  <!---->
  <template v-if="loading">
    <LoadingSpinner />
  </template>
  <!---->
  <template v-else>
    <div class="weapon-page-container">
      <div class="flex items-center justify-center py-8 text-2xl">
        <h1 class="">Weapons Archive</h1>
      </div>
      <!-- Grid -->
      <div class="grid grid-cols-4 gap-8 p-5">
        <!-- Weapon Card -->
        <template v-for="weapon in weapons">
          <div
            class="flex flex-col justify-center items-center bg-secondary py-12 gap-10 rounded-xl"
          >
            <div
              :class="{
                'rarity-5': weapon.rarity === 5,
                'rarity-4': weapon.rarity === 4,
              }"
            >
              <img
                class="weapon-image rounded-2xl pt-2 w-32"
                :src="weapon.image_url"
                alt=""
              />
            </div>
            <h3>{{ weapon.name }}</h3>
          </div>
        </template>
      </div>
    </div>
  </template>
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
    let query = supabase.from("weapons").select("id, name, rarity, image_url");
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

<style scoped>
.weapon-page-container {
  width: 1350px;
  min-height: 100vh;
  margin: 0px auto;
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

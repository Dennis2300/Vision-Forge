<template>
  <article class="flex justify-center items-center my-24">
    <LoadingSpinner v-if="loading && !weapon" />
    <div
      v-if="weapon"
      class="bg-secondary w-2/3 rounded-2xl p-8 shadow-2xl transition-all duration-300 hover:shadow-tertiary/10"
    >
      <div class="flex flex-row gap-6 items-start mb-6">
        <div
          :class="{
            'rarity-5': weapon.rarity === 5,
            'rarity-4': weapon.rarity === 4,
            'rarity-3': weapon.rarity === 3,
          }"
          class="w-36 h-36 rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:rotate-2 flex-shrink-0"
        >
          <img
            class="w-full h-full object-cover rounded-2xl"
            :src="weapon.image_url"
            :alt="weapon.name"
          />
        </div>
        <div class="flex flex-col gap-3 flex-grow">
          <h1
            class="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
          >
            {{ weapon.name }}
          </h1>
          <div
            class="flex items-center gap-1 text-yellow-400 bg-primary rounded-lg w-fit px-3 py-1 shadow-md"
          >
            <span
              v-for="n in weapon.rarity"
              :key="n"
              class="text-xl animate-pulse"
              style="animation-delay: calc(var(--n) * 100ms)"
            >
              ★
            </span>
          </div>
          <div class="grid grid-cols-1 gap-2 mt-2">
            <div
              class="flex items-center gap-2 bg-primary/50 rounded-lg px-3 py-2 transition-all duration-200 hover:bg-primary hover:translate-x-1"
            >
              <strong class="text-tertiary min-w-[120px]">Type:</strong>
              <span class="text-gray-300">{{ weapon.type.name }}</span>
            </div>
            <div
              class="flex items-center gap-2 bg-primary/50 rounded-lg px-3 py-2 transition-all duration-200 hover:bg-primary hover:translate-x-1"
            >
              <strong class="text-tertiary min-w-[120px]">Bonus Effect:</strong>
              <span class="text-gray-300">
                {{ weapon.bonus_effect_value }}%
                {{ weapon.bonus_effect_type.name }}
              </span>
            </div>
            <div
              class="flex items-center gap-2 bg-primary/50 rounded-lg px-3 py-2 transition-all duration-200 hover:bg-primary hover:translate-x-1 cursor-default"
            >
              <strong class="text-tertiary min-w-[120px]">Source:</strong>
              <span class="text-gray-300">{{
                weapon.source?.name || "Unknown"
              }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="divider my-6"></div>
      <div
        class="bg-primary/30 p-6 rounded-xl mb-6 border border-primary transition-all duration-300 hover:border-tertiary/30"
      >
        <p class="tracking-wide text-base leading-7 text-gray-300 italic">
          {{ weapon.common_describe }}
        </p>
      </div>
      <div
        class="bg-primary p-6 rounded-xl shadow-lg border border-transparent transition-all duration-300 hover:border-tertiary/20 hover:shadow-tertiary/10"
      >
        <h2
          class="text-2xl font-acme font-bold mb-4 text-center bg-gradient-to-r from-tertiary to-purple-400 bg-clip-text text-transparent"
        >
          Attribute
        </h2>
        <div class="divider mt-0 mb-4"></div>
        <MarkdownRender :content="weapon.attribute" class="pt-2" />
      </div>
    </div>
  </article>
</template>

<script setup>
import { supabase } from "./../supabaseClient.js";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

import LoadingSpinner from "../components/Loadings/LoadingSpinner.vue";
import MarkdownRender from "@/components/MarkdownRender.vue";

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
      .select("*, type(name, image_url), bonus_effect_type(name), source(name)")
      .eq("id", weaponId)
      .single();
    const { data, error: fetchError } = await query;
    if (fetchError) throw fetchError;
    weapon.value = data;
    console.log(weapon.value);
  } catch (err) {
    error.value = err.message || "Failed to load weapon";
  } finally {
  }
}

onMounted(async () => {
  const weaponId = checkWeaponId();
  if (!weaponId) return;
  await fetchWeaponById(weaponId);
});
</script>

<style scoped>
.rarity-5 {
  background: linear-gradient(145deg, #e7944a, #b56a2b);
  box-shadow:
    0px 0px 15px rgba(231, 148, 74, 0.8),
    0px 0px 30px rgba(231, 148, 74, 0.5);
}

.rarity-4 {
  background: linear-gradient(145deg, #9b72d5, #7149a3);
  box-shadow:
    0px 0px 15px rgba(155, 114, 213, 0.8),
    0px 0px 30px rgba(155, 114, 213, 0.5);
}

.rarity-3 {
  background: linear-gradient(145deg, #567496, #3a77b1);
  box-shadow:
    0px 0px 15px rgba(86, 116, 150, 0.8),
    0px 0px 30px rgba(86, 116, 150, 0.5);
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}
</style>

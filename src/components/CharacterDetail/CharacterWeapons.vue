<template>
  <article class="ml-24 w-1/2" v-if="character.weapons.length > 0">
    <h1 class="divider m-0">Weapons</h1>
    <section class="flex flex-col gap-2">
      <template
        v-if="character.weapons?.length"
        v-for="weapon in character.weapons"
      >
        <router-link
          class="text-inherit no-underline group"
          :to="`/weapons/${weapon.weapon_id.id}?name=${encodeURIComponent(
            weapon.weapon_id.name
          )}`"
          target="_blank"
        >
          <div
            class="relative flex flex-row items-center mt-6 bg-primary rounded-2xl px-6 py-8 gap-6"
          >
            <img
              class="w-24 rounded-3xl"
              :class="{
                'rarity-5': weapon.weapon_id.rarity === 5,
                'rarity-4': weapon.weapon_id.rarity === 4,
                'rarity-3': weapon.weapon_id.rarity === 3,
              }"
              :src="weapon.weapon_id.image_url"
              alt=""
            />
            <div class="flex flex-col gap-3">
              <h3 class="font-acme tracking-wide group-hover:underline">
                {{ weapon.weapon_id.name }}
              </h3>
              <div class="flex flex-row gap-2">
                <p class="badge badge-soft badge-secondary">
                  Base Attack: {{ weapon.weapon_id.base_attack }}
                </p>
                <p class="badge badge-soft badge-accent">
                  {{ weapon.weapon_id.bonus_effect_type.name }}:
                  {{ weapon.weapon_id.bonus_effect_value }}
                </p>
              </div>
            </div>
            <div class="absolute top-3 right-3">
              <span
                class="relative flex items-center justify-center w-8 h-8 font-acme rounded-full border-2 border-white shadow-md overflow-hidden"
                :class="{
                  'bg-gradient-to-b from-yellow-300 to-yellow-500 text-black animate-shine':
                    weapon.rank === 1,
                  'bg-gradient-to-b from-gray-200 to-gray-400 text-black':
                    weapon.rank === 2,
                  'bg-gradient-to-b from-amber-700 to-amber-900 text-white':
                    weapon.rank === 3,
                }"
              >
                {{ weapon.rank }}
              </span>
            </div>
          </div>
        </router-link>
      </template>
    </section>
  </article>
  <article class="ml-24 w-1/2" v-else></article>
</template>

<script setup>
defineProps({
  character: Object,
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

.rarity-3 {
  background: linear-gradient(145deg, #567496, #3a77b1);
  box-shadow: 0px 0px 15px rgba(86, 116, 150, 0.8),
    0px 0px 30px rgba(86, 116, 150, 0.5);
}
</style>

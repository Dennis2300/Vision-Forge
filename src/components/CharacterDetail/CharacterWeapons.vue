<template>
  <article v-if="character.weapons.length > 0">
    <h1 class="divider mt-20 px-32 mb-5 tracking-wide">Best Weapon</h1>
    <div class="w-full h-auto">
      <div
        class="flex flex-row justify-around items-center gap-12 bg-primary mx-24 w-auto py-10 rounded-2xl"
      >
        <router-link
          v-if="character.weapons?.length"
          v-for="weapon in character.weapons"
          :to="`/weapons/${weapon.weapon_id.id}?name=${encodeURIComponent(
            weapon.weapon_id.name
          )}`"
          target="_blank"
          class="weapon-card relative flex flex-col justify-center items-center bg-secondary rounded-2xl py-10 w-72 h-fit no-underline"
        >
          <div class="absolute top-5 left-5">
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
          <div
            :class="{
              'rarity-5': weapon.weapon_id.rarity === 5,
              'rarity-4': weapon.weapon_id.rarity === 4,
            }"
          >
            <img
              class="w-32 weapon-image rounded-xl"
              :src="weapon.weapon_id.image_url"
              alt=""
            />
          </div>
          <p class="text-tertiary tracking-wide mt-8">
            {{ weapon.weapon_id.name }}
          </p>
        </router-link>
        <div class="tracking-wide" v-else>No Weapons Assigned Yet</div>
      </div>
    </div>
  </article>
</template>

<script setup>
defineProps({
  character: Object,
});
</script>

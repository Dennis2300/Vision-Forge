<template>
  <section class="flex flex-col justify-center items-center">
    <figure class="relative">
      <img
        class="vision-avatar absolute -top-8 -left-6 w-16 h-16 p-2"
        :src="character.vision.image_url"
        alt=""
      />

      <div
        :class="{
          'rarity-5': character.rarity === 5,
          'rarity-4': character.rarity === 4,
        }"
      >
        <img
          class="character-avatar w-48 flex items-center justify-center"
          :src="character.avatar_url"
          :alt="character.name"
        />
      </div>
    </figure>

    <header class="text-center">
      <h1 class="character-detail-name tracking-wide">
        {{ character.name }}
      </h1>
      <div class="divider mx-0 mt-0 mb-1 px-10"></div>
    </header>

    <!-- Character Tags -->
    <ul class="flex flex-row gap-3 list-none">
      <li v-if="character.vision" class="tags">
        {{ character.vision.name }}
      </li>
      <li v-if="character.weapon_type" class="tags">
        {{ character.weapon_type.name }}
      </li>
      <li v-if="character.main_stat" class="tags">
        {{ character.main_stat.name }}
      </li>
      <li v-if="character.released_region" class="tags">
        {{ character.released_region.name }}
      </li>
    </ul>
  </section>
</template>

<script setup>
defineProps({
  character: Object,
});
</script>

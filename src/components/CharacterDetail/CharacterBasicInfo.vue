<template>
  <section class="flex flex-col justify-center items-center">
    <figure class="relative">
      <img
        class="bg-primary rounded-full absolute -top-8 -left-6 w-16 h-16 p-2"
        :src="character.vision.image_url"
        alt=""
      />

      <img
        class="rounded-full w-48 flex items-center justify-center"
        :class="{
          'rarity-5': character.rarity === 5,
          'rarity-4': character.rarity === 4,
        }"
        :src="character.avatar_url"
        :alt="character.name"
      />
    </figure>

    <header class="text-center">
      <h1 class="font-acme text-5xl mt-4 tracking-wide">
        {{ character.name }}
      </h1>
    </header>
    <div class="divider mb-2 px-24"></div>

    <!-- Character Tags -->
    <ul class="flex flex-row gap-4 list-none">
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

<style scoped>
.rarity-5 {
  background: linear-gradient(145deg, #e7944a, #b56a2b);
  box-shadow: 0px 0px 15px rgba(231, 148, 74, 0.8),
    0px 0px 30px rgba(231, 148, 74, 0.5);
}

.rarity-4{
  background: linear-gradient(145deg, #9b72d5, #7149a3);
  box-shadow: 0px 0px 15px rgba(155, 114, 213, 0.8),
    0px 0px 30px rgba(155, 114, 213, 0.5);
}
</style>

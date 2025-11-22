<template>
  <section class="absolute top-0 w-full z-0 opacity-10 overflow-hidden">
    <img
      v-if="character.splash_art_url"
      :src="character.splash_art_url"
      :alt="character.name"
      class="w-full"
      loading="lazy"
    />
    <div v-else></div>
  </section>
</template>

<script setup>
defineProps({
  character: Object,
});
</script>

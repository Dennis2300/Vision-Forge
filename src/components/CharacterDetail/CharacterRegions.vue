<template>
    <h2 class="pt-2 text-quaternary tracking-wide">Regions</h2>
    <template v-if="character.regions?.length">
      <div v-for="region in character.regions" :key="region.region_id.id">
        {{ region.region_id.name }}
      </div>
    </template>

    <div v-else>
      <p class="text-red-700">Not Revealed</p>
    </div>
</template>

<script setup>
defineProps({
  character: Object,
});
</script>

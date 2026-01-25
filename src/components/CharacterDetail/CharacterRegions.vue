<template>
    <h2 class="divider mt-2">Regions</h2>
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

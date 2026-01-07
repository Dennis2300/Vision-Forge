<template>
  <section class="w-1/2">
    <h2 class="divider tracking-wider">Regions</h2>

    <template v-if="character.regions?.length">
      <ul
        class="list-view tracking-wide flex flex-col items-center gap-2 list-none"
      >
        <li v-for="region in character.regions" :key="region.region_id.id">
          {{ region.region_id.name }}
        </li>
      </ul>
    </template>

    <div v-else class="flex justify-center items-center h-full">
      <p class="text-red-700">Not Revealed</p>
    </div>
  </section>
</template>

<script setup>
defineProps({
  character: Object,
});
</script>

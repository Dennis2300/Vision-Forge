<template>
  <article v-if="character.materials.length > 0">
    <h1 class="divider mt-20 px-32 mb-8 tracking-wide">Materials</h1>
    <div class="flex flex-row justify-between mx-24 w-auto min-h-96 gap-8">
      <!-- Acension Materials -->
      <div class="bg-primary w-1/2 rounded-2xl p-6">
        <h1 class="divider">Ascension</h1>
        <div class="flex flex-col gap-2 pt-4">
          <template
            v-for="mat in character.materials.filter(
              (material) => material.mat_type.name.toLowerCase() === 'ascension'
            )"
            :key="mat.id"
          >
            <div class="flex flex-row items-center gap-2">
              <img class="w-16" :src="mat.materials_id.image_url" alt="" />
              <h4>{{ mat.materials_id.name }}</h4>
              <span class="text-tertiary"
                >x {{ mat.amount.toLocaleString() }}</span
              >
            </div>
          </template>
        </div>
      </div>
      <!-- Talent Materials -->
      <div class="bg-primary w-1/2 rounded-2xl p-6">
        <h1 class="divider">Talent</h1>
        <div class="flex flex-col gap-2 justify-center pt-4">
          <template
            v-for="mat in character.materials.filter(
              (material) => material.mat_type.name.toLowerCase() === 'talent'
            )"
            :key="mat.id"
          >
            <div class="flex flex-row items-center gap-2">
              <img class="w-16" :src="mat.materials_id.image_url" alt="" />
              <h4>{{ mat.materials_id.name }}</h4>
              <span class="text-tertiary"
                >x {{ mat.amount.toLocaleString() }}</span
              >
            </div>
          </template>
        </div>
      </div>
    </div>
  </article>
</template>
<script setup>
defineProps({
  character: Object,
});
</script>

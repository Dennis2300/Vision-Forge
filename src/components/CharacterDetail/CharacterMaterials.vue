<template>
  <article>
    <h1 class="divider mt-20 px-32 mb-8 tracking-wide">
      Materials
    </h1>

    <div
      v-for="mat in materials"
      :key="mat.id"
      class="flex items-center gap-4"
    >
      <img class="w-32" :src="mat.img_url" alt="" />
      <p>{{ mat.name }}</p>
      <strong>{{ mat.amount }}</strong>
    </div>
  </article>
</template>


<script setup>
import { computed } from "vue";

const props = defineProps({
  character: {
    type: Object,
    required: true,
  },
});

const materials = computed(() => {
  if (!props.character) return [];

  return [
    ...(props.character.ascension_mats ?? []).map((m) => ({
      id: `asc-${m.id}`,
      type: "ascension",
      name: m.materials_ascension_id.name,
      img_url: m.materials_ascension_id.img_url,
      amount: m.amount,
    })),

    ...(props.character.exp_mats ?? []).map((m) => ({
      id: `exp-${m.id}`,
      type: "exp",
      name: m.materials_exp_id.name,
      img_url: m.materials_exp_id.img_url,
      amount: m.amount,
    })),

    ...(props.character.level_up_mats ?? []).map((m) => ({
      id: `lvl-${m.id}`,
      type: "level-up",
      name: m.materials_level_up_id.name,
      img_url: m.materials_level_up_id.img_url,
      amount: m.amount,
    })),

    ...(props.character.talent_mats ?? []).map((m) => ({
      id: `tal-${m.id}`,
      type: "talent",
      name: m.materials_talent_id.name,
      img_url: m.materials_talent_id.img_url,
      amount: m.amount,
    })),
  ];
});
</script>

<template>
  <article v-if="props.character && materials.length" class="mx-24">
    <h1
      id="materials"
      class="mt-20 mb-8 px-32 text-3xl font-semibold tracking-wide divider scroll-mt-12"
    >
      Materials
    </h1>
    <div class="w-full bg-primary rounded-xl shadow-lg py-4">
      <div
        v-for="mat in materials"
        :key="mat.id"
        class="flex items-center justify-between px-10 py-4"
      >
        <div class="flex items-center gap-6">
          <div
            class="w-20 h-20 rounded-lg overflow-hidden bg-white/10 flex items-center justify-center"
          >
            <img
              :src="mat.img_url"
              :alt="mat.name"
              class="object-contain w-full h-full"
            />
          </div>
          <h2 class="font-acme tracking-wide">{{ mat.name }}</h2>
        </div>
        <h2 class="font-acme">
          {{ new Intl.NumberFormat().format(mat.amount) }}
        </h2>
      </div>
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
    ...(props.character.enhancement_mats ?? []).map((m) => ({
      id: `enh-${m.id}`,
      type: "enhancement",
      name: m.materials_enhancement_id.name,
      img_url: m.materials_enhancement_id.img_url,
      amount: m.amount,
    })),

    ...(props.character.talent_mats ?? []).map((m) => ({
      id: `tal-${m.id}`,
      type: "talent",
      name: m.materials_talent_id.name,
      img_url: m.materials_talent_id.img_url,
      amount: m.amount,
    })),

    ...(props.character.ascension_mats ?? []).map((m) => ({
      id: `asc-${m.id}`,
      type: "ascension",
      name: m.materials_ascension_id.name,
      img_url: m.materials_ascension_id.img_url,
      amount: m.amount,
    })),

    ...(props.character.local_specialty ?? []).map((m) => ({
      id: `loc-${m.id}`,
      type: "local-specialty",
      name: m.local_specialty_id.name,
      img_url: m.local_specialty_id.img_url,
      amount: m.amount,
    })),

    ...(props.character.level_up_mats ?? []).map((m) => ({
      id: `lvl-${m.id}`,
      type: "level-up",
      name: m.materials_level_up_id.name,
      img_url: m.materials_level_up_id.img_url,
      amount: m.amount,
    })),

    ...(props.character.exp_mats ?? []).map((m) => ({
      id: `exp-${m.id}`,
      type: "exp",
      name: m.materials_exp_id.name,
      img_url: m.materials_exp_id.img_url,
      amount: m.amount,
    })),
  ];
});
</script>

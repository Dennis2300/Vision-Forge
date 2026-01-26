<template>
  <h2 class="pt-1 text-quaternary tracking-wide">Voice Actors</h2>
  <template v-if="props.character?.va?.length">
    <div class="flex flex-row gap-8">
      <div class="flex flex-col gap-2">
        <div v-for="item in sortedGroupedVA" :key="item.code">
          <span :class="`fi fi-${item.code}`"></span>
          <strong class="ml-2">{{ item.label }}:</strong>
        </div>
      </div>

      <div class="flex flex-col gap-2">
        <div v-for="item in sortedGroupedVA" :key="item.code">
          <template v-if="item.actors.length">
            <template v-for="(a, index) in item.actors" :key="a.id">
              <template v-if="a.link">
                <a
                  :href="a.link"
                  target="_blank"
                  rel="noopener"
                  class="link hover:underline"
                >
                  {{ a.name }}
                </a>
              </template>
              <template v-else>
                {{ a.name }}
              </template>
              <span v-if="index < item.actors.length - 1"> & </span>
            </template>
          </template>
          <template v-else>No VA</template>
        </div>
      </div>
    </div>
  </template>
  <div v-else>
    <p class="text-red-700">Not Revealed</p>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  character: Object,
});

const languages = [
  { label: "English", code: "us" },
  { label: "Japanese", code: "jp" },
  { label: "Chinese", code: "cn" },
  { label: "Korean", code: "kr" },
];

const groupedVA = computed(() => {
  if (!props.character?.va) return {};

  return props.character.va.reduce((acc, actor) => {
    const code = actor.lang.code;
    if (!acc[code]) acc[code] = [];
    acc[code].push(actor);
    return acc;
  }, {});
});

const sortedGroupedVA = computed(() => {
  return languages.map((lang) => ({
    code: lang.code,
    label: lang.label,
    actors: groupedVA.value[lang.code] || [],
  }));
});
</script>

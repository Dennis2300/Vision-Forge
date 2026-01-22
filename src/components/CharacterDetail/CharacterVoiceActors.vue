<template>
  <section class="voice-actor-container">
    <h2 class="divider tracking-wider pb-4">Voice Actors</h2>

    <template v-if="props.character?.va?.length">
      <div class="flex flex-row justify-around">
        <!-- Languages -->
        <ul class="flex flex-col gap-2 list-none">
          <li v-for="item in sortedGroupedVA" :key="item.code">
            <span :class="`fi fi-${item.code}`"></span>
            <strong class="ml-2">{{ item.label }}:</strong>
          </li>
        </ul>

        <!-- Actors -->
        <ul class="flex flex-col gap-2 list-none">
          <li v-for="item in sortedGroupedVA" :key="item.code">
            <template v-if="item.actors.length">
              <template v-for="(a, index) in item.actors" :key="a.id">
                <template v-if="a.link">
                  <a :href="a.link" target="_blank" rel="noopener" class="link hover:underline">
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
          </li>
        </ul>
      </div>
    </template>
    <div v-else class="flex justify-center items-center h-full">
      <p class="text-red-700">Not Revealed</p>
    </div>
  </section>
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

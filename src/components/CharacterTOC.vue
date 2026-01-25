<template>
  <nav class="mt-6 flex flex-col px-4 space-y-2">
    <h2 class="text-lg font-semibold mb-2">Table of Contents</h2>

    <a
      v-for="item in tocItems"
      :key="item.id"
      href="#"
      @click.prevent="scrollTo(item.id)"
      class="px-3 py-2 rounded hover:bg-tertiary transition-colors no-underline text-text"
    >
      {{ item.label }}
    </a>
  </nav>
</template>

<script setup>
import { ref } from "vue";

const tocItems = [
  { id: "weapons", label: "Best Weapons" },
  { id: "artifacts", label: "Best Artifacts" },
  { id: "builds", label: "Best Builds" },
  { id: "materials", label: "Materials" },
];

const activeSection = ref(null);

// Smooth scroll to section
function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
    activeSection.value = id;
  }
}
</script>

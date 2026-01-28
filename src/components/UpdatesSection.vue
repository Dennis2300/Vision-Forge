<template>
  <div class="w-3/4 bg-secondary p-8 rounded-2xl mb-24 shadow-xl">
    <h1 class="mt-2">Updates</h1>
    <div class="divider mb-6"></div>
    <div v-if="updates.length" class="space-y-6">
      <article
        v-for="update in updates"
        :key="update.id"
        class="bg-primary m-4 p-6 rounded-xl transition-all duration-300 ease-out hover:shadow-lg hover:shadow-tertiary/10 hover:-translate-y-1 border border-transparent hover:border-tertiary/20 cursor-default"
      >
        <header class="mb-4">
          <h3
            class="text-white text-[1.4rem] font-semibold mb-1 transition-colors duration-200 hover:text-tertiary"
          >
            {{ update.title }}
          </h3>
          <div class="flex gap-3 text-sm text-gray-400">
            <span
              class="text-tertiary underline flex items-center justify-center transition-all duration-200 hover:text-tertiary/80 hover:no-underline"
            >
              {{ new Date(update.published_at).toLocaleDateString() }}
            </span>
          </div>
        </header>
        <div
          class="text-gray-300 leading-relaxed text-base space-y-2 update-content"
          v-html="update.content"
        ></div>
      </article>
    </div>
  </div>
</template>

<style scoped>
.update-content :deep(p) {
  transition: color 0.2s ease;
}

.update-content :deep(a) {
  transition: all 0.2s ease;
}

.update-content :deep(a:hover) {
  color: var(--color-tertiary);
  text-decoration: none;
}
</style>

<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "./../supabaseClient.js";

const updates = ref([]);

async function fetchUpdates() {
  try {
    const { data, error } = await supabase
      .from("updates")
      .select("*")
      .order("published_at", { ascending: false })
      .limit(3);

    if (error) throw error;

    updates.value = data;
  } catch (err) {
    console.error("Error fetching updates:", err);
  }
}

onMounted(() => {
  fetchUpdates();
});
</script>

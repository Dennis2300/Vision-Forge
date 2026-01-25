<template>
  <section class="max-w-[800px] mx-auto p-4 min-h-72 mb-10">
    <h2
      class="text-[1.8rem] font-bold text-center mb-8 text-gray-200 tracking-wide divider"
    >
      Latest Updates
    </h2>

    <div v-if="updates.length" class="flex flex-col gap-8">
      <article
        v-for="update in updates"
        :key="update.id"
        class="bg-secondary border border-tertiary rounded-2xl p-6 shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
      >
        <header class="mb-4">
          <h3 class="text-white text-[1.4rem] font-semibold mb-1">
            {{ update.title }}
          </h3>

          <div class="flex gap-3 text-sm text-gray-400">
            <span
              class="text-tertiary underline flex items-center justify-center"
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

    <p v-else class="text-center text-gray-500 italic">
      No updates yet — check back soon!
    </p>
  </section>
</template>

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

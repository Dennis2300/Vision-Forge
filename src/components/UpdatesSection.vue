<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "./../supabaseClient.js";
// import MarkdownRender from "./MarkdownRender.vue"; // you can enable later if you want

const updates = ref([]);

async function fetchUpdates() {
  try {
    const { data, error } = await supabase
      .from("updates")
      .select("id, title, message, created_at")
      .order("created_at", { ascending: false })
      .limit(3); // only get the latest 3

    if (error) throw error;

    updates.value = data;
  } catch (err) {
    console.error("Error fetching updates:", err);
  }
}

onMounted(fetchUpdates);
</script>

<template>
  <div v-for="update in updates" :key="update.id" class="update">
    <!-- Header -->
    <h2>{{ update.title }}</h2>

    <!-- Created Date-->
    <div>
      <strong>
        {{
          update.created_at
            ? new Date(update.created_at).toLocaleDateString("en-GB", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : "UPCOMING"
        }}
      </strong>
    </div>

    <!-- Content -->
    <div>
      <p>{{ update.message }}</p>
      <!-- If using Markdown later: -->
      <!-- <MarkdownRender :content="update.message" /> -->
    </div>
  </div>
</template>

<style scoped>
</style>

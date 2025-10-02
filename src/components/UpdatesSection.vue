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
    <h2 class="update-title">{{ update.title }}</h2>

    <!-- Created Date-->
    <div class="update-date-container">
      Posted:
      <strong class="update-date">
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
    <div class="divider m-0 p-0"></div>

    <!-- Content -->
    <div class="update-message-container">
      <p class="update-message">{{ update.message }}</p>
      <!-- If using Markdown later: -->
      <!-- <MarkdownRender :content="update.message" /> -->
    </div>
  </div>
</template>

<style scoped>
.update {
  margin-top: 25px;
  background-color: var(--filter-color);
  padding: 1.5rem;
  border-radius: 1rem;
  border: 1px solid #fafafa;
}

.update-title {
  font-family: var(--font-roboto);
  letter-spacing: 0.5px;
}

.update-date-container {
  font-family: var(--font-roboto);
  letter-spacing: 0.5px;
  margin-top: 5px;
}

.update-message-container {
  font-family: var(--font-roboto);
  font-size: 1.1rem;
  letter-spacing: 0.5px;
  text-shadow: 3px 3px 15px  rgb(0, 0, 0, 1);
}
</style>

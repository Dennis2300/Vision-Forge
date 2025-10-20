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

<template>
  <section class="updates">
    <h2 class="updates-title">Latest Updates</h2>

    <div v-if="updates.length" class="updates-list">
      <article
        v-for="update in updates"
        :key="update.id"
        class="update-card"
      >
        <header class="update-header">
          <h3 class="update-title">{{ update.title }}</h3>
          <div class="update-meta">
            <span class="update-slug">#{{ update.slug }}</span>
            <span class="update-date flex items-center justify-center">
              {{ new Date(update.published_at).toLocaleDateString() }}
            </span>
          </div>
        </header>

        <div
          class="update-content"
          v-html="update.content"
        ></div>
      </article>
    </div>

    <p v-else class="no-updates">No updates yet — check back soon!</p>
  </section>
</template>

<style scoped>
.updates {
  max-width: 800px;
  margin: 3rem auto;
  padding: 1rem;
}

.updates-title {
  font-size: 1.8rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
  color: #ececec;
  letter-spacing: 0.5px;
}

.updates-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.update-card {
  background: #1b1b1b;
  border: 1px solid #2b2b2b;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.update-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.25);
}

.update-header {
  margin-bottom: 1rem;
}

.update-title {
  font-size: 1.4rem;
  font-weight: 600;
  color: #fff;
  margin: 0 0 0.3rem;
}

.update-meta {
  display: flex;
  gap: 0.75rem;
  font-size: 0.9rem;
  color: #aaa;
}

.update-slug {
  background: #292929;
  padding: 0.2rem 0.6rem;
  border-radius: 0.4rem;
  font-family: monospace;
}

.update-date {
  color: #888;
}

.update-content {
  color: #ddd;
  line-height: 1.6;
  font-size: 1rem;
}

.update-content h1,
.update-content h2,
.update-content h3 {
  margin-top: 1rem;
  color: #fff;
}

.update-content a {
  color: #64b5f6;
  text-decoration: none;
}

.update-content a:hover {
  text-decoration: underline;
}

.no-updates {
  text-align: center;
  color: #888;
  font-style: italic;
}
</style>

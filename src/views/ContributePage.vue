<template>
  <div class="contribute-page-container my-10">
    <div class="contribute-page-header">
      <h1 class="divider">Contribute Page</h1>
      <div class="contribute-header-text">
        <p>
          This is the contribution page. Before you contribute, I must say that
          contribution is not necessary but deeply appreciated. Your support
          helps me continue creating content, improving this project, and
          bringing new ideas to life. Every little bit makes a difference, but
          even just spreading the word or engaging with the community means a
          lot!
        </p>

        <p class="mt-4">
          If you choose to contribute, you can do so safely via Patreon by
          clicking the box below. Remember, your support—whether through
          contributions, kind words, or sharing this project—is what keeps this
          going. Thank you for being here and being part of this journey! ❤️
        </p>
      </div>
    </div>
    <div class="contribute-page-content">
      <div class="contribute-page-offset">
        <h2 class="divider offset-header">Patreon Support</h2>
        <p>
          Your support will go directly to the maintenance of this website,
          helping cover hosting costs, domain renewal, and tools needed to keep
          everything running smoothly.
        </p>

        <p class="mt-4">
          It also allows me to dedicate more time to improving features, adding
          new content, and ensuring a better experience for everyone who visits.
        </p>

        <p class="mt-4">
          Remember, contributing is completely optional—but every bit of support
          helps and is truly appreciated.
        </p>

        <p class="mt-4 font-semibold">
          Thank you for being part of this journey!
        </p>
        <div>
          <a href="">Patreon</a>
        </div>
      </div>
      <div class="supporters-list">
        <h1 class="divider mb-10">Shout out to my Patreons</h1>
        <div class="supporters-grid">
          <div
            class="supporters"
            v-for="supporter in supporters"
            :key="supporter.id"
          >
            <h3 class="supporter-name">{{ supporter.name }}</h3>
            <strong class="supporter-date mt-1">{{
              formatSupportInfo(supporter.support_started)
            }}</strong>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contribute-page-container {
  min-height: 100vh;
  width: 1200px;
}

.contribute-page-header {
  padding: 1.5rem;
  font-family: var(--font-bungee);
}

.contribute-header-text {
  padding: 0.5rem 2rem 2rem 2rem;
  font-family: var(--font-roboto);
  line-height: 1.5rem;
}

.contribute-page-content {
  display: flex;
  gap: 3rem;
}

.contribute-page-offset {
  flex: 1;
  background-color: var(--secondary);
  border-radius: 15px;
  height: fit-content;
  padding: 15px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.6);
}

.offset-header {
  font-family: var(--font-bungee);
}

.contribute-page-offset p {
  font-family: var(--font-roboto);
  letter-spacing: 0.5px;
  font-size: 18px;
  line-height: 1.5rem;
}

.supporters-list {
  flex: 3;
  background-color: var(--secondary);
  border-radius: 15px;
  height: fit-content;
  padding: 15px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.6);
}

.supporters-list h1 {
  font-family: var(--font-bungee);
}

.supporters-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 50px;
}

.supporters {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50px;
  background-color: var(--filter-color);
  padding: 1rem 2rem 1rem 2rem;
  border-radius: 15px;
  border: 1px solid var(--tertiary);
}

.supporter-name {
  font-family: var(--font-bungee);
}

.supporter-date {
  font-family: var(--font-roboto);
}
</style>

<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "./../supabaseClient.js";

const supporters = ref([]);

function cache(key, data = null, ttl = 24 * 60 * 60 * 1000) {
  const now = new Date().getTime();

  if (data) {
    const item = {
      data,
      expiry: now + ttl,
    };
    localStorage.setItem(key, JSON.stringify(item));
    return data;
  } else {
    const cachedItem = localStorage.getItem(key);
    if (!cachedItem) return null;

    const parsedItem = JSON.parse(cachedItem);
    if (now > parsedItem.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return parsedItem.data;
  }
}
function formatSupportInfo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
  return `${diffDays} days`;
}

async function fetchSupporters() {
  try {
    const cached = cache("supporters");
    if (cached) {
      supporters.value = cached;
      return;
    }

    const { data, error: fetchError } = await supabase
      .from("supporters")
      .select("*");
    if (fetchError) throw fetchError;

    cache("supporters", data);
    supporters.value = data;
  } catch (err) {
    console.error("Error fetching supporters:", err);
  }
}

onMounted(() => {
  fetchSupporters();
});
</script>

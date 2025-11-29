<template>
  <article class="mx-24 w-1/2" v-if="character.artifacts.length > 0">
    <h1 class="divider m-0 px-8">Artifacts</h1>
    <section class="flex flex-col gap-2">
      <template
        v-if="character.artifacts?.length"
        v-for="artifact in character.artifacts"
      >
        <router-link class="text-inherit no-underline">
          <div
            class="relative flex flex-row items-center mt-6 bg-primary rounded-2xl p-6 gap-4"
          >
            <img
              class="w-24 rounded-3xl rarity-5"
              :src="artifact.artifact_id.flower_img_url"
              alt=""
            />
            <div class="flex flex-col gap-3">
              <h3>{{ artifact.artifact_id.name }}</h3>
              <p class="badge badge-soft badge-accent">
                {{ artifact.artifact_id.two_piece.name }}
              </p>
            </div>
            <div class="absolute top-3 right-3">
              <span
                class="relative flex items-center justify-center w-8 h-8 font-acme rounded-full border-2 border-white shadow-md overflow-hidden"
                :class="{
                  'bg-gradient-to-b from-yellow-300 to-yellow-500 text-black animate-shine':
                    artifact.rank === 1,
                  'bg-gradient-to-b from-gray-200 to-gray-400 text-black':
                    artifact.rank === 2,
                  'bg-gradient-to-b from-amber-700 to-amber-900 text-white':
                    artifact.rank === 3,
                }"
              >
                {{ artifact.rank }}
              </span>
            </div>
          </div>
        </router-link>
      </template>
    </section>
  </article>
</template>

<script setup>
defineProps({
  character: Object,
});
</script>

<style scoped>
.rarity-5 {
  background: linear-gradient(145deg, #e7944a, #b56a2b);
  box-shadow: 0px 0px 15px rgba(231, 148, 74, 0.8),
    0px 0px 30px rgba(231, 148, 74, 0.5);
}
</style>

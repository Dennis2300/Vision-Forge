<template>
  <article v-if="character.artifacts.length > 0">
    <h1 class="divider mt-20 px-32 mb-5 tracking-wide">Best Artifacts</h1>
    <div class="w-full h-auto">
      <div
        class="flex flex-row justify-around items-center gap-12 bg-primary mx-24 w-auto py-10 rounded-2xl"
      >
        <div
          class="relative flex flex-col justify-center items-center bg-secondary rounded-2xl py-10 w-72 h-fit"
          v-if="character.artifacts?.length"
          v-for="artifact in character.artifacts"
        >
          <div class="absolute top-5 left-5">
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

          <div class="artifact-image rounded-xl">
            <img
              class="w-32"
              :src="artifact.artifact_id.flower_img_url"
              alt=""
            />
          </div>
          <p class="text-tertiary tracking-wide mt-8">
            {{ artifact.artifact_id.name }}
          </p>
        </div>
        <div class="tracking-wide" v-else>No Artifacts Assigned Yet</div>
      </div>
    </div>
  </article>
</template>

<script setup>
defineProps({
  character: Object,
});
</script>

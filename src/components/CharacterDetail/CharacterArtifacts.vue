<template>
  <article class="mr-24 w-1/2" v-if="character.artifacts.length > 0">
    <h1 id="artifacts" class="divider m-0 scroll-mt-12">Artifacts</h1>
    <section class="flex flex-col gap-2">
      <template v-for="(group, rank) in artifactsByRank" :key="rank">
        <div
          class="relative flex flex-col gap-8 bg-primary p-8 rounded-2xl mt-6"
        >
          <div
            v-for="artifact in group"
            :key="artifact.id"
            class="flex flex-row gap-4 items-center"
          >
            <img
              class="w-24 rounded-3xl rarity-5"
              v-if="artifact.artifact_id.flower_img_url"
              :src="artifact.artifact_id.flower_img_url"
              alt=""
            />
            <img
              class="w-24 rounded-3xl"
              v-if="!artifact.artifact_id.flower_img_url"
              src="https://placehold.co/96x96?text=N/A"
              alt=""
            />
            <div class="flex flex-col gap-3">
              <div class="flex flex-col">
                <span v-if="group.length === 2" class="text-tertiary"
                  >2-Piece</span
                >
                <span v-if="group.length === 1" class="text-tertiary"
                  >4-Piece</span
                >
                <h3 class="font-acme tracking-wide">
                  {{ artifact.artifact_id.name }}
                </h3>
              </div>
              <div class="flex flex-row gap-2">
                <p class="badge badge-soft badge-accent px-2">
                  {{ artifact.artifact_id.two_piece.name }}
                </p>
                <button
                  v-if="group.length === 1"
                  class="badge badge-soft badge-info px-2 cursor-pointer"
                  @click="openBox(artifact.artifact_id.four_piece)"
                >
                  View
                </button>
                <div
                  v-if="isOpen"
                  class="fixed inset-0 bg-black/25 flex items-center justify-center z-50"
                  @click.self="closeBox"
                >
                  <div class="bg-primary p-6 rounded-xl max-w-md w-full">
                    <h3 class="font-acme text-lg mb-2">4-Piece Effect</h3>

                    <p class="py-4 text-base/6">
                      {{ selectedFourPiece }}
                    </p>

                    <button
                      class="mt-4 btn btn-sm btn-primary px-4 py-2"
                      @click="closeBox"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="absolute top-3 right-3">
            <span
              class="relative flex items-center justify-center w-8 h-8 font-acme rounded-full border-2 border-white shadow-md overflow-hidden"
              :class="{
                'bg-gradient-to-b from-yellow-300 to-yellow-500 text-black animate-shine':
                  rank == 1,
                'bg-gradient-to-b from-gray-200 to-gray-400 text-black':
                  rank == 2,
                'bg-gradient-to-b from-amber-700 to-amber-900 text-white':
                  rank == 3,
              }"
            >
              {{ rank }}
            </span>
          </div>
        </div>
      </template>
    </section>
  </article>
  <article class="mr-24 w-1/2" v-else></article>
</template>

<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  character: Object,
});

const isOpen = ref(false);
const selectedFourPiece = ref("");

function openBox(text) {
  selectedFourPiece.value = text;
  isOpen.value = true;
}

function closeBox() {
  isOpen.value = false;
}

const artifactsByRank = computed(() => {
  const groups = {};

  for (const art of props.character.artifacts || []) {
    if (!groups[art.rank]) groups[art.rank] = [];
    groups[art.rank].push(art);
  }

  return groups;
});
</script>

<style scoped>
.rarity-5 {
  background: linear-gradient(145deg, #e7944a, #b56a2b);
  box-shadow:
    0px 0px 15px rgba(231, 148, 74, 0.8),
    0px 0px 30px rgba(231, 148, 74, 0.5);
}
</style>

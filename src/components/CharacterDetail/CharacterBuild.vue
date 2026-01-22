<template>
  <article v-if="character.builds.length" class="mx-24">
    <h1 id="builds" class="divider mb-6 mt-20 px-32 tracking-wide scroll-mt-12">
      Builds
    </h1>
    <div class="w-full h-auto flex flex-row justify-center gap-8">
      <div class="w-1/3 h-auto bg-primary p-6 rounded-xl">
        <div v-if="character.builds?.length" v-for="build in character.builds">
          <h2 class="divider">Main Stats</h2>
          <div class="flex flex-col gap-8 mt-4">
            <div
              v-for="slot of ['sands']"
              :key="slot"
              class="flex flex-row justify-between px-4"
            >
              <p class="capitalize font-acme">{{ slot }}</p>
              <p class="text-tertiary tracking-wide">
                {{
                  build.build_stat
                    .filter((stat) => stat.slot === slot)
                    .map((stat) => stat.stat_id.name)
                    .join(" or ")
                }}
              </p>
            </div>
            <div
              v-for="slot of ['goblet']"
              :key="slot"
              class="flex flex-row justify-between px-4"
            >
              <p class="capitalize font-acme">{{ slot }}</p>
              <p class="text-tertiary tracking-wide">
                {{
                  build.build_stat
                    .filter((stat) => stat.slot === slot)
                    .map((stat) => stat.stat_id.name)
                    .join(" / ")
                }}
              </p>
            </div>
            <div
              v-for="slot of ['circlet']"
              :key="slot"
              class="flex flex-row justify-between px-4"
            >
              <p class="capitalize font-acme">{{ slot }}</p>
              <p class="text-tertiary tracking-wide">
                {{
                  build.build_stat
                    .filter((stat) => stat.slot === slot)
                    .map((stat) => stat.stat_id.name)
                    .join(" or ")
                }}
              </p>
            </div>
          </div>
          <h2 class="divider mt-6">Substats</h2>
          <div
            class="flex flex-col mt-5"
            v-for="stat in build.build_stat
              .filter((s) => s.slot === 'substats')
              .sort((a, b) => a.rank - b.rank)"
            :key="stat.id"
          >
            <p class="text-tertiary tracking-wide">
              {{ stat.stat_id.name }}
            </p>
          </div>
        </div>
        <div v-else class="text-center tracking-wide">No Builds Yet</div>
      </div>
      <div class="w-2/3 h-auto bg-primary p-6 rounded-xl">
        <div v-if="character.builds?.length" v-for="build in character.builds">
          <MarkdownRender :content="build.notes" />
        </div>
        <div class="text-center tracking-wide" v-else>No Build Yet</div>
      </div>
    </div>
  </article>
</template>

<script setup>
import MarkdownRender from "@/components/MarkdownRender.vue";
defineProps({
  character: Object,
});
</script>

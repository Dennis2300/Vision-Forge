<template>
  <article v-if="character.builds.length > 0">
    <h1 class="divider mt-20 px-32 mb-5 tracking-wide">Build</h1>
    <div class="w-full h-auto">
      <div class="flex flex-row justify-between mx-24 w-auto min-h-96 gap-8">
        <!--Left-->
        <div class="bg-primary w-1/3 rounded-2xl p-6 h-fit">
          <div
            v-if="character.builds?.length"
            v-for="build in character.builds"
          >
            <h2 class="divider mt-0 tracking-wide">Main Stats</h2>
            <div class="flex flex-col gap-8">
              <!-- Sands -->
              <div
                class="flex flex-row justify-between"
                v-for="slot of ['sands']"
                :key="slot"
              >
                <p class="capitalize">{{ slot }}</p>
                <p class="text-tertiary tracking-wide">
                  {{
                    build.build_stat
                      .filter((stat) => stat.slot === slot)
                      .map((stat) => stat.stat_id.name)
                      .join(" or ")
                  }}
                </p>
              </div>
              <!-- Goblet -->
              <div
                class="flex flex-row justify-between"
                v-for="slot of ['goblet']"
                :key="slot"
              >
                <p class="capitalize">{{ slot }}</p>
                <p class="text-tertiary tracking-wide">
                  {{
                    build.build_stat
                      .filter((stat) => stat.slot === slot)
                      .map((stat) => stat.stat_id.name)
                      .join(" or ")
                  }}
                </p>
              </div>
              <!-- Circlet -->
              <div
                class="flex flex-row justify-between"
                v-for="slot of ['circlet']"
                :key="slot"
              >
                <p class="capitalize">{{ slot }}</p>
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
            <h2 class="divider mb-0 mt-6">Substats</h2>
            <div
              class="flex flex-col mt-5"
              v-for="stat in build.build_stat.filter(
                (s) => s.slot === 'substats'
              )"
              :key="stat.id"
            >
              <p class="text-tertiary tracking-wide">
                {{ stat.stat_id.name }}
              </p>
            </div>
          </div>
          <div v-else class="text-center tracking-wide">No Builds Yet</div>
        </div>
        <!--Right-->
        <div class="bg-primary w-2/3 rounded-2xl p-6">
          <div
            v-if="character.builds?.length"
            v-for="build in character.builds"
          >
            <MarkdownRender :content="build.notes" />
          </div>
          <div class="text-center tracking-wide" v-else>No Build Yet</div>
        </div>
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

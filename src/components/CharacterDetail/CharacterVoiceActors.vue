<template>
  <section class="voice-actor-container">
    <h2 class="divider tracking-wider">Voice Actors</h2>

    <template v-if="character.va?.length">
      <div class="flex flex-row justify-around">
        <!-- Languages -->
        <ul class="flex flex-col gap-2 list-none">
          <li v-for="item in sortedGroupedVA" :key="item.code">
            <span :class="`fi fi-${item.code}`"></span>
            <strong class="ml-2">{{ item.label }}:</strong>
          </li>
        </ul>

        <!-- Actors -->
        <ul class="flex flex-col gap-2 list-none">
          <li v-for="item in sortedGroupedVA" :key="item.code">
            <template v-if="item.actors.length">
              <template v-for="(a, index) in item.actors" :key="a.id">
                <template v-if="a.link">
                  <a :href="a.link" target="_blank" rel="noopener" class="link">
                    {{ a.name }}
                  </a>
                </template>
                <template v-else>
                  {{ a.name }}
                </template>
                <span v-if="index < item.actors.length - 1">&</span>
              </template>
            </template>
            <template v-else>No VA</template>
          </li>
        </ul>
      </div>
    </template>

    <p v-else class="text-center">No VA Announced Yet</p>
  </section>
</template>

<script setup>
defineProps({
  character: Object,
});
</script>

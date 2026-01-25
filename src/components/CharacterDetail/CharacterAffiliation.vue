<template>
    <h2 class="divider">Affiliation</h2>
    <template v-if="character.affiliations?.length">
      <div
        v-for="affiliation in character.affiliations"
        :key="affiliation.affiliation_id.id"
      >
        {{ affiliation.affiliation_id.name }}
      </div>
    </template>

    <div v-else>
      <p class="text-red-700">Not Revealed</p>
    </div>

  <!--   
    <section class="w-1/2">
    <h2 class="divider tracking-wider mb-4 font-acme">Affiliation</h2>

    <template v-if="character.affiliations?.length">
      <ul
        class="list-view tracking-wider flex flex-col items-center gap-2 list-none"
      >
        <li
          v-for="affiliation in character.affiliations"
          :key="affiliation.affiliation_id.id"
        >
          {{ affiliation.affiliation_id.name }}
        </li>
      </ul>
    </template>

    <div v-else class="flex justify-center items-center h-full">
      <p class="text-red-700">Not Revealed</p>
    </div>
  </section>
  -->
</template>

<script setup>
defineProps({
  character: Object,
});
</script>

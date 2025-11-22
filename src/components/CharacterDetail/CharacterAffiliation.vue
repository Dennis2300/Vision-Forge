<template>
  <section class="w-1/2">
    <h2 class="divider tracking-wider">Affiliation</h2>

    <template v-if="character.affiliations?.length">
      <ul
        class="list-view tracking-wide flex flex-col items-center gap-2 list-none"
      >
        <li
          v-for="affiliation in character.affiliations"
          :key="affiliation.affiliation_id.id"
        >
          {{ affiliation.affiliation_id.name }}
        </li>
      </ul>
    </template>

    <p v-else class="text-center">No Affiliations Revealed</p>
  </section>
</template>

<script setup>
defineProps({
  character: Object,
});
</script>

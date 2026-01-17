<template>
  <article>
    <h1 class="divider mt-20 px-32 mb-8 tracking-wide">Materials</h1>
    <!-- Ascension -->
    <div v-for="asc_mat in character.ascension_mats" :key="asc_mat.id">
      <img class="w-32" :src="asc_mat.materials_ascension_id.img_url" alt="" />
      <p>{{ asc_mat.materials_ascension_id.name }}</p>
      <strong>{{ asc_mat.amount }}</strong>
    </div>
    <!-- EXP -->
    <div v-for="exp_mat in character.exp_mats">
      <img class="w-32" :src="exp_mat.materials_exp_id.img_url" alt="" />
      <p>{{ exp_mat.materials_exp_id.name }}</p>
      <strong>{{ exp_mat.amount }}</strong>
    </div>
    <!-- Level Up -->
     <div v-for="lvl_mat in character.level_up_mats">
      <img class="w-32" :src="lvl_mat.materials_level_up_id.img_url" alt="">
      <p>{{ lvl_mat.materials_level_up_id.name }}</p>
      <strong>{{ lvl_mat.amount }}</strong>
     </div>
     <!-- Talent -->
      <div v-for="talent_mat in character.talent_mats">
        <img class="w-32" :src="talent_mat.materials_talent_id.img_url" alt="">
        <p>{{ talent_mat.materials_talent_id.name }}</p>
        <strong>{{ talent_mat.amount }}</strong>
      </div>
  </article>
</template>
<script setup>
defineProps({
  character: Object,
});
</script>

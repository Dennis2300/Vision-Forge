<template>
  <div>
    <h1>Weapons Archive</h1>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "./../supabaseClient.js";

onMounted(() => {
  console.log("Page Mounted");
});
</script>

<style scoped></style>

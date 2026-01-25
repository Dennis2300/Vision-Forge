<template>
  <div class="min-h-screen flex flex-col items-center my-4 gap-8">
    <TopSection />
    <MiddleSection />
    <UpdatesSection />
  </div>
</template>

<script setup>
import TopSection from "@/components/Home/TopSection.vue";
import MiddleSection from "@/components/Home/MiddleSection.vue";
import UpdatesSection from "@/components/UpdatesSection.vue";
</script>

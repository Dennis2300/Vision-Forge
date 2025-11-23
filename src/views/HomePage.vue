<template>
  <main class="w-[1400px] flex flex-col gap-8">
    <!-- top section -->
     <TopSection />
    <!-- middle section -->
     <MiddleSection />
    <!-- bottom section -->
    <UpdatesSection />
  </main>
</template>

<script setup>
import UpdatesSection from "./../components/UpdatesSection.vue";
import TopSection from "@/components/Home/TopSection.vue";
import MiddleSection from "@/components/Home/MiddleSection.vue";
</script>

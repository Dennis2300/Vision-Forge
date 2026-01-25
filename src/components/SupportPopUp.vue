<template>
  <div class="fixed top-16 right-1 m-4 z-10 cursor-pointer">
    <div
      @click="showPopup = !showPopup"
      class="text-white rounded-lg transition"
    >
      <img
        width="85"
        src="https://act-upload.hoyoverse.com/event-ugc-hoyowiki/2025/06/01/237301566/741d1a62ad6e8d6818c53c97eeccdce6_2278495532066979603.gif"
        alt=""
      />
    </div>

    <!-- Popup -->
    <SupportPopup v-if="showPopup" />
  </div>
</template>

<script setup>
const showPopup = ref(false);
</script>

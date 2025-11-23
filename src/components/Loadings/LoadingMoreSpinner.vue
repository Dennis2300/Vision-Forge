<template>
  <div class="waveform-spinner-container">
    <l-waveform
      class="waveform-spinner"
      :size="size"
      :stroke="stroke"
      :stroke-length="strokeLength"
      :bg-opacity="bgOpacity"
      :speed="speed"
      :color="color"
    ></l-waveform>
  </div>
</template>

<script setup>
import { waveform } from "ldrs"; // Import the waveform component
waveform.register(); // Register the component

// Define props for customization
defineProps({
  size: {
    type: Number,
    default: 10,
  },
  stroke: {
    type: Number,
    default: 1,
  },
  strokeLength: {
    type: Number,
    default: 0.15,
  },
  bgOpacity: {
    type: Number,
    default: 0.1,
  },
  speed: {
    type: Number,
    default: 1,
  },
  color: {
    type: String,
    default: "white",
  },
});
</script>

<style scoped>
.waveform-spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.waveform-spinner {
  transform: scale(3);
}
</style>

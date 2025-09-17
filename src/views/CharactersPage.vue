<template>
  <!-- Character Page Container -->
  
</template>

<script setup>
import { ref, onMounted } from "vue"; // Import the Vue composition API
import { supabase } from "./../supabaseClient.js"; // Import the Supabase client
// ----------------------------------------------------------
import "./../css/Ribbon.css"; // Import the CSS for the ribbon effect
import "ldrs/trefoil"; // Import the loading spinner component
// ----------------------------------------------------------
import LoadingSpinner from "./../components/LoadingSpinner.vue"; // Import the loading spinner component
import Errorcomponent from "./../components/ErrorComponent.vue"; // Import the error component

// Loading and error states
const loading = ref(true);
const error = ref(null);

// Data states
const characters = ref([]);



// Fetch characters on page load
onMounted(async () => {
  await GetAllCharacters();
  isNewCharacter();
});
</script>

<style scoped>
.characters-page-container {
  min-height: 100vh;
  width: 100vw;
}

.characters-page {
  /* background-color: darkcyan; */
  margin: 0px auto;
}

.page-header {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
  color: white;
  padding: 20px 0;
  /* background-color: darkslateblue; */
  border-bottom: 1px solid #eaecef;
  width: 1100px;
  height: 100px;
  margin: 0px auto;
}

.page-header h2 {
  font-family: var(--font-acme);
  letter-spacing: 2px;
  text-transform: uppercase;
  text-shadow: 3px 3px 8px rgba(0, 0, 0, 0.8);
}

.header-background {
  position: absolute;
  width: 90%;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  opacity: 0.4;
  z-index: -1;
}

.page-summary {
  max-width: 1100px;
  margin: 25px auto;
}

.page-summary p {
  font-family: var(--font-roboto);
  letter-spacing: 1px;
  color: #eaecef;
  line-height: 1.6;
  font-size: 1.1em;
  text-align: center;
}

.characters-display-container {
  display: flex;
  min-height: 100vh;
  max-width: 1300px;
  /* background-color: darkblue; */
  margin: 0px auto;
}

.offset {
  flex: 1;
  background-color: #44444e;
  padding: 30px;
  overflow-y: hidden;
  height: fit-content;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.character-display {
  flex: 4;
  padding-left: 30px;
}

.character-item {
  margin-bottom: 25px;
  height: 250px;
  padding: 0;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.character-info {
  position: relative;
  flex: 4;
  display: flex;
  flex-direction: row;
  padding: 20px;
  background-color: #5a5a65;
  align-items: center;
  z-index: 999;
}

.character-details {
  flex: 1;
  padding: 20px;
  background-color: #44444e;
  display: flex;
  align-items: center;
  align-items: center;
  border-top: 2px solid black;
  z-index: 999;
}

.character-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}

.character-name {
  text-transform: uppercase;
  font-family: var(--font-acme);
  letter-spacing: 1.5px;
  margin-top: 10px;
  text-shadow: 3px 3px 8px rgba(0, 0, 0, 0.8);
}

.vision-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.character-item-details {
  height: 100px;
  background-color: #44444e;
}

@media (max-width: 768px) {
  .characters-display-container {
    flex-direction: column;
  }

  .offset {
    max-height: none;
    margin-bottom: 20px;
  }

  .character-display {
    padding-left: 0;
  }
}

.rarity-5 .character-avatar {
  background: linear-gradient(145deg, #e7944a, #b56a2b);
  box-shadow: 0px 0px 15px rgba(231, 148, 74, 0.8),
    0px 0px 30px rgba(231, 148, 74, 0.5);
}

.rarity-4 .character-avatar {
  background: linear-gradient(145deg, #9b72d5, #7149a3);
  box-shadow: 0px 0px 15px rgba(155, 114, 213, 0.8),
    0px 0px 30px rgba(155, 114, 213, 0.5);
}

.tag {
  background-color: #6c6c78;
  color: white;
  padding: 10px;
  border-radius: 5px;
  font-size: 1rem;
  letter-spacing: 1px;
  font-family: var(--font-roboto);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  margin-left: 10px;
  border: 1.5px solid black;
}

.upcoming {
  font-size: 0.5em;
}

.new {
  font-size: 0.8em;
}

.character-splash-art {
  position: absolute;
  object-fit: cover;
  width: 35%;
  right: 0;
  opacity: 0.3;
  z-index: -1;
}

.release-date {
  margin-left: auto;
}

.page-to-top-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #44444e;
  color: white;
  border: none;
  border-radius: 10px;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.to-top-button:hover {
  background-color: #666673;
}

.filter-to-top-button {
  background-color: var(--filter-color);
  color: white;
  border: none;
  font-family: var(--font-acme);
  border-radius: 10px;
  font-size: 0.5em;
  letter-spacing: 1px;
  padding: 5px 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1.5px solid black;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.no-characters-found {
  text-align: center;
  color: white;
}

.no-characters-found img {
  width: 200px;
  margin-bottom: 20px;
}

.no-characters-found p {
  font-size: 2em;
  font-family: var(--font-roboto);
}
</style>

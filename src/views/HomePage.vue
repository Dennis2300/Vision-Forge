<template>
  <div class="home-page-container my-10">
    <div class="top-section">
      <div class="logo-section">
        <div class="logo-section-image-container">
          <h1>image</h1>
        </div>
        <div class="logo-section-text-container">
          <h1>text</h1>
        </div>
      </div>
      <div class="character-archives-section">
        <div class="character-archives-image-container">
          <h1>image</h1>
        </div>
        <div class="character-archives-text-container">
          <h1>Character Archives</h1>
        </div>
      </div>
    </div>
    <div>
      <h1>Weapon Archives</h1>
    </div>
    <div>
      <h1>Artifact Archives</h1>
    </div>
    <div>
      <h1>About</h1>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.home-page-container {
  background-color: darkblue;
  width: 1200px;
  min-height: 100vh;
}

.top-section {
  background-color: darkcyan;
  display: flex;
  justify-content: space-between;
  height: 500px;
  gap: 50px;
}

.logo-section {
  flex: 3;
  background-color: darkgoldenrod;
  display: flex;
  flex-direction: column;
}

.logo-section-image-container {
  background-color: darkred;
  flex: 4;
}

.logo-section-text-container {
  background-color: darkorange;
  flex: 2;
}

.character-archives-section {
  background-color: darkgreen;
  flex: 1.5;
  display: flex;
  flex-direction: column;
}

.character-archives-image-container {
  background-color: darkmagenta;
  flex: 4;
}

.character-archives-text-container {
  background-color: darkslateblue;
  flex: 2;
}
</style>

<template>
  <div class="home-page-container my-10">
    <div class="top-section">
      <div class="logo-section">
        <div class="logo-section-image-container">
          <img
            class="logo-section-image"
            src="https://upload-static.hoyoverse.com/hoyolab-wiki/2023/06/07/77454259/f112bf27e882975263853d08a2bc59cf_723534462216373407.png?x-oss-process=image%2Fformat%2Cwebp"
            alt=""
          />
        </div>
        <div class="logo-section-text-container">
          <h1>Welcome to Teyvat Bulletin</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
            nam impedit reiciendis, facere alias perspiciatis veritatis fugit
            necessitatibus neque molestiae eum dolorem omnis expedita quaerat
            placeat fugiat facilis, quos ea?
          </p>
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
  width: 1200px;
  min-height: 100vh;
}

.top-section {
  display: flex;
  justify-content: space-between;
  height: 500px;
  gap: 50px;
}

.logo-section {
  flex: 3;
  display: flex;
  flex-direction: column;
}

.logo-section-image-container {
  flex: 4;
  overflow: hidden;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}

.logo-section-image {
  width: 100%;
  object-fit: contain;
  opacity: 0.9;
}

.logo-section-text-container {
  flex: 1.5;
  background-color: var(--secondary);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0px 20px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
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

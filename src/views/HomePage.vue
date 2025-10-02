<template>
  <div class="home-page-container my-10">
    <!-- top section -->
    <div class="top-section mb-10">
      <!-- left -->
      <div class="left-top-section">
        <div class="left-top-image-container top-border-radius">
          <img
            src="https://upload-os-bbs.hoyolab.com/upload/2023/12/21/17138284/dcac628daf58a58c063a44d01ca5b5a4_2766695209517554964.jpg?x-oss-process=image%2Fresize%2Cs_1000%2Fauto-orient%2C0%2Finterlace%2C1%2Fformat%2Cwebp%2Fquality%2Cq_70"
            alt=""
          />
        </div>
        <div class="left-top-text-container bottom-border-radius">
          <h1 class="title-style">Welcome to Vision Forge</h1>
          <p class="paragraph-style mt-2">
            Vision Forge is a simple, fan-made space where you can find
            character builds, materials, and team compositions for Genshin
            Impact. My goal is to cut through the complexity and help you forge
            your perfect character.
          </p>
          <p class="paragraph-style mt-2">
            This isn't a pro-level guide, just a fun project where I explore and
            find what works best for me. Hope you find something useful here!
            and enjoy your time in Teyvat!
          </p>
        </div>
      </div>
      <!-- right -->
      <div class="right-top-section">
        <div class="right-top-image-container top-border-radius">
          <img
            src="https://upload-os-bbs.hoyolab.com/upload/2024/05/25/249619589/75f9ad47418f6a9494ac0ddcd5d5c121_4821498387284791483.jpeg"
            alt=""
          />
        </div>
        <div class="right-top-text-container bottom-border-radius">
          <h1 class="title-style">Character Archive</h1>
          <p class="paragraph-style mt-2">
            Here you can find a comprehensive list of all characters available
            in Genshin Impact
          </p>
          <div class="flex justify-center mt-8">
            <router-link class="btn btn-primary w-32" to="/characters">
              See Characters
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <!-- middle section -->
    <div class="middle-section mb-10">
      <div class="middle-left-section">
        <div class="middle-left-image-container top-border-radius">
          <img
            class="image-scale"
            src="https://act-upload.hoyoverse.com/event-ugc-hoyowiki/2025/06/20/151578876/18fe3a217db8d3e2237c66e21545d43c_1223137722623728172.png?x-oss-process=image%2Fformat%2Cwebp"
            alt=""
          />
        </div>
        <div class="middle-left-text-container bottom-border-radius">
          <h1 class="title-style">Weapon Archive</h1>
          <p class="paragraph-style mt-2">
            Here you can find a list of all weapons available in Genshin Impact.
            With their materials, stats and attributes.
          </p>
          <div class="flex justify-center">
            <router-link class="btn btn-primary w-32 mt-5 mb-2" to="/weapons">
              See Weapons
            </router-link>
          </div>
        </div>
      </div>
      <div class="middle-right-section">
        <div class="middle-right-image-container top-border-radius">
          <img
            src="https://upload-os-bbs.hoyolab.com/upload/2024/03/09/17138284/bde28406fa1c0ab83ee611ed1dde5a5e_3434874239524736953.png?x-oss-process=image%2Fresize%2Cs_1000%2Fauto-orient%2C0%2Finterlace%2C1%2Fformat%2Cwebp%2Fquality%2Cq_70"
            alt=""
          />
        </div>
        <div class="middle-right-text-container bottom-border-radius">
          <h1 class="title-style">Artifact Archive</h1>
          <p class="paragraph-style mt-2">
            Here you can find a list of all artifacts available in Genshin
            Impact. With their set bonuses and where to farm them.
          </p>
          <div class="flex justify-center">
            <router-link class="btn btn-primary w-32 mt-5 mb-2" to="/artifacts">
              See Artifacts
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <!-- bottom section -->
    <div class="bottom-section">
      <h1>Updates</h1>
    </div>
  </div>
</template>

<style scoped>
.home-page-container {
  width: 1200px;
  min-height: 100vh;
}

/* Top Section */
.top-section {
  display: flex;
  height: fit-content;
  gap: 3rem;
}

.left-top-section {
  flex: 3;
  display: flex;
  flex-direction: column;
  border: 1.5px solid var(--tertiary);
  border-radius: 15px;
}

.right-top-section {
  flex: 1.5;
  display: flex;
  flex-direction: column;
  border: 1.5px solid var(--tertiary);
  border-radius: 15px;
}

.left-top-image-container {
  overflow: hidden;
  object-fit: cover;
  flex: 4;
}

.right-top-image-container {
  overflow: hidden;
  flex: 4;
}

.left-top-text-container {
  background-color: var(--secondary);
  flex: 1.5;
  padding: 0.75rem 1.5rem 1.5rem 1.5rem;
  border-top: 1px solid var(--tertiary);
}

.right-top-text-container {
  background-color: var(--secondary);
  flex: 1.5;
  padding: 0.75rem 1.5rem 1.5rem 1.5rem;
}

/* Middle Section */
.middle-section {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 3rem;
}

.middle-left-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  border: 1.5px solid var(--tertiary);
  border-radius: 15px;
}

.middle-right-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  border: 1.5px solid var(--tertiary);
  border-radius: 15px;
}

.middle-left-image-container {
  overflow: hidden;
  object-fit: cover;
  flex: 4;
}

.middle-right-image-container {
  overflow: hidden;
  object-fit: cover;
  flex: 4;
}

.middle-left-text-container {
  background-color: var(--secondary);
  flex: 1.5;
  padding: 0.75rem 1.5rem 1.5rem 1.5rem;
}

.middle-right-text-container {
  background-color: var(--secondary);
  flex: 1.5;
  padding: 0.75rem 1.5rem 1.5rem 1.5rem;
}

/* Text Styles */
.title-style {
  font-family: var(--font-acme);
  font-size: 2rem;
  letter-spacing: 1px;
  color: var(--tertiary);
}

.paragraph-style {
  font-family: var(--font-roboto);
  letter-spacing: 0.5px;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 1);
}
/* Image */
.top-border-radius {
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}
.bottom-border-radius {
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
}
.image-container {
  width: 100%;
  overflow: hidden;
  flex: 4;
  object-fit: cover;
}

.image-scale {
  transform: scale(1.5);
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* button */
.btn {
  text-decoration: none;
  font-family: var(--font-roboto);
  letter-spacing: 1px;
}
</style>

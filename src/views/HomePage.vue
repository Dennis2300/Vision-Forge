<template>
  <div class="home-page-container my-10">
    <div class="top-section">
      <div class="logo-section">
        <div class="logo-section-image-container">
          <img
            class="logo-section-image"
            src="https://upload-os-bbs.hoyolab.com/upload/2023/12/21/17138284/dcac628daf58a58c063a44d01ca5b5a4_2766695209517554964.jpg?x-oss-process=image%2Fresize%2Cs_1000%2Fauto-orient%2C0%2Finterlace%2C1%2Fformat%2Cwebp%2Fquality%2Cq_70"
            alt=""
          />
        </div>
        <div class="logo-section-text-container">
          <div class="mb-3">
            <h1>Welcome to Vision Forge</h1>
          </div>
          <p class="mb-1">
            Vision Forge is a simple, fan-made space where you can find
            character builds, materials, and team compositions for Genshin
            Impact. My goal is to cut through the complexity and help you forge
            your perfect character.
          </p>
          <p>
            This isn't a pro-level guide, just a fun project where I explore and
            find what works best for me. I hope you find something useful here!
            and enjoy your time in Teyvat!
          </p>
        </div>
      </div>
      <div class="character-archives-section">
        <div class="character-archives-image-container">
          <img
            class="character-archives-image"
            src="https://upload-os-bbs.hoyolab.com/upload/2024/05/25/249619589/75f9ad47418f6a9494ac0ddcd5d5c121_4821498387284791483.jpeg"
            alt=""
          />
        </div>
        <div class="character-archives-text-container">
          <div class="mb-3">
            <h1>Character Archives</h1>
          </div>
          <p>
            Here you can find a comprehensive list of all characters available
            in Genshin Impact
          </p>
          <div class="flex justify-center mt-5">
            <router-link to="/characters" class="btn btn-primary"
              >Explore Characters
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="middle-section">
      <div class="weapon-archives-container">
        <div class="weapon-archives-image-container">
          <img class="weapon-archives-image" src="" alt="" />
        </div>
        <div class="weapon-archives-text-container">
          <h1>Weapon Archives</h1>
        </div>
      </div>
      <div class="artifact-archives-container">
        <div class="artifact-archives-image-container">
          <img
            class="artifact-archives-image"
            src="https://upload-os-bbs.hoyolab.com/upload/2024/03/09/17138284/bde28406fa1c0ab83ee611ed1dde5a5e_3434874239524736953.png?x-oss-process=image%2Fresize%2Cs_1000%2Fauto-orient%2C0%2Finterlace%2C1%2Fformat%2Cwebp%2Fquality%2Cq_70"
            alt=""
          />
        </div>
        <div class="artifact-archives-text-container">
          <h1>Artifact Archives</h1>
        </div>
      </div>
    </div>
    <div class="bottom-section">
      <h1>About</h1>
    </div>
  </div>
</template>

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
  border: 1px solid var(--tertiary);
  border-radius: 15px;
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
  opacity: 0.8;
}

.logo-section-text-container {
  background-color: var(--secondary);
  flex: 2;
  padding: 20px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
}

.character-archives-section {
  flex: 1.5;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--tertiary);
  border-radius: 15px;
}

.character-archives-image-container {
  flex: 4;
  overflow: hidden;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}

.character-archives-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.8;
}

.character-archives-text-container {
  background-color: var(--secondary);
  flex: 2;
  padding: 20px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
}

.logo-section-text-container h1,
.character-archives-text-container h1 {
  font-size: 24px;
  font-family: var(--font-acme);
  letter-spacing: 0.5px;
}

.logo-section-text-container p,
.character-archives-text-container p {
  font-size: 14px;
  line-height: 1.5;
  font-family: var(--font-roboto);
  letter-spacing: 1px;
}

.middle-section {
  display: flex;
  justify-content: space-around;
  margin-top: 2rem;
  gap: 50px;
  height: fit-content;
}

.weapon-archives-container {
  background-color: var(--secondary);
  border-radius: 15px;
  height: 500px;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.artifact-archives-container {
  background-color: var(--secondary);
  border-radius: 15px;
  height: 500px;
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--tertiary);
  border-radius: 15px;
}

.weapon-archives-image-container {
  background-color: darkcyan;
  flex: 4;
}

.weapon-archives-image {
  object-fit: cover;
  opacity: 0.8;
}

.weapon-archives-text-container {
  background-color: darkgoldenrod;
  flex: 2;
}

.artifact-archives-image-container {
  flex: 4;
}

.artifact-archives-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.8;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}

.artifact-archives-text-container {
  background-color: var(--secondary);
  flex: 2;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
}

.bottom-section {
  background-color: var(--secondary);
  margin-top: 2rem;
  height: 300px;
  border-radius: 15px;
  padding: 20px;
}

.btn {
  text-decoration: none;
  font-size: 16px;
  font-family: var(--font-acme);
  color: var(--tertiary);
  letter-spacing: 1px;
}
</style>

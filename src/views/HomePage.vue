<template>
  <div class="home-page-container my-10">
    <!-- top section -->
    <div class="top-section">
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
          <p class="my-3 paragraph-style">
            Vision Forge is a simple, fan-made space where you can find
            character builds, materials, and team compositions for Genshin
            Impact. My goal is to cut through the complexity and help you forge
            your perfect character.
          </p>
          <p class="paragraph-style">
            This isn't a pro-level guide, just a fun project where I explore and
            find what works best for me. I hope you find something useful here!
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
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Temporibus, harum similique optio perspiciatis tempora dolore quam
            ratione officia, tempore fugit, esse quos earum neque sit placeat
            magnam voluptates tenetur cum?
          </p>
        </div>
      </div>
    </div>
    <!-- middle section -->
    <div class="middle-section">
      <div class="">
        <div class="image-container">
          <img
            class=""
            src="https://act-upload.hoyoverse.com/event-ugc-hoyowiki/2025/06/20/151578876/18fe3a217db8d3e2237c66e21545d43c_1223137722623728172.png?x-oss-process=image%2Fformat%2Cwebp"
            alt=""
          />
        </div>
        <div class=""></div>
      </div>
      <div class="">
        <div class="image-container">
          <img
            src="https://upload-os-bbs.hoyolab.com/upload/2024/03/09/17138284/bde28406fa1c0ab83ee611ed1dde5a5e_3434874239524736953.png?x-oss-process=image%2Fresize%2Cs_1000%2Fauto-orient%2C0%2Finterlace%2C1%2Fformat%2Cwebp%2Fquality%2Cq_70"
            alt=""
          />
        </div>
        <div class=""></div>
      </div>
    </div>

    <!-- bottom section -->
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
}

.left-top-image-container {
  overflow: hidden;
  flex: 4;
  object-fit: cover;
}

.left-top-text-container {
  background-color: var(--secondary);
  flex: 1;
  padding: 1.5rem;
}

.right-top-section {
  flex: 1.5;
  display: flex;
  flex-direction: column;
}

.right-top-image-container {
  overflow: hidden;
  flex: 4;
}

.right-top-text-container {
  background-color: var(--secondary);
  flex: 2;
  padding: 1.5rem;
}

/* Text Styles */
.title-style {
  font-family: var(--font-acme);
  font-size: 2rem;
  letter-spacing: 1px;
}

.paragraph-style {
  font-family: var(--font-roboto);
  letter-spacing: 0.5px;
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

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>

<template>
  <div class="left-nav flex flex-row items-end">
    <RouterLink class="nav-logo" to="/">
      <img
        class="logo"
        loading="lazy"
        src="./../assets/images/icons/webIcon.webp"
        alt=""
      />
      <span class="nav-title">Vision Forge</span>
    </RouterLink>
    <p class="text-sm ml-1">Beta v0.1</p>
  </div>
  <div class="middle-nav"></div>
  <div class="right-nav">
    <RouterLink class="nav-item" to="/">Home</RouterLink>
    <RouterLink class="nav-item" to="/characters">Characters</RouterLink>
    <RouterLink class="nav-item" to="/weapons">Weapons</RouterLink>
    <RouterLink class="nav-item" to="/artifacts">Artifacts</RouterLink>
    <RouterLink class="nav-item" to="/current-banner"
      >Current Banner</RouterLink
    >
    <RouterLink class="nav-item" to="/about">About</RouterLink>
  </div>
</template>

<style scoped>
.left-nav {
  justify-self: start;
  margin-left: 25px;
}

.middle-nav {
  display: flex;
  align-items: center;
  justify-self: center;
  gap: 1.5rem;
  font-family: var(--font-acme);
}

.right-nav {
  display: flex;
  align-items: center;
  justify-self: end;
  margin-right: 25px;
  gap: 2rem;
}

.nav-item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: white;
  height: 60px;
  width: fit-content;
  transition: color 0.3s ease;
  font-family: var(--font-acme);
}

.nav-item::before {
  content: "";
  display: block;
  height: 3px;
  background-color: var(--tertiary);
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0%;
  transition: width 250ms ease-in-out;
}

.nav-item:hover {
  color: var(--tertiary);
  cursor: pointer;
}

.nav-item:hover::before {
  width: 100%;
}

.nav-logo {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.nav-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
  font-family: var(--font-bungee);
}

.logo {
  height: 50px;
  width: 50px;
  margin-right: 5px;
}
</style>

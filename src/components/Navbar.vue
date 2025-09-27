<template>
  <div class="navbar-container">
    <div class="left-nav">
      <router-link class="nav-logo" to="/">
        <img class="logo" src="./../assets/images/icons/webIcon.webp" alt="" />
        <span class="nav-title">Teyvat Bulletin</span>
      </router-link>
    </div>
    <div class="middle-nav">
      <router-link class="nav-item" to="/characters">Characters</router-link>
      <router-link class="nav-item" to="/weapons">Weapons</router-link>
      <router-link class="nav-item" to="/artifacts">Artifacts</router-link>
      <router-link class="nav-item" to="/about">About</router-link>
    </div>
    <div class="right-nav"></div>
  </div>
</template>

<style scoped>
.navbar-container {
  background-color: var(--secondary);
  display: grid;
  height: 60px;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  color: white;
  font-family: var(--font-acme);
  letter-spacing: 1px;
  font-size: 1.3rem;
}

.left-nav {
  justify-self: start;
  margin-left: 25px;
}

.middle-nav {
  display: flex;
  align-items: center;
  justify-self: center;
}

.right-nav {
  justify-self: end;
  margin-right: 25px;
}

.nav-item {
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: white;
  height: 60px;
  padding: 0 20px;
  transition: background-color 0.3s ease;
}

.nav-item:hover {
  background-color: var(--filter-color-hover);
  cursor: pointer;
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
}

.logo {
  height: 50px;
  width: 50px;
  margin-right: 5px;
}
</style>

<script lang="ts" setup>
import { RouterLink } from 'vue-router'
const homeIconWhite = new URL('../assets/icons/home-icon.svg', import.meta.url).href
const homeIconBlue = new URL('../assets/icons/home_icon_blue.svg', import.meta.url).href
</script>

<template>
  <div class="sidebar">
    <div class="sidebar-logo">
      <img src="../assets/images/white-logo.png" />
    </div>
    <nav class="sidebar-navigation">
      <RouterLink to="/home" class="sidebar-link" activeClass="sidebar-link--active">
        <img :src="$route.path === '/home' ? homeIconBlue : homeIconWhite" />

        Home</RouterLink
      >
      <RouterLink to="/notes" class="sidebar-link" activeClass="sidebar-link--active">
        <img src="../assets/icons/pen_icon.svg" />
        Notes</RouterLink
      >
      <RouterLink to="/tips" class="sidebar-link" activeClass="sidebar-link--active">
        <img src="../assets/icons/lamp_bulb.svg" />
        Tips</RouterLink
      >
      <RouterLink to="/about" class="sidebar-link" activeClass="sidebar-link--active">
        <img src="../assets/icons/question_mark_icon.svg" />
        About</RouterLink
      >
    </nav>
  </div>
</template>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #060077;
}

.sidebar-logo {
  max-width: 10rem;
  margin-inline: 6rem;
  margin-block: 3rem;
}

.sidebar-navigation {
  display: flex;
  flex-direction: column;
  color: #ffffff;
  margin-inline: 6rem;
  gap: 1rem;
}

.sidebar-link {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
}

.sidebar-link--active {
  background-color: #ffffff;
  color: #060077;
  padding: 1rem;
  border-radius: 10px;
}
</style>

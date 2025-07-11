<script lang="ts" setup>
import { watch, ref } from 'vue'
import { useUserStore } from '@/stores/user'

const store = useUserStore()
const showLogout = ref(false)

watch(
  () => store.authToken,
  async (newToken) => {
    if (newToken) {
      await store.fetchUser()
    } else {
      store.user = null
    }
  },
  { immediate: true }
)

function clickOnArrow() {
  showLogout.value = !showLogout.value
}

function logoutUser() {
  store.logout()
}
</script>

<template>
  <div class="main__layout">
    <div class="main__layout-left">
      <slot name="navigation"></slot>
    </div>
    <div class="main__layout-right">
      <div class="main__layout-right-header">
        <div class="main__layout-right-title">Hello, {{ store.user?.firstName }}</div>
        <div class="main__layout-right-user__profile">
          <img src="../assets/icons/user-profile-icon.svg" />

          <div>{{ store.user?.firstName }} {{ store.user?.lastName }}</div>
          <div class="main__layout-right-clickable-part">
            <button type="button" class="main__layout-right-button" @click="clickOnArrow">
              <img src="../assets/icons/arrow_down.svg" />
            </button>
            <div v-if="showLogout" class="main__layout-right-logout-box">
              <button type="button" class="main__layout-right-logout-box-title" @click="logoutUser">
                Log out
              </button>
            </div>
          </div>
        </div>
      </div>
      <RouterView></RouterView>
    </div>
  </div>
</template>

<style scoped>
.main__layout {
  display: flex;
  flex-direction: row;
}
.main__layout-left {
  width: 25%;
}

.main__layout-right {
  background-color: #f5f5f5;
  width: 75%;
}

.main__layout-right-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.main__layout-right-title {
  color: #55555b;
  font-weight: 700;
  font-size: 1.5rem;
  margin: 2rem 4rem;
}

.main__layout-right-user__profile {
  display: flex;
  position: relative;
  flex-direction: row;
  align-items: center;
  gap: 2rem;

  background-color: #ffffff;
  color: #55555b;
  margin: 2rem 4rem;
  padding: 1rem 2rem;
  border-radius: 30px;
}

.main__layout-right-button {
  cursor: pointer;
  padding: 1rem;
}

.main__layout-right-logout-box {
  padding: 1.5rem 4rem;
  background-color: #ffffff;
  margin: 0.5rem;
  position: absolute;
  top: 100%;
  right: 0%;
  border-radius: 20px;
  color: #e01c8b;
  font-weight: 600;
}

.main__layout-right-logout-box-title {
  cursor: pointer;
  padding: 1rem;
}

.main__layout-right-clickable-part {
  display: flex;
  flex-direction: column;
}
</style>

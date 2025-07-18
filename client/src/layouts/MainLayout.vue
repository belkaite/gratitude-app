<script lang="ts" setup>
import { watch, ref, defineProps } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

const router = useRouter()

const store = useUserStore()
const showLogout = ref(false)

defineProps<{ pageTitle: string }>()

watch(
  () => store.authToken,
  async (newToken) => {
    if (newToken) {
      await store.fetchUser()
    } else {
      store.user = null
      router.push('/login')
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
  <div v-if="store.isLoggedin" class="main-layout">
    <div class="main-layout__left">
      <slot name="navigation"></slot>
    </div>
    <div class="main-layout__right">
      <div class="main-layout__right-header">
        <div class="main-layout__right-title">{{ pageTitle }} {{ store.user?.firstName }}</div>
        <div class="main-layout__right-user-profile">
          <img src="../assets/icons/user-profile-icon.svg" />

          <div>{{ store.user?.firstName }} {{ store.user?.lastName }}</div>
          <div class="main-layout__right-clickable-part">
            <button type="button" class="main-layout__right-button" @click="clickOnArrow">
              <img src="../assets/icons/arrow_down.svg" />
            </button>
            <div v-if="showLogout" class="main-layout__right-logout-box">
              <button type="button" class="main-layout__right-logout-box-title" @click="logoutUser">
                Log out
              </button>
            </div>
          </div>
        </div>
      </div>
      <slot name="page-content"></slot>
      <RouterView></RouterView>
    </div>
  </div>
  <div v-if="!store.isLoggedin">
    <RouterLink to="/login"></RouterLink>
  </div>
</template>

<style scoped>
.main-layout {
  display: flex;
  flex-direction: row;
}
.main-layout__left {
  width: 25rem;
}

.main-layout__right {
  background-color: #f5f5f5;
  width: 75%;
}

.main-layout__right-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.main-layout__right-title {
  color: #55555b;
  font-weight: 700;
  font-size: 1.5rem;
  margin: 2rem 4rem;
}

.main-layout__right-user-profile {
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

.main-layout__right-button {
  cursor: pointer;
  padding: 1rem;
}

.main-layout__right-logout-box {
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

.main-layout__right-logout-box-title {
  cursor: pointer;
  padding: 1rem;
}

.main-layout__right-clickable-part {
  display: flex;
  flex-direction: column;
}
</style>

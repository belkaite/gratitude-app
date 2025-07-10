<script lang="ts" setup>
import { watch } from 'vue'
import { useUserStore } from '@/stores/user'


const store = useUserStore()

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
          <img src="../assets/icons/arrow_down.svg" />
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
  flex-direction: row;
  align-items: center;
  gap: 2rem;

  background-color: #ffffff;
  color: #55555b;
  margin: 2rem 4rem;
  padding: 1rem 2rem;
  border-radius: 30px;
}
</style>

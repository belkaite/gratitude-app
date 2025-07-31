<script lang="ts" setup>
import { watch, ref, defineProps } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import Modal from '@/components/Modal.vue'

const oldPassword = ref('')
const newPassword = ref('')
const successMessage = ref('')
const errorMessage = ref('')

const router = useRouter()

const store = useUserStore()
const showLogout = ref(false)
const isPassChangeModalOpen = ref(false)

function openPassChangeModal() {
  isPassChangeModalOpen.value = true
}

function closeModal() {
  isPassChangeModalOpen.value = false
}

async function submitPasswordChange() {
  try {
    const message = await store.changePassword({
      currentPassword: oldPassword.value,
      newPassword: newPassword.value,
    })
    successMessage.value = message
    setTimeout(() => {
      successMessage.value = ''
    }, 6000)
    oldPassword.value = ''
    newPassword.value = ''
  } catch (error: any) {
    errorMessage.value = error?.message ?? 'Something went wrong.'
  }
}

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
      <div class="main-layout__right-display">
        <div class="main-layout__right-header">
          <div class="main-layout__right-title">{{ pageTitle }} {{ store.user?.firstName }}</div>
          <div class="main-layout__right-user-profile">
            <img src="../assets/icons/user-profile-icon.svg" />

            <div class="main-layout__user-name">
              {{ store.user?.firstName }} {{ store.user?.lastName }}
            </div>
            <div class="main-layout__right-clickable-part">
              <button type="button" class="main-layout__right-button" @click="clickOnArrow">
                <img src="../assets/icons/arrow_down.svg" />
              </button>
              <div v-if="showLogout" class="main-layout__right-logout-box">
                <button
                  type="button"
                  class="main-layout__right-logout-box-title"
                  @click="openPassChangeModal"
                >
                  Change password
                </button>
                <button
                  type="button"
                  class="main-layout__right-logout-box-title"
                  @click="logoutUser"
                >
                  Log out
                </button>
                <Modal height="500px" v-if="isPassChangeModalOpen" @close="closeModal">
                  <label>
                    Current password:
                    <input v-model="oldPassword" />
                  </label>
                  <label>
                    New password:
                    <input v-model="newPassword" />
                  </label>
                  <button
                    class="main_layout__submit-button"
                    type="button"
                    @click="submitPasswordChange"
                  >
                    Submit
                  </button>
                  <div v-if="successMessage" class="main-layout__success">
                    {{ successMessage }}
                  </div>
                  <div v-else-if="errorMessage" class="main-layout__error">
                    {{ errorMessage }}
                  </div>
                </Modal>
              </div>
            </div>
          </div>
        </div>
        <slot name="page-content"></slot>
        <RouterView></RouterView>
      </div>
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
  height: 100vh;
}
.main-layout__left {
  width: 25rem;
}

.main-layout__right {
  background-color: #f5f5f5;
  width: 100%;
}

.main-layout__right-display {
  max-width: 1300px;
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
  box-shadow: 0.25px 0.25px 20px 0.5px rgba(0, 0, 0, 0.1);

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
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1.5rem 4rem;
  background-color: #ffffff;
  margin: 0.5rem;
  position: absolute;
  top: 100%;
  right: 0%;
  border-radius: 20px;
  color: #e01c8b;
  font-weight: 600;
  box-shadow: 0.25px 0.25px 20px 0.5px rgba(0, 0, 0, 0.1);
}

.main-layout__right-logout-box-title {
  cursor: pointer;
  padding: 1rem;
  text-align: left;
}

.main-layout__right-clickable-part {
  display: flex;
  flex-direction: column;
}

.main-layout__success {
  border: 2px solid;
  border-radius: 5px;
  padding-block: 0.5rem;
  padding-inline: 1rem;
  background-color: #e6fffc;
  color: #025e52;
  margin-top: 2rem;
}

.main-layout__error {
  display: flex;
  flex-direction: row;
  gap: 10px;
  border: 2px solid;
  border-radius: 5px;
  padding-block: 0.5rem;
  padding-inline: 1rem;
  margin-top: 2rem;
  background-color: #ffe6e6;
  color: #a00404;
}

.main_layout__submit-button {
  background-color: #2419ee;
  color: white;
  padding-inline: 2rem;
  padding-block: 0.5rem;
  border-radius: 15px;
  margin-block: 1rem;
  height: 2.5rem;
  cursor: pointer;
}

@media (width <= 600px) {
  .main-layout {
    display: flex;
    flex-direction: column;
  }

  .main-layout__left,
  .main-layout__right {
    width: 100%;
  }

  .main-layout__right {
    min-height: 100vh;
  }

  .main-layout__right-header {
    display: flex;
    flex-direction: row;
    gap: 1px;
    width: 100%;
  }

  .main-layout__right-title {
    font-size: 16px;
  }

  .main-layout__right-user-profile {
    font-size: 12px;
  }

  .main-layout__user-name {
    display: none;
  }
}
</style>

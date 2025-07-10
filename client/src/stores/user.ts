import { getStoredAccessToken, storeAccessToken } from '@/utils/auth'
import { defineStore } from 'pinia'
import { trpc } from '@/trpc'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const authToken = ref(getStoredAccessToken(localStorage))
  const user = ref()

  async function login(payload: { email: string; password: string }) {
    const { accessToken } = await trpc.user.login.mutate(payload)
    storeAccessToken(localStorage, accessToken)

    authToken.value = accessToken
  }

  async function signup(payload: {
    firstName: string
    lastName: string
    email: string
    password: string
  }) {
    return await trpc.user.signup.mutate(payload)
  }

  async function fetchUser() {
    user.value = await trpc.user.getUser.query()
  }

  //   const authUserId = computed(() => (authToken.value ? getUserFromToken(authToken.value) : null))

  return {
    authToken,
    login,
    signup,
    fetchUser,
    user,
  }
})

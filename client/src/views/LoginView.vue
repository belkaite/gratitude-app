<script lang="ts" setup>
import { ref } from 'vue'
import PageForm from '@/components/PageForm.vue'
import { trpc } from '@/trpc'
import { storeAccessToken } from '../utils/auth'

const errorMessage = ref('')

async function submitLogin(payload: { email: string; password: string }) {
  try {
    const res = trpc.user.login.mutate(payload)
    storeAccessToken(localStorage, (await res).accessToken)
  } catch (err: any) {
    errorMessage.value = err?.message
  }
}
</script>

<template>
  <PageForm
  description="Log in with your data that your entered during your registration:"
    heading="Log in"
    @submitLogin="submitLogin"
    :error="errorMessage"
    :show-name-values="false"
    :show-sign-up="true"
    :show-login-button="true"
    :show-sign-up-button="false"
  />
</template>

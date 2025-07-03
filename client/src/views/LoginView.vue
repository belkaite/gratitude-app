<script lang="ts" setup>
import { ref } from 'vue'
import PageForm from '@/components/PageForm.vue'
import { trpc } from '@/trpc'
import { storeAccessToken } from '../utils/auth'
import AuthPageLayout from '@/layouts/AuthPageLayout.vue'

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
  <AuthPageLayout>
    <template #left>
      <p>
        Welcome back! Log in to continue your journey toward a more grateful life. Even
        the smallest moments are worth noticing - and your digital journal is here to help you capture them.
      </p>
    </template>
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
  </AuthPageLayout>
</template>

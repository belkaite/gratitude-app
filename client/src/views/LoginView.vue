<script lang="ts" setup>
import { ref } from 'vue'
import PageForm from '@/components/PageForm.vue'
import AuthPageLayout from '@/layouts/AuthPageLayout.vue'
import { DEFAULT_SERVER_ERROR } from '../consts'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { TRPCClientError } from '@trpc/client'
import { getZodError } from '@/utils'

const router = useRouter()

const errorMessage = ref('')

const store = useUserStore()

async function submitLogin(payload: { email: string; password: string }) {
  try {
    await store.login(payload)
    router.push('/home')
  } catch (error) {
    if (error instanceof TRPCClientError) {
      if (error.data?.zodError) {
        const fieldErrors = error.data.zodError.fieldErrors as Record<string, string[]>

        errorMessage.value = getZodError(fieldErrors)
      } else {
      errorMessage.value = error.message
    }
    } else {
      errorMessage.value = error instanceof Error ? error.message : DEFAULT_SERVER_ERROR
    }
  }
}
</script>

<template>
  <AuthPageLayout>
    <template #left>
      <p>
        Welcome back!
        <br />
        Let’s pick up where you left off — noticing the quiet beauty in everyday life. Your
        gratitude journal is ready when you are.
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

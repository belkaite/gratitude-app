<script lang="ts" setup>
import { ref } from 'vue'
import PageForm from '@/components/PageForm.vue'
import AuthPageLayout from '@/layouts/AuthPageLayout.vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()

const errorMessage = ref('')

const store = useUserStore()

async function submitLogin(payload: { email: string; password: string }) {
  try {
    store.login(payload)
    router.push('/home')
  } catch (err: any) {
    errorMessage.value = err?.message
  }
}
</script>

<template>
  <AuthPageLayout>
    <template #left>
      <p>
        Welcome back! Log in to continue your journey toward a more grateful life. Even the smallest
        moments are worth noticing - and your digital journal is here to help you capture them.
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

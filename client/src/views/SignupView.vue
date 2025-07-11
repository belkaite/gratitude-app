<script lang="ts" setup>
import PageForm from '@/components/PageForm.vue'
import { ref } from 'vue'
import { DEFAULT_SERVER_ERROR } from '../consts'
import AuthPageLayout from '@/layouts/AuthPageLayout.vue'
import { useUserStore } from '@/stores/user'

const successMessage = ref(false)
const errorMessage = ref('')
const store = useUserStore()

async function submitSignUp(payload: {
  firstName: string
  lastName: string
  email: string
  password: string
}) {
  try {
    const { id } = await store.signup(payload)

    if (id) {
      successMessage.value = true

      errorMessage.value = ''
    }
  } catch (error: any) {
    if (error.data?.zodError) {
      const fieldErrors = error.data.zodError.fieldErrors as Record<string, string[]>
      const firstFieldKey = Object.keys(fieldErrors)[0]
      const firstErrorMsg = fieldErrors[firstFieldKey]?.[0]
      errorMessage.value = firstErrorMsg || 'Invalid input.'
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
        Start your journey toward a more grateful life. This digital journal is your space to slow
        down, reflect and find joy in the little things.
      </p>
    </template>
    <PageForm
      heading="Sign up"
      description="Enter your data to finish registration:"
      :show-name-values="true"
      :show-sign-up-button="true"
      @submit-signup="submitSignUp"
      :error="errorMessage"
      :success="successMessage"
      :show-login="true"
    />
  </AuthPageLayout>
</template>

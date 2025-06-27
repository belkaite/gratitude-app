<script lang="ts" setup>
import PageForm from '@/components/PageForm.vue'
import { trpc } from '@/trpc'
import { ref } from 'vue'
import { DEFAULT_SERVER_ERROR } from '../consts'

const successMessage = ref(false)
const errorMessage = ref('')

async function submitSignUp(payload: {
  firstName: string
  lastName: string
  email: string
  password: string
}) {
  try {
    const { id } = await trpc.user.signup.mutate(payload)

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
</template>

<script lang="ts" setup>
import PageForm from '@/components/PageForm.vue'
import { trpc } from '@/trpc'
import { ref } from 'vue'

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
    }
  } catch (err: any) {
    errorMessage.value = err?.message
  }
}
</script>

<template>
  <PageForm
    heading="Sign up"
    :show-name-values="true"
    :show-sign-up-button="true"
    @submit-signup="submitSignUp"
    :error="errorMessage"
    :success="successMessage"
  />
</template>

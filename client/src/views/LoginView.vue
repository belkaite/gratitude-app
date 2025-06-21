<script lang="ts" setup>
import { ref } from 'vue'
import PageForm from '@/components/PageForm.vue'
import { trpc } from '@/trpc'
import { storeAccessToken } from '../utils/auth';

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
  <div class="login">
    <PageForm heading="Log in" @submit="submitLogin" :error="errorMessage"/>
  </div>
</template>

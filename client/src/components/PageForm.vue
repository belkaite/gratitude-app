<script lang="ts" setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')
</script>

<template>
  <div class="m-8 max-w-2xl">
    <h1 class="font-lemon text-4xl text-[#E01C8B]">Log in</h1>
    <p class="my-6 text-gray-500">
      Log in with your data that your entered during your registration.
    </p>

    <form class="flex flex-col gap-4" autocomplete="off">
      <label class="font-semibold text-gray-700">Enter your email address</label>
      <input
        v-model="email"
        type="email"
        placeholder="name@example.com"
        required
        class="rounded-md border border-gray-500 p-1.5 text-gray-500"
      />
      <label class="font-semibold text-gray-700">Enter your password</label>
      <input
        v-model="password"
        type="password"
        placeholder="at least 8 characters"
        required
        class="rounded-md border border-gray-500 p-1.5 text-gray-500"
      />
      <input
        type="submit"
        value="Log in"
        class="mt-4 rounded-md bg-[#E01C8B] p-2 font-semibold text-white"
      />
    </form>
    <div class="flex flex-col items-center">
      <p class="mb-5 mt-10 text-gray-500">Don't have an account?</p>
      <button type="button" class="rounded-4xl border-2 border-[#E01C8B] py-4 px-12 text-[#E01C8B]">
        Sign up now
      </button>
    </div>
  </div>
</template>

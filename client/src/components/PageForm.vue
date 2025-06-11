<script lang="ts" setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')
</script>

<template>
  <div>
    <form class="flex flex-col gap-4 max-w-2xl" autocomplete="off">
      <label class="">Enter your email address</label>
      <input
        v-model="email"
        type="email"
        placeholder="name@example.com"
        required class=""
      />
      <label class="">Enter your password</label>
      <input
        v-model="password"
        type="password"
        placeholder="at least 8 characters"
        required
      />
      <input type="submit" value="Submit" />
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps } from 'vue'

const props = defineProps<{
  heading: string
}>()

const email = ref('')
const password = ref('')
</script>

<template>
  <div class="login">
    <h1 class="font-lemon login__heading">Log in</h1>
    <p class="login__description">
      Log in with your data that your entered during your registration:
    </p>

    <form class="login__form" autocomplete="off">
      <label class="login__form-title">Enter your email address</label>
      <input
        v-model="email"
        type="email"
        placeholder="name@example.com"
        required
        class="login__form-fields"
      />
      <label class="login__form-title">Enter your password</label>
      <input
        v-model="password"
        type="password"
        placeholder="at least 8 characters"
        required
        class="login__form-fields"
      />
      <input type="submit" value="Log in" class="login__submit" />
    </form>
    <div class="login__signup-wrapper">
      <p class="login__description">Don't have an account?</p>
      <button type="button" class="login__signup">Sign up now</button>
    </div>
  </div>
</template>

<style scoped>
.login {
  margin: 2rem;
  max-width: 40rem;
}

.login__heading {
  font-size: 2rem;
  color: #e01c8b;
}

.login__description {
  margin-block: 2rem;
  color: #94949b;
}

.login__form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.login__form-title {
  color: #55555b;
  font-weight: 600;
}

.login__form-fields {
  border: 2px solid;
  color: #94949b;
  padding: 0.5rem;
  border-radius: 10px;
  border-color: #dfdfdf;
}

.login__submit {
  background-color: #e01c8b;
  padding: 0.75rem;
  color: white;
  font-weight: 600;
  border: solid;
  border-radius: 10px;
  margin-top: 1rem;
  cursor: pointer;
}

.login__signup {
  background-color: transparent;
  color: #e01c8b;
  font-weight: 600;
  padding-block: 1rem;
  padding-inline: 2rem;
  border: 2px solid;
  border-radius: 30px;
}

.login__signup-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
}
</style>

<script lang="ts" setup>
import { ref, defineProps } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref('')
const password = ref('')
const firstName = ref('')
const lastName = ref('')

const props = defineProps<{
  description: string
  heading: string
  error?: string
  success?: boolean
  showNameValues?: boolean
  showSignUp?: boolean
  showLoginButton?: boolean
  showSignUpButton?: boolean
  showLogin?: boolean
}>()

const emit = defineEmits<{
  submitLogin: [{ email: string; password: string }]
  submitSignup: [{ firstName: string; lastName: string; email: string; password: string }]
}>()

function onSubmit() {
  if (props.showNameValues) {
    emit('submitSignup', {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
    })
  } else {
    emit('submitLogin', { email: email.value, password: password.value })
  }
}

function goToSignUp() {
  router.push('/signup')
}

function goToLogIn() {
  router.push('/login')
}
</script>

<template>
  <div class="login">
    <h1 class="font-lemon login__heading">{{ heading }}</h1>
    <p class="login__description">
      {{ description }}
    </p>

    <form class="login__form" autocomplete="off" @submit.prevent="onSubmit">
      <div v-if="showNameValues" class="login__form">
        <label class="login__form-title">First Name*</label>
        <input v-model="firstName" class="login__form-fields" placeholder="Sara" required />
        <label class="login__form-title">Last Name*</label>
        <input v-model="lastName" class="login__form-fields" placeholder="Austin" required />
      </div>
      <label class="login__form-title">Enter your email address*</label>
      <input
        v-model="email"
        type="email"
        placeholder="name@example.com"
        required
        class="login__form-fields"
      />
      <label class="login__form-title">Enter your password*</label>
      <input
        v-model="password"
        type="password"
        placeholder="at least 8 characters"
        required
        class="login__form-fields"
      />
      <input v-if="showLoginButton" type="submit" value="Log in" class="login__submit" />
      <input v-if="showSignUpButton" type="submit" value="Sign up" class="login__submit" />
    </form>
    <p class="login__error" v-if="error">
      <img src="../assets/icons/warning-icon.svg" />
      {{ error }}
    </p>
    <p class="login__success" v-if="success">You have registered successfully. 🎉</p>
    <div class="login__signup-wrapper" v-if="showLogin">
      <p class="login__description">Already registered?</p>
      <button type="button" class="login__signup" @click="goToLogIn">Log in</button>
    </div>
    <div class="login__signup-wrapper" v-if="showSignUp">
      <p class="login__description">Don't have an account?</p>
      <button type="button" class="login__signup" @click="goToSignUp">Sign up now</button>
    </div>
  </div>
</template>

<style scoped>
.login {
  margin: 2rem;
  max-width: 40rem;
}

.login__heading {
  font-size: 2.5rem;
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
  cursor: pointer;
}

.login__signup-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
}

.login__error {
  display: flex;
  flex-direction: row;
  gap: 10px;
  border: 2px solid;
  border-radius: 5px;
  padding-block: 0.5rem;
  padding-inline: 1rem;
  margin-top: 2rem;
  background-color: #ffe6e6;
  color: #a00404;
}

.login__success {
  border: 2px solid;
  border-radius: 5px;
  padding-block: 0.5rem;
  padding-inline: 1rem;
  background-color: #e6fffc;
  color: #025e52;
  margin-top: 2rem;
}
</style>

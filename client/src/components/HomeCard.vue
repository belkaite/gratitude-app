<script lang="ts" setup>
import { defineProps } from 'vue'

defineProps<{ title: string }>()
</script>

<template>
  <div class="home-card">
    <div class="home-card__title">
      <h3>{{ title }}</h3>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.home-card {
  background-color: #ffffff;
  height: 20rem;
  width: 32rem;
  border-radius: 20px;
  box-shadow: 0.25px 0.25px 20px 0.5px rgba(0, 0, 0, 0.1);
}

.home-card__title {
  color: #55555b;
  font-weight: 600;
  font-size: 1.25rem;
  padding: 1rem;
  margin: 0.5rem;
}
</style>

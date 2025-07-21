<script lang="ts" setup>
import { defineProps } from 'vue'

defineProps<{ title: string; text: string }>()
</script>

<template>
  <div class="feature-box">
    <div class="feature-title">
      {{ title }}
    </div>
    <div class="feature-text">
      {{ text }}
    </div>
  </div>
</template>

<style scoped>
.feature-box {
  background-color: #e01c8b;
  border-radius: 20px;
  height: 15rem;
  width: 15rem;
  font-weight: 15rem;
  flex-shrink: 0;
}

.feature-title {
  color: white;
  font-size: 1rem;
  font-weight: 500;
  padding: 1rem 1rem;
}

.feature-text {
  color: white;
  font-weight: 300;
  font-size: 1rem;
  padding: 1rem 1rem;
  text-align: start;
}
</style>

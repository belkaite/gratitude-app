<script lang="ts" setup>
import { defineProps } from 'vue'

defineProps<{
  width?: string
  height?: string
}>()

</script>

<template>
  <div class="card" :style="{ width, height }">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.card {
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0.25px 0.25px 20px 0.5px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

@media (width <= 600px) {
  .card {
    width: 100% !important;
    height: auto !important;
  }
}


</style>

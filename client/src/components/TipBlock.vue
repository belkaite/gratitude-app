<script lang="ts" setup>
import type { ShownTip } from '@server/shared/types'

defineProps<{
  tip: ShownTip
}>()
</script>

<template>
  <div class="tip-block">
    <div class="tip-block__unlocked">Unlocked:</div>
    <div class="tip-block__date">{{ tip.shownAt.toDateString().slice(4) }}</div>
    <div>{{ tip.content }}</div>
  </div>
</template>

<style scoped>
.tip-block {
  background-color: white;
  border-radius: 10px;
  padding: 30px;
  color: #94949b;
  font-weight: 400;
  text-align: justify;
}

.tip-block__date {
  color: #e01c8b;
  font-weight: 600;
  margin-bottom: 20px;
}

.tip-block__unlocked {
  color: #55555b;
  font-weight: 600;
}

@media (width <= 600px) {
  .tip-block {
    font-size: 12px;
  }
}
</style>

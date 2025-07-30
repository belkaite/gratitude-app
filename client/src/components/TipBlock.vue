<script lang="ts" setup>
import type { ShownTip } from '@server/shared/types'

defineProps<{
  tip: ShownTip
}>()
</script>

<template>
  <div class="tip-block">
    <div>{{ tip.content }}</div>
  </div>
</template>

<style scoped>
.tip-block {
  background-color: white;
  border-radius: 10px;
  padding: 20px;
}

</style>

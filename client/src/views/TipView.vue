<script lang="ts" setup>
import Sidebar from '@/components/Sidebar.vue'
import MainLayout from '@/layouts/MainLayout.vue'
import { useTipStore } from '@/stores/tip'
import TipBlock from '@/components/TipBlock.vue'
import { onMounted } from 'vue'

const tipStore = useTipStore()

onMounted(() => {
  tipStore.getShownTips()
})
</script>

<template>
  <MainLayout page-title="Science based tips for you, ">
    <template #navigation>
      <Sidebar></Sidebar>
    </template>
    <template #page-content>
      <div class="tip-view__layout">
        <TipBlock v-for="tip in tipStore.tips" :key="tip.id" :tip="tip"></TipBlock>
      </div>
    </template>
  </MainLayout>
</template>

<style scoped>
.tip-view__layout {
  display: flex;
  flex-direction: row;
  gap: 2rem;
  overflow-x: scroll;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  padding: 10px;
  max-width: 70vw;
  max-height: 50vw;
  margin: 20px;
}

.tip-view__layout > * {
  flex: 0 0 auto;
  scroll-snap-align: start;
  width: 500px;
}


</style>

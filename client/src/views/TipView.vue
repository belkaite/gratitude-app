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
  <MainLayout page-title="Tips backed by science, ">
    <template #navigation>
      <Sidebar></Sidebar>
    </template>
    <template #page-content>
      <div class="tip-view">
        <div class="tip-view__intro-text">
          These are the gratitude tips you've unlocked so far. Revisit them any time for a boost of
          motivation or perspective. 💧
        </div>
        <div class="tip-view__layout">
          <TipBlock v-for="tip in tipStore.tips" :key="tip.id" :tip="tip"></TipBlock>
          <div v-if="tipStore.tips.length === 0" class="tip-view__no-tips">
            ✨ No unlocked tip yet. Each reflection brings you closer to your next insight — keep
            going!
          </div>
        </div>
      </div>
    </template>
  </MainLayout>
</template>

<style scoped>
.tip-view {
  margin: 4rem;
}

.tip-view__no-tips {
  color: #55555b;
}

.tip-view__intro-text {
  color: #55555b;
  font-weight: 600;
  margin-bottom: 50px;
  font-size: 18px;
}
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
}

.tip-view__layout > * {
  flex: 0 0 auto;
  scroll-snap-align: start;
  width: 500px;
}

@media (width <= 600px) {
  .tip-view__intro-text,
  .tip-view__no-tips {
    font-size: 14px;
  }
  .tip-view__layout {
    display: flex;
    flex-direction: column;
    scroll-snap-type: y mandatory;
    overflow-x: hidden;
    overflow-y: scroll;
  }

  .tip-view__layout > * {
    flex: 0 0 auto;
    scroll-snap-align: start;
    width: 500px;
    max-width: 100%;
  }
}
</style>

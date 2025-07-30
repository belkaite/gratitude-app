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
      <TipBlock v-for="tip in tipStore.tips" :key="tip.id" :tip="tip"></TipBlock>
    </template>
  </MainLayout>
</template>

<style scoped></style>

<script lang="ts" setup>
import Sidebar from '@/components/Sidebar.vue'
import MainLayout from '@/layouts/MainLayout.vue'
</script>

<template>
  <MainLayout page-title="Science based tips for you, ">
    <template #navigation>
      <Sidebar></Sidebar>
    </template>
  </MainLayout>
</template>

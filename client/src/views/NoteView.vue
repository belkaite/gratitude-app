<script lang="ts" setup>
import Sidebar from '@/components/Sidebar.vue'
import MainLayout from '@/layouts/MainLayout.vue'
</script>

<template>
  <MainLayout page-title="Your grateful moments, ">
    <template #navigation>
      <Sidebar></Sidebar>
    </template>
  </MainLayout>
</template>

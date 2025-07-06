<script lang="ts" setup>
import MainLayout from '@/layouts/MainLayout.vue'
import Sidebar from '@/components/Sidebar.vue';
</script>

<template>
  <MainLayout>
    <template #navigation>
        <Sidebar></Sidebar>
    </template>
    </MainLayout>
</template>

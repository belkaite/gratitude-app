<script lang="ts" setup></script>

<template>
  <div class="main-layout__left">
    <slot name="navigation"></slot>
  </div>
  <div>
    <RouterView></RouterView>
  </div>
</template>

<style scoped>
.main-layout__left {
    width: 30rem;
}
</style>



<script setup lang="ts">
defineEmits(['close'])
</script>

<template>
  <div class="modal">
    <div class="modal__inner">
      <div class="modal__close-button">
        <img src="../assets/icons/close-icon.svg" @click="$emit('close')" />
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 500;
  width: 100vw;
  height: 100vh;
  background: rgb(0 0 0 / 40%);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal__inner {
  background-color: white;
  padding: 30px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  gap: 2rem;
  width: 50%;
  height: 20%;
}

.modal__close-button {
  position: absolute;
  top: 15px;
  right: 15px;
  background-color: transparent;
  border: none;
  color: black;
  cursor: pointer;
}

.modal__close-button img {
  width: 20px;
  height: 20px;
}
</style>

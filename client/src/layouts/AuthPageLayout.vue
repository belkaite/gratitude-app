<script setup lang="ts"></script>

<template>
  <div class="auth-layout">
    <div class="auth-layout__left">
      <div class="auth-layout__intro">
        <div class="auth-layout__logo">
          <img src="../assets/images/logo.png" />
        </div>
        <div class="auth-layout__description">
          <slot name="left"></slot>
        </div>
      </div>
    </div>
    <div class="auth-layout__right">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.auth-layout {
  display: flex;
  height: 100vh;
}
.auth-layout__left {
  background: linear-gradient(to bottom right, #ffffff, #dfdfdf);
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.auth-layout__right {
  display: flex;
  align-items: center;
  width: 50%;
}

.auth-layout__logo {
  max-width: 20rem;
}

.auth-layout__description {
  color: #2419ee;
  max-width: 30rem;
  text-align: right;
}

.auth-layout__intro {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  margin-right: 2rem;
  gap: 3rem;
  padding-bottom: 15rem;
}

@media (width <= 600px) {
  .auth-layout {
    display: flex;
    flex-direction: column;
  }

  .auth-layout__left,
  .auth-layout__right {
    width: 100%;
  }

  .auth-layout__description {
    font-size: 16px;
  }

  .auth-layout__logo {
    width: 200px;
  }

  .auth-layout__intro {
    margin: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-bottom: 2rem;
  }

  .auth-layout__description {
    text-align: center;
  }
}
</style>

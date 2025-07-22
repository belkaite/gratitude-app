<script lang="ts" setup>
import MainLayout from '@/layouts/MainLayout.vue'
import Sidebar from '@/components/Sidebar.vue'
import Card from '@/components/Card.vue'
import { useUserStore } from '@/stores/user'
import { useNoteStore } from '@/stores/note'
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'

const userStore = useUserStore()
const noteStore = useNoteStore()

onMounted(() => {
  noteStore.getNotesCount()
})
</script>

<template>
  <MainLayout page-title="Hello, ">
    <template #navigation>
      <Sidebar></Sidebar>
    </template>
    <div></div>
    <template #page-content>
      <div class="home-view">
        <div>
          <Card width="32rem" height="20rem"
            >
            <div class="home-view__title">Your progress</div>
            <div class="home-view__labels">Level</div>
            <div class="home-view__progress-values">{{ userStore.user?.levelName }}</div>
            <div class="home-view__labels">Notes submitted</div>
            <div class="home-view__progress-values">{{ noteStore.noteCount }}</div></Card
          >
        </div>
        <div>
          <Card width="32rem" height="20rem">
            <div class="home-view__title">About Grati</div>
            <div class="home-view__about-text">
              Gratitude is a scientifically proven thing that helps improve well being.
              <br />Instead of writing in a physical journal, decided to create a digital version of
              gratitude journal. This project was also inspired by the channel Kurzgesagt, which
              published a paper notebook for practicing gratitude.
            </div>

            <RouterLink to="/about">
              <div class="home-view__about-buttom">
                <button>Learn more</button> <img src="../assets/icons/arrow-right.svg" />
              </div>
            </RouterLink>
          </Card>
        </div>
        <div><Card width="32rem" height="20rem">
          <div class="home-view__title">Your recent note</div>
        </Card></div>
        <div><Card width="32rem" height="20rem">
          <div class="home-view__title">Unlocked tips</div>
        </Card></div>
      </div>
    </template>
  </MainLayout>
</template>

<style scoped>
.home-view {
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: auto auto;
  column-gap: 40px;
  row-gap: 40px;
  margin: 4rem;
}

.home-view__title {
  color: #55555b;
  font-weight: 600;
  font-size: 1.25rem;
  margin: 0.5rem;
}

.home-view__labels {
  font-weight: 500;
  color: #94949b;
  font-size: 1rem;
  margin-block: 1rem;
}

.home-view__progress-values {
  color: #e01c8b;
  font-size: 1.5rem;
  font-weight: 600;
}

.home-view__about-text {
  color: #94949b;
  font-size: 1rem;
  font-weight: 400;
  text-align: justify;
  margin-block: 1rem;
}

.home-view__about-buttom {
  display: flex;
  flex-direction: row;
  color: #e01c8b;
  font-size: 1rem;
  justify-content: end;
}
</style>

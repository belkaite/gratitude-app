<script lang="ts" setup>
import MainLayout from '@/layouts/MainLayout.vue'
import Sidebar from '@/components/Sidebar.vue'
import Card from '@/components/Card.vue'
import { useUserStore } from '@/stores/user'
import { useNoteStore } from '@/stores/note'
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import NoteBlock from '@/components/NoteBlock.vue'
import { useTipStore } from '@/stores/tip'

const userStore = useUserStore()
const noteStore = useNoteStore()
const tipStore = useTipStore()

onMounted(() => {
  noteStore.getNotesCount()
  noteStore.fetchLastNote()
  tipStore.getLastTip()
})
</script>

<template>
  <MainLayout page-title="Gratitude time, ">
    <template #navigation>
      <Sidebar></Sidebar>
    </template>
    <div></div>
    <template #page-content>
      <div class="home-view">
        <div>
          <Card width="35rem" height="22rem">
            <div class="home-view__title">Your progress</div>
            <div class="home-view__labels">Level</div>
            <div class="home-view__progress-values">{{ userStore.user?.levelName }}</div>
            <div class="home-view__labels">Notes submitted</div>
            <div class="home-view__progress-values">{{ noteStore.noteCount }}</div></Card
          >
        </div>
        <div>
          <Card width="35rem" height="22rem">
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
        <div>
          <Card width="35rem" height="22rem">
            <div class="home-view__recent-note-header">
              <div class="home-view__title">Your recent note</div>
              <RouterLink to="/notes">
                <button type="button" class="home-view__add-button">
                  Add new
                  <img src="../assets/icons/arrow-white-icon.svg" /></button
              ></RouterLink>
            </div>
            <div v-if="noteStore.lastNote">
              <NoteBlock :note="noteStore.lastNote"> </NoteBlock>
            </div>
            <div v-else>
              <p class="home-view__about-text">
                ✨ No note yet. Your latest reflection will appear here.
              </p>
            </div>
          </Card>
        </div>
        <div>
          <Card width="35rem" height="22rem">
            <div class="home-view__title">Unlocked tips</div>
            <div class="home-view__tips-text">
              <div v-if="tipStore.lastTip">
                {{ tipStore.lastTip?.content }}
              </div>
              <div v-else>
                <p class="home-view__about-text">
                  ✨ No unlocked tip yet. Each reflection brings you closer to your next insight — keep going!
                </p>
              </div>
            </div>
            <RouterLink to="/tips">
              <div class="home-view__about-buttom">
                <button>Read full</button> <img src="../assets/icons/arrow-right.svg" />
              </div>
            </RouterLink>
          </Card>
        </div>
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
  max-width: 550px;
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

.home-view__tips-text {
  color: #94949b;
  font-size: 1rem;
  font-weight: 400;
  text-align: justify;

  display: -webkit-box;
  -webkit-line-clamp: 7;
  line-clamp: 7;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.home-view__about-buttom {
  display: flex;
  flex-direction: row;
  color: #e01c8b;
  font-size: 1rem;
  font-weight: 600;
  justify-content: end;
  cursor: pointer;
  margin: 10px;
}

.home-view__add-button {
  background-color: #2419ee;
  font-weight: 500;
  color: white;
  padding-inline: 2rem;
  padding-block: 0.5rem;
  border-radius: 15px;
  margin-block: 1rem;
  height: 3rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.home-view__recent-note-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

@media (width <= 600px) {
  .home-view {
    display: flex;
    flex-direction: column;
    font-size: 14px;
  }
  .home-view__title,
  .home-view__labels,
  .home-view__progress-values,
  .home-view__about-text,
  .home-view__about-buttom,
  .home-view__tips-text {
    font-size: 14px;
  }
}

@media (width <= 1200px) {
  .home-view {
    display: flex;
    flex-direction: column;
  }
}
</style>

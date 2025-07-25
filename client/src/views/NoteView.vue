<script lang="ts" setup>
import Sidebar from '@/components/Sidebar.vue'
import MainLayout from '@/layouts/MainLayout.vue'
import Card from '@/components/Card.vue'
import { onMounted, ref } from 'vue'
import { useQuestionStore } from '@/stores/question'
import { useNoteStore } from '@/stores/note'

const questionStore = useQuestionStore()
const noteStore = useNoteStore()
const firstAnswer = ref('')
const secondAnswer = ref('')
const successMessage = ref('')

async function handleSubmit() {
  const message = await noteStore.submitNote(firstAnswer.value, secondAnswer.value)

  successMessage.value = message

  firstAnswer.value = ''
  secondAnswer.value = ''

  setTimeout(() => {
    successMessage.value = ''
  }, 6000)
}

function clearInputs() {
  firstAnswer.value = ''
  secondAnswer.value = ''
}

onMounted(() => {
  questionStore.getQuestions()
  noteStore.fetchLastNote()
})
</script>

<template>
  <MainLayout page-title="Grateful moments, ">
    <template #navigation>
      <Sidebar></Sidebar>
    </template>
    <template #page-content>
      <div class="note-view">
        <Card class="note-view__item1" width="35rem" height="40rem">
          <form @submit.prevent="handleSubmit">
            <div class="note-view__questions-title">{{ questionStore.firstQuestion }}</div>
            <textarea
              v-model="firstAnswer"
              class="note-view__input"
              row="10"
              placeholder="what’s on your mind..."
              required
              maxlength="500"
            />
            <div class="note-view__questions-title">{{ questionStore.secondQuestion }}</div>
            <textarea
              v-model="secondAnswer"
              class="note-view__input"
              row="10"
              placeholder="what’s on your mind..."
              required
              maxlength="500"
            />
            <div class="note-view__buttons">
              <button type="button" class="note-view__clear-button" @click="clearInputs">
                Clear
              </button>
              <input class="note-view__submit-button" type="submit" value="Save" />
            </div>
            <div v-if="successMessage" class="note-view__success">{{ successMessage }}</div>
          </form>
        </Card>
        <Card>
          <div class="note-view__title">Your past notes</div>
          <div class="note-view__last-note-block">
            <div class="note-view__question-answer">
              <div class="note-view__date">
                {{ noteStore.lastNote?.createdAt.toDateString().slice(4) }}
              </div>
              <div class="note-view__title">{{ noteStore.lastNote?.question1 }}</div>
              <div class="font-handwritten note-view__answer">
                {{ noteStore.lastNote?.answer1 }}
              </div>
            </div>
            <div class="note-view__question-answer">
              <div class="note-view__title">{{ noteStore.lastNote?.question2 }}</div>
              <div class="font-handwritten note-view__answer">
                {{ noteStore.lastNote?.answer2 }}
              </div>
            </div>
            <div class="note-view__buttons">
              <button type="button" class="note-view__delete-button">Delete</button>
              <button type="button" class="note-view__edit-button">Edit</button>
            </div>
          </div>
        </Card>
        <card> </card>
      </div>
    </template>
  </MainLayout>
</template>

<style scoped>
.note-view {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}
.note-view__item1 {
  grid-row: 1 / 4;
}

.note-view__questions-title {
  color: #e01c8b;
  font-weight: 600;
  font-size: 1.25rem;
}

.note-view__input {
  border: solid 1px;
  border-radius: 10px;
  border-color: #c5c5cc;
  width: 100%;
  height: 10rem;
  resize: none;
}

.note-view__submit-button {
  background-color: #2419ee;
  color: white;
  padding-inline: 2rem;
  padding-block: 0.5rem;
  border-radius: 15px;
  margin-block: 1rem;
  height: 2.5rem;
}

.note-view__success {
  border: 2px solid;
  border-radius: 5px;
  padding-block: 0.5rem;
  padding-inline: 1rem;
  background-color: #e6fffc;
  color: #025e52;
  margin-top: 2rem;
}

.note-view__clear-button {
  border: 2px solid;
  border-color: #2419ee;
  border-radius: 15px;
  padding-block: 0.5rem;
  padding-inline: 1rem;
  color: #2419ee;
  height: 2.5rem;
}

.note-view__buttons {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
}

.note-view__title {
  color: #55555b;
  font-weight: 600;
}

.note-view__last-note-block {
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 20px;
}

.note-view__date {
  color: #e01c8b;
  font-weight: 600;
}

.note-view__question-answer {
  margin: 10px;
}

.note-view__answer {
  color: #55555b;
}

.note-view__edit-button {
  background-color: #e01c8b;
  color: white;
  border-radius: 15px;
  padding-block: 0.5rem;
  padding-inline: 1rem;
}

.note-view__delete-button {
  border: 2px solid;
  border-color: #e01c8b;
  border-radius: 15px;
  padding-block: 0.5rem;
  padding-inline: 1rem;
  color: #e01c8b;
}
</style>

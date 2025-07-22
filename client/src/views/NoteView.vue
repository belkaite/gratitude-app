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

onMounted(() => {
  questionStore.getQuestions()
})
</script>

<template>
  <MainLayout page-title="Grateful moments, ">
    <template #navigation>
      <Sidebar></Sidebar>
    </template>
    <template #page-content>
      <div>
        <Card width="35rem" height="40rem">
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
            <input class="note-view__submit-button" type="submit" value="Save" />
            <div v-if="successMessage" class="note-view__success">{{ successMessage }}</div>
          </form>
        </Card>
      </div>
    </template>
  </MainLayout>
</template>

<style scoped>
.note-view__questions-title {
  color: #e01c8b;
  font-weight: 600;
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
</style>

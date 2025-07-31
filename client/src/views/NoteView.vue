<script lang="ts" setup>
import Sidebar from '@/components/Sidebar.vue'
import MainLayout from '@/layouts/MainLayout.vue'
import Card from '@/components/Card.vue'
import { onMounted, ref } from 'vue'
import { useQuestionStore } from '@/stores/question'
import { useNoteStore } from '@/stores/note'
import Modal from '@/components/Modal.vue'
import NoteBlock from '@/components/NoteBlock.vue'
import { useAIStore } from '../stores/ai'

const questionStore = useQuestionStore()
const noteStore = useNoteStore()
const firstAnswer = ref('')
const secondAnswer = ref('')
const submitSuccessMessage = ref('')
const editSuccessMessage = ref('')
const isEdting = ref(false)
const editedAnswer1 = ref('')
const editedAnswer2 = ref('')
const isDeleteModalOpen = ref(false)
const isViewMoreModalOpen = ref(false)
const isTipModalOpen = ref(false)
const aiStore = useAIStore()

async function handleSubmit() {
  const message = await noteStore.submitNote(firstAnswer.value, secondAnswer.value)

  submitSuccessMessage.value = message

  firstAnswer.value = ''
  secondAnswer.value = ''

  if (noteStore.tip) {
    isTipModalOpen.value = true
  }

  setTimeout(() => {
    submitSuccessMessage.value = ''
  }, 6000)
}

function clearInputs() {
  firstAnswer.value = ''
  secondAnswer.value = ''
}

async function saveEdit() {
  const noteId = noteStore.lastNote?.id

  if (!noteId) return

  const message = await noteStore.editNote(noteId, editedAnswer1.value, editedAnswer2.value)

  editSuccessMessage.value = message

  isEdting.value = false

  noteStore.lastNote = {
    ...noteStore.lastNote!,
    answer1: editedAnswer1.value,
    answer2: editedAnswer2.value,
  }

  setTimeout(() => {
    editSuccessMessage.value = ''
  }, 6000)
}

async function deleteNote() {
  const noteId = noteStore.lastNote?.id

  if (!noteId) return

  const message = await noteStore.deleteNote(noteId)
  noteStore.fetchLastNote()
  isDeleteModalOpen.value = false
  return message
}

function startEditing() {
  if (!noteStore.lastNote) return

  editedAnswer1.value = noteStore.lastNote.answer1
  editedAnswer2.value = noteStore.lastNote.answer2

  isEdting.value = true
}

function cancelEdit() {
  isEdting.value = false
}

function openDeleteModal() {
  isDeleteModalOpen.value = true
}

function closeModal() {
  isDeleteModalOpen.value = false
  isViewMoreModalOpen.value = false
  isTipModalOpen.value = false
}

async function openViewMoreModal() {
  await noteStore.fetchNotes()
  isViewMoreModalOpen.value = true
}

async function getAIreflection() {
  await aiStore.getAIresponse()
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
            <div v-if="submitSuccessMessage" class="note-view__success">
              {{ submitSuccessMessage }}
            </div>
          </form>
        </Card>
        <Card>
          <div class="note-view__last-note-header">
            <div class="note-view__title">Your past notes</div>
            <button type="button" class="note-view__view-more-button" @click="openViewMoreModal">
              View more
            </button>
            <template v-if="isViewMoreModalOpen">
              <Modal height="500px" @close="closeModal">
                <div class="note-view__title">Your past notes</div>
                <div class="note-view__view-more-notes">
                  <NoteBlock
                    v-for="note in noteStore.notes"
                    :key="note.id"
                    :note="note"
                  ></NoteBlock>
                </div>
              </Modal>
            </template>
          </div>
          <div class="note-view__last-note-block">
            <div class="note-view__question-answer">
              <div class="note-view__date">
                {{ noteStore.lastNote?.createdAt.toDateString().slice(4) }}
              </div>
              <div class="note-view__title">{{ noteStore.lastNote?.question1 }}</div>
              <div class="font-handwritten note-view__answer">
                <template v-if="isEdting">
                  <textarea
                    v-model="editedAnswer1"
                    class="note-view__input"
                    maxlength="500"
                  ></textarea>
                </template>
                <template v-else>
                  {{ noteStore.lastNote?.answer1 }}
                </template>
              </div>
            </div>
            <div class="note-view__question-answer">
              <div class="note-view__title">{{ noteStore.lastNote?.question2 }}</div>
              <div class="font-handwritten note-view__answer">
                <template v-if="isEdting">
                  <textarea
                    v-model="editedAnswer2"
                    class="note-view__input"
                    maxlength="500"
                  ></textarea>
                </template>
                <template v-else>
                  {{ noteStore.lastNote?.answer2 }}
                </template>
              </div>
            </div>
            <div class="note-view__buttons">
              <template v-if="isEdting">
                <button type="button" class="note-view__delete-button" @click="cancelEdit">
                  Cancel
                </button>
                <button type="button" class="note-view__edit-button" @click="saveEdit">
                  Save
                </button></template
              >
              <template v-else>
                <button type="button" class="note-view__delete-button" @click="openDeleteModal">
                  Delete
                </button>
                <button type="button" class="note-view__edit-button" @click="startEditing">
                  Edit
                </button>
              </template>
              <div v-if="editSuccessMessage" class="note-view__success">
                {{ editSuccessMessage }}
              </div>
              <template v-if="isDeleteModalOpen">
                <Modal height="200px" @close="closeModal">
                  <div class="note-view__title">
                    Are you sure that you would like to delete the latest note?
                  </div>
                  <div class="note-view__buttons">
                    <button type="button" class="note-view__delete-button" @click="closeModal">
                      No
                    </button>
                    <button type="button" class="note-view__edit-button" @click="deleteNote">
                      Yes
                    </button>
                  </div>
                </Modal>
              </template>
            </div>
          </div>
        </Card>
        <Card>
          <div class="note-view__title">GratiBot has thoughts</div>
          <div class="note-view__gratibot-block">
            <div class="note-view__gratibot-left">
              <div class="note-view__about-text">
                Curious? Click me to see my reflection on your last note.
              </div>
              <button button="type" @click="getAIreflection">
                <div class="note-view__circle-background">
                  <img src="../assets/images/fish-image.svg" />
                </div>
              </button>
            </div>

            <div class="note-view__last-note-block note-view__gratibot-text">
              {{ aiStore.aiResponse }}
            </div>
          </div>
        </Card>
      </div>
      <template v-if="isTipModalOpen">
        <Modal height="700px" @close="closeModal">
          <div class="note-view__tip-layout">
            <div class="note-view__tip-title">GratiFact break...💡</div>
            <div class="note-view__tip">{{ noteStore.tip.content }}</div>
            <RouterLink to="/tips">
              <button type="button" class="note-view__view-more-button">
                Read all tips
              </button></RouterLink
            >
          </div>
        </Modal>
      </template>
    </template>
  </MainLayout>
</template>

<style scoped>
.note-view {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin: 4rem;
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

.note-view__view-more-button {
  background-color: #f5f5f5;
  color: #55555b;
  font-weight: 500;
  padding: 10px;
  border-radius: 15px;
  cursor: pointer;
}

.note-view__last-note-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.note-view__view-more-notes {
  display: flex;
  flex-direction: row;
  gap: 20px;
  overflow-x: scroll;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  padding: 10px;
  max-width: 50vw;
  margin: 20px;
}

.note-view__view-more-notes > * {
  flex: 0 0 auto;
  scroll-snap-align: start;
}

.note-view__about-text {
  color: #94949b;
  font-size: 1rem;
}

.note-view__circle-background {
  width: 160px;
  height: 160px;
  background-color: #f5f5f5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px;
  cursor: pointer;
}

.note-view__circle-background img {
  width: 80px;
}

.note-view__gratibot-block {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 1rem;
  align-self: start;
}

.note-view__gratibot-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.note-view__gratibot-text {
  color: #55555b;
}

.note-view__tip-title {
  color: #2419ee;
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 10px;
}

.note-view__tip {
  color: #55555b;
  padding: 30px;
  border-radius: 25px;
}

.note-view__tip-layout {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>

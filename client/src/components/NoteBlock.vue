<script lang="ts" setup>
import type { NotePublic } from '@server/shared/types'

defineProps<{
  note: NotePublic
}>()
</script>

<template>
  <div class="note-block">
    <div class="note-block__date">{{ note.createdAt.toDateString().slice(4) }}</div>

    <div class="note-block__question-answer">
      <div class="note-block__title">{{ note.question1 }}</div>
      <div class="font-handwritten note-block__answer">{{ note.answer1 }}</div>
    </div>

    <div class="note-block__question-answer">
      <div class="note-block__title">{{ note.question2 }}</div>
      <div class="font-handwritten note-block__answer">{{ note.answer2 }}</div>
    </div>
  </div>
</template>

<style scoped>
.note-block {
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 20px;
}

.note-block__date {
  color: #e01c8b;
  font-weight: 600;
}

.note-block__question-answer {
  margin: 10px;
  color: #55555b;
}

.note-block__title {
  color: #55555b;
  font-weight: 600;
}


</style>

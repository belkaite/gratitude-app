import { defineStore } from 'pinia'
import { ref } from 'vue'
import { trpc } from '@/trpc'

export const useNoteStore = defineStore('note', () => {
  const noteCount = ref()

  async function getNotesCount() {
    noteCount.value = await trpc.note.getCount.query()
  }

  async function submitNote(firstAnswer: string, secondAnswer: string) {
    const { message } = await trpc.note.submit.mutate({ answer1: firstAnswer, answer2: secondAnswer })
    return message

  }

  return {
    noteCount,
    getNotesCount,
    submitNote
  }
})

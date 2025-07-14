import { defineStore } from 'pinia'
import { ref } from 'vue'
import { trpc } from '@/trpc'

export const useNoteStore = defineStore('note', () => {
  const noteCount = ref()

  async function getNotesCount() {
    noteCount.value = await trpc.note.getCount.query()
  }

  return {
    noteCount,
    getNotesCount,
  }
})

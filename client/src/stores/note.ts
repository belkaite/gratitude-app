import { defineStore } from 'pinia'
import { ref } from 'vue'
import { trpc } from '@/trpc'
import type { NotePublic } from '@server/shared/types'

export const useNoteStore = defineStore('note', () => {
  const noteCount = ref()
  const notes = ref<NotePublic[]>([])
  const lastNote = ref<NotePublic>()

  async function getNotesCount() {
    noteCount.value = await trpc.note.getCount.query()
  }

  async function submitNote(firstAnswer: string, secondAnswer: string) {
    const { message } = await trpc.note.submit.mutate({
      answer1: firstAnswer,
      answer2: secondAnswer,
    })
    return message
  }

  async function fetchNotes() {
    notes.value = await trpc.note.get.query()
  }

  async function fetchLastNote() {
    lastNote.value = await trpc.note.getLast.query()
  }

  return {
    noteCount,
    getNotesCount,
    submitNote,
    fetchNotes,
    notes,
    fetchLastNote,
    lastNote
  }
})

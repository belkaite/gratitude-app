import { defineStore } from 'pinia'
import { ref } from 'vue'
import { trpc } from '@/trpc'
import type { NotePublic } from '@server/shared/types'

export const useNoteStore = defineStore('note', () => {
  const tip = ref()
  const noteCount = ref()
  const notes = ref<NotePublic[]>([])
  const lastNote = ref<NotePublic>()

  async function getNotesCount() {
    noteCount.value = await trpc.note.getCount.query()
  }

  async function submitNote(firstAnswer: string, secondAnswer: string) {
    const response = await trpc.note.submit.mutate({
      answer1: firstAnswer,
      answer2: secondAnswer,
    })

    if (response.tip) {
      tip.value = response.tip
    }

    return response.message
  }

  async function fetchNotes() {
    notes.value = await trpc.note.get.query()
  }

  async function fetchLastNote() {
    lastNote.value = await trpc.note.getLast.query()
  }

  async function editNote(noteId: number, firstAnswer: string, secondAnswer: string) {
    const { message } = await trpc.note.update.mutate({
      id: noteId,
      answer1: firstAnswer,
      answer2: secondAnswer,
    })

    return message
  }

  async function deleteNote(noteId: number) {
    const { message } = await trpc.note.delete.mutate({ id: noteId })

    return message
  }

  return {
    noteCount,
    getNotesCount,
    submitNote,
    fetchNotes,
    notes,
    fetchLastNote,
    lastNote,
    editNote,
    deleteNote,
    tip,
  }
})

import { z } from 'zod'
import type { Note } from '@server/database/types'
import type { Selectable } from 'kysely'

export const noteSchema = z.object({
  id: z.number().int().positive(),
  answer1: z.string().min(1),
  answer2: z.string().min(1),
  levelId: z.number().int().positive(),
  userId: z.number().int().positive(),
  question1: z.string().min(1),
  question2: z.string().min(1),
  createdAt: z.date().default(() => new Date()),
})

export const noteKeysAll = Object.keys(noteSchema.shape) as Array<keyof Note>

export const noteKeysPublic = noteKeysAll.filter((key) => key !== 'userId')


export type NoteAll = Pick<Selectable<Note>, (typeof noteKeysAll)[number]>
export type NotePublic = Pick<Selectable<Note>, (typeof noteKeysPublic)[number]>

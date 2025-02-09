import { z } from 'zod'
import type { Note } from '@server/database/types'
import type { Selectable } from 'kysely'

export const noteSchema = z.object({
  id: z.number().int().positive(),
  answer1: z.string().min(1),
  answer2: z.string().min(1),
  levelId: z.number().int().positive(),
  userId: z.number().int().positive(),
  createdAt: z.date().default(() => new Date()),
})

export const noteKeysAll = Object.keys(noteSchema.shape) as (keyof Note)[]
export type NotePublic = Pick<Selectable<Note>, (typeof noteKeysAll)[number]>

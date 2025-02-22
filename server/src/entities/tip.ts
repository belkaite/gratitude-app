import { z } from 'zod'
import type { Tip } from '@server/database/types'
import type { Selectable } from 'kysely'

export const tipSchema = z.object({
  id: z.number().int().positive(),
  content: z.string().min(1),
  order: z.number().int().positive(),
})

export const tipKeysAll = Object.keys(tipSchema.shape) as Array<keyof Tip>
export const tipKeysPublic = tipKeysAll.filter((key) => key === 'content')

export type TipAll = Pick<Selectable<Tip>, (typeof tipKeysAll)[number]>
export type TipPublic = Pick<Selectable<Tip>, (typeof tipKeysPublic)[number]>

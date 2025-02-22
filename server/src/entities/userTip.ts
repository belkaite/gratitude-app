import { z } from 'zod'
import type { UserTip } from '@server/database/types'
import type { Selectable } from 'kysely'

export const userTipSchema = z.object({
  id: z.number().int().positive(),
  userId: z.number().int().positive(),
  tipId: z.number().int().positive(),
  shownAt: z.date().default(() => new Date()),
})

export const userTipKeysAll = Object.keys(userTipSchema.shape) as Array<keyof UserTip>

export type UserTipAll = Pick<Selectable<UserTip>, (typeof userTipKeysAll)[number]>

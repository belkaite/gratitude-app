import { z } from 'zod'
import type { Selectable } from 'kysely'
import type { User } from '@server/database/types'

export const userSchema = z.object({
  id: z.number().int().positive(),
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  email: z.string().trim().email().toLowerCase(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .max(64, 'Password must be at most 64 characters long'),
  level: z.number().int().positive(),
})

// list keys that we will return to the client
export const userKeysAll = Object.keys(userSchema.shape) as (keyof User)[]

export const userKeysPublic = ['id', 'firstName', 'lastName', 'level'] as const

export type UserPublic = Pick<Selectable<User>, (typeof userKeysPublic)[number]>

export const authUserSchema = userSchema.pick({ id: true })
export type AuthUser = z.infer<typeof authUserSchema>

export const changePasswordSchema = z.object({
  currentPassword: userSchema.shape.password,
  newPassword: userSchema.shape.password,
})

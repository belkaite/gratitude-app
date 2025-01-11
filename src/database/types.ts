import type { ColumnType } from 'kysely'

export type Generated<T> =
  T extends ColumnType<infer S, infer I, infer U>
    ? ColumnType<S, I | undefined, U>
    : ColumnType<T, T | undefined, T>

export interface Level {
  id: Generated<number>
  name: string
  order: number
}

export interface User {
  email: string
  firstName: string
  id: Generated<number>
  lastName: string
  level: Generated<number>
  password: string
}

export interface DB {
  level: Level
  user: User
}

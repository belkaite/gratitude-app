import type { ColumnType } from 'kysely'

export type Generated<T> =
  T extends ColumnType<infer S, infer I, infer U>
    ? ColumnType<S, I | undefined, U>
    : ColumnType<T, T | undefined, T>

export type Timestamp = ColumnType<Date, Date | string, Date | string>

export interface Level {
  id: Generated<number>
  name: string
  order: number
}

export interface Note {
  answer1: string
  answer2: string
  createdAt: Generated<Timestamp>
  id: Generated<number>
  levelId: number
  question1: string
  question2: string
  userId: number
}

export interface Question {
  content: string
  id: Generated<number>
  levelId: number
  order: number
}

export interface Tip {
  content: string
  id: Generated<number>
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

export interface UserTip {
  id: Generated<number>
  shownAt: Generated<Timestamp>
  tipId: number
  userId: number
}

export interface DB {
  level: Level
  note: Note
  question: Question
  tip: Tip
  user: User
  userTip: UserTip
}

export interface UserWithLevelName {
  email: string
  firstName: string
  lastName: string
  level: number
  levelName: string
}

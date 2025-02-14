import type { Database } from '@server/database'
import type { Insertable } from 'kysely'
import type { Note } from '@server/database/types'
import { noteKeysAll, noteKeysPublic, type NotePublic } from '../entities/note'

export function noteRepository(db: Database) {
  return {
    async create(note: Insertable<Note>): Promise<NotePublic> {
      return db
        .insertInto('note')
        .values(note)
        .returning(noteKeysAll)
        .executeTakeFirstOrThrow()
    },

    async countNotesByUser(userId: number): Promise<number> {
      const result = await db
        .selectFrom('note')
        .where('userId', '=', userId)
        .select((eb) => eb.fn.countAll().as('noteCount'))
        .executeTakeFirst()

      return Number(result?.noteCount) || 0
    },

    async getAll(userId: number): Promise<NotePublic[]> {
      return db
        .selectFrom('note')
        .where('userId', '=', userId)
        .select(noteKeysPublic)
        .execute()
    },

    async findById(
      userId: number,
      id: number
    ): Promise<NotePublic | undefined> {
      return db
        .selectFrom('note')
        .where('userId', '=', userId)
        .where('id', '=', id)
        .select(noteKeysPublic)
        .executeTakeFirst()
    },

    async update(
      userId: number,
      id: number,
      updates: Partial<{ answer1: string; answer2: string }>
    ): Promise<NotePublic | undefined> {
      return db
        .updateTable('note')
        .set(updates)
        .where('userId', '=', userId)
        .where('id', '=', id)
        .returning(noteKeysPublic)
        .executeTakeFirst()
    },

    async delete(userId: number, id: number): Promise<NotePublic | undefined> {
      return db
        .deleteFrom('note')
        .where('id', '=', id)
        .returning(noteKeysPublic)
        .executeTakeFirst()
    },
  }
}

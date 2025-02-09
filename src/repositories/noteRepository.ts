import type { Database } from '@server/database'
import type { Insertable } from 'kysely'
import type { Note } from '@server/database/types'
import { noteKeysAll, type NotePublic } from '../entities/note'

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
  }
}

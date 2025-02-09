import type { Database } from '@server/database'
import type { Insertable } from 'kysely'
import type { Note } from '@server/database/types'
import { noteKeysAll, type NotePublic } from '../entities/note'

export function noteRepository(db: Database) {
  return {
    create(note: Insertable<Note>): Promise<NotePublic> {
      return db
        .insertInto('note')
        .values(note)
        .returning(noteKeysAll)
        .executeTakeFirstOrThrow()
    },
  }
}

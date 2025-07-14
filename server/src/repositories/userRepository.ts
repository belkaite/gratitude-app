import type { Database } from '@server/database'
import type { User, UserWithLevelName } from '@server/database/types'
import {
  type UserPublic,
  userKeysAll,
  userKeysPublic,
} from '@server/entities/user'
import type { Insertable, Selectable } from 'kysely'

export function userRepository(db: Database) {
  return {
    async create(user: Insertable<User>): Promise<UserPublic> {
      return db
        .insertInto('user')
        .values(user)
        .returning(userKeysPublic)
        .executeTakeFirstOrThrow()
    },

    async findByEmail(email: string): Promise<Selectable<User> | undefined> {
      const user = await db
        .selectFrom('user')
        .select(userKeysAll)
        .where('user.email', '=', email)
        .executeTakeFirst()

      return user
    },

    async findById(
      id: number
    ): Promise<Selectable<UserWithLevelName> | undefined> {
      return db
        .selectFrom('user')
        .innerJoin('level', 'level.id', 'user.level')
        .select([
          'user.email',
          'user.firstName',
          'user.lastName',
          'user.level',
          'level.name as levelName',
        ])
        .where('user.id', '=', id)
        .executeTakeFirst()
    },

    async updatePassword(
      newPassword: string,
      id: number
    ): Promise<UserPublic | undefined> {
      return db
        .updateTable('user')
        .set({ password: newPassword })
        .where('user.id', '=', id)
        .returning(userKeysPublic)
        .executeTakeFirst()
    },

    async updateLevel(
      id: number,
      newLevel: number
    ): Promise<Selectable<User> | undefined> {
      return db
        .updateTable('user')
        .set({ level: newLevel })
        .where('user.id', '=', id)
        .returning(userKeysAll)
        .executeTakeFirst()
    },
  }
}

import type { Database } from '@server/database'
import { userTipKeysAll } from '@server/entities/userTip'

export function userTipRepository(db: Database) {
  return {
    async saveShownTip(userId: number, tipId: number) {
      return db.insertInto('userTip').values({ userId, tipId }).returning(userTipKeysAll).execute()
    },

    async getShown(userId: number) {
      return db
        .selectFrom('userTip')
        .where('userId', '=', userId)
        .innerJoin('tip', 'tip.id', 'userTip.tipId')
        .select(['content', 'shownAt'])
        .execute()
    },
  }
}

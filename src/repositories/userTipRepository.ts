import type { Database } from '@server/database'

export function userTipRepository(db: Database) {
  return {
    async saveShownTip(userId: number, tipId: number) {
      await db.insertInto('userTip')
        .values({ userId, tipId})
        .execute()
    },
  }
}

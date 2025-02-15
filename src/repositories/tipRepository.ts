import type { Database } from '@server/database'
import { tipKeysPublic, type TipPublic } from '@server/entities/tip'

export function tipRepository(db: Database) {
  return {
    async findByOrder(orderNumber: number): Promise<TipPublic | undefined> {
      return db
        .selectFrom('tip')
        .where('order', '=', orderNumber)
        .select(tipKeysPublic)
        .executeTakeFirst()
    },
  }
}

import type { Database } from '@server/database'
import {tipKeysAll, type TipAll } from '@server/entities/tip'

export function tipRepository(db: Database) {
  return {
    async findByOrder(orderNumber: number): Promise<TipAll | undefined> {
      return db
        .selectFrom('tip')
        .where('order', '=', orderNumber)
        .select(tipKeysAll)
        .executeTakeFirst()
    },
  }
}

import type { Database } from '@server/database'

export function questionRepository(db: Database) {
  return {
    async findByLevel(Id: number): Promise<{ content: string }[]> {
      return db
        .selectFrom('question')
        .where('levelId', '=', Id)
        .orderBy('order', 'asc')
        .select(['content'])
        .execute()
    },
  }
}

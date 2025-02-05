import type { Database } from '@server/database'

export function questionRepository(db: Database) {
  return {
    async findByLevel(levelId: number): Promise<{ content: string }[]> {
      return db
        .selectFrom('question')
        .where('levelId', '=', levelId)
        .orderBy('order', 'asc')
        .select(['content'])
        .execute()
    },
  }
}

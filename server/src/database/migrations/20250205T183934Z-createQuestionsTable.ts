import type { Kysely } from 'kysely'

export async function up(db: Kysely<any>) {
  await db.schema
    .createTable('question')
    .addColumn('id', 'integer', (c) =>
      c.primaryKey().generatedAlwaysAsIdentity()
    )
    .addColumn('content', 'text', (c) => c.notNull())
    .addColumn('level_id', 'integer', (c) => c.references('level.id').notNull())
    .addColumn('order', 'integer', (c) => c.notNull())
    .execute()

  await db
    .insertInto('question')
    .values([
      { content: 'What happened today?', levelId: 1, order: 1 },
      { content: 'Did something good happened to you?', levelId: 1, order: 2 },
      {
        content:
          'What would you be sad about if it was missing from your life?',
        levelId: 2,
        order: 1,
      },
      {
        content:
          "Are there things you ussually don't think about that you can appreciate?",
        levelId: 2,
        order: 2,
      },
      {
        content: 'What are you grateful for today?',
        levelId: 3,
        order: 1,
      },
      {
        content: 'What are you grateful for in your life?',
        levelId: 3,
        order: 2,
      },
    ])
    .execute()
}

export async function down(db: Kysely<any>) {
  await db.schema.dropTable('question').execute()
}

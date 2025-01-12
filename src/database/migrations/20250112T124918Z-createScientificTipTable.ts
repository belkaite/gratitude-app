import type { Kysely } from 'kysely'

export async function up(db: Kysely<any>) {
  await db.schema
    .createTable('scientific_tip')
    .addColumn('id', 'integer', (c) =>
      c.primaryKey().generatedAlwaysAsIdentity()
    )
    .addColumn('content', 'text', (c) => c.notNull())
    .addColumn('level_id', 'integer', (c) => c.references('level.id').notNull())
    .addColumn('order', 'integer', (c) => c.notNull())
    .execute()
}

export async function down(db: Kysely<any>) {
  await db.schema.dropTable('scientific_tip').execute()
}

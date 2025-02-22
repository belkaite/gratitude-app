import type { Kysely } from 'kysely'

export async function up(db: Kysely<any>) {
  await db.schema
    .createTable('level')
    .addColumn('id', 'integer', (c) =>
      c.primaryKey().generatedAlwaysAsIdentity()
    )
    .addColumn('name', 'text', (c) => c.notNull().unique())
    .addColumn('order', 'integer', (c) => c.notNull())
    .execute()

  await db
    .insertInto('level')
    .values([
      { name: 'Noticing', order: 1 },
      { name: 'Reflecting', order: 2 },
      { name: 'Practicing', order: 3 },
    ])
    .execute()
}

export async function down(db: Kysely<any>) {
  await db.schema.dropTable('level').execute()
}

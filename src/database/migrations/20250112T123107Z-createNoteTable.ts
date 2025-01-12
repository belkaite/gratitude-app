import { sql, type Kysely } from 'kysely'

export async function up(db: Kysely<any>) {
  await db.schema
    .createTable('note')
    .addColumn('id', 'integer', (c) =>
      c.primaryKey().generatedAlwaysAsIdentity()
    )
    .addColumn('content', 'text', (c) => c.notNull())
    .addColumn('user_id', 'integer', (c) => c.references('user.id').notNull())
    .addColumn('level_id', 'integer', (c) => c.references('level.id').notNull())
    .addColumn('created_at', 'timestamptz', (c) =>
      c.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
    )
    .execute()
}

export async function down(db: Kysely<any>) {
  await db.schema.dropTable('note').execute()
}

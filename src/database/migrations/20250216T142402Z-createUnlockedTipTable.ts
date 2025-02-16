import { sql, type Kysely } from 'kysely'

export async function up(db: Kysely<any>) {
  await db.schema
    .createTable('user_tip')
    .addColumn('id', 'integer', (c) =>
      c.primaryKey().generatedAlwaysAsIdentity()
    )
    .addColumn('tip_id', 'integer', (c) => c.references('tip.id').notNull())
    .addColumn('user_id', 'integer', (c) => c.references('user.id').notNull())
    .addColumn('shown_at', 'timestamptz', (c) =>
      c.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
    )
    .execute()
}

export async function down(db: Kysely<any>) {
  await db.schema.dropTable('user_tip').execute()
}

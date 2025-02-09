import type { Kysely } from 'kysely'

export async function up(db: Kysely<any>) {
  await db.schema
    .alterTable('note')
    .addColumn('question1', 'text', (c) => c.notNull())
    .addColumn('question2', 'text', (c) => c.notNull())
    .execute()
}

export async function down(db: Kysely<any>) {
  await db.schema
    .alterTable('note')
    .dropColumn('question1')
    .dropColumn('question2')
    .execute()
}

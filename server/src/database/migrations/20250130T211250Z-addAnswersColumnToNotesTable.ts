import type { Kysely } from 'kysely'

export async function up(db: Kysely<any>) {
  await db.schema
    .alterTable('note')
    .dropColumn('content')
    .addColumn('answer1', 'text', (c) => c.notNull())
    .addColumn('answer2', 'text', (c) => c.notNull())
    .execute()
}

export async function down(db: Kysely<any>) {
  await db.schema
    .alterTable('note')
    .dropColumn('answer1')
    .dropColumn('answer2')
    .addColumn('content', 'text', (c) => c.notNull())
    .execute()
}

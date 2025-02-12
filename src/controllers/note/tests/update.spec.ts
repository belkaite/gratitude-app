import { wrapInRollbacks } from '@tests/utils/transactions'
import { createCallerFactory } from '@server/trpc'
import { createTestDatabase } from '@tests/utils/database'
import { fakeNote, fakeUser } from '@server/entities/tests/fakes'
import userRouter from '../../user'
import noteRouter from '..'

const db = await wrapInRollbacks(createTestDatabase())

const user = fakeUser({
  email: 'hello@gmail.com',
  password: 'labadiena152**',
})
const caller1 = createCallerFactory(userRouter)({ db })
const { id } = await caller1.signup(user)

const caller2 = createCallerFactory(noteRouter)({ db, authUser: { id } })

it('should update the note', async () => {
    const note = fakeNote({userId: id})

    const createdNote = await caller2.submit(note)

    const noteId = createdNote.note.id

    const updatedNote = await caller2.update({ id: noteId, answer1: 'updated text', answer2: 'text'})
})

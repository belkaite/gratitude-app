import { createTestDatabase } from '@tests/utils/database'
import { wrapInRollbacks } from '@tests/utils/transactions'
import { createCallerFactory } from '@server/trpc'
import { fakeNote, fakeUser } from '@server/entities/tests/fakes'
import { requestContext } from '@tests/utils/context'
import userRouter from '../../user'
import noteRouter from '..'

const db = await wrapInRollbacks(createTestDatabase())

const user = fakeUser({
  email: 'hello@gmail.com',
  password: 'labadiena152**',
})
const caller1 = createCallerFactory(userRouter)({ db })
const { id } = await caller1.signup(user)

it('should delete the note', async () => {
  const caller2 = createCallerFactory(noteRouter)({ db, authUser: { id } })
  const note = fakeNote({ userId: id })
  const createdNote = await caller2.submit(note)

  const noteId = createdNote.note.id

  const deletedNote = await caller2.delete({ id: noteId })

  expect(deletedNote).toMatchObject({
    message: expect.stringMatching(/delete/i),
    deletedNote: {
      answer1: note.answer1,
      answer2: note.answer2,
      levelId: note.levelId,
      question1: expect.any(String),
      question2: expect.any(String),
    },
  })
})

it('should throw error if user is not authenticated', async () => {
  const caller2 = createCallerFactory(noteRouter)(requestContext({ db }))

  await expect(caller2.delete({ id: 1 })).rejects.toThrow(/must log in/i)
})

it('should throw error if note does not exist', async () => {
  const caller2 = createCallerFactory(noteRouter)({ db, authUser: { id } })
  await expect(caller2.delete({ id: 3000 })).rejects.toThrow(/not found/i)
})

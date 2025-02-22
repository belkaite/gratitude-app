import { wrapInRollbacks } from '@tests/utils/transactions'
import { createCallerFactory } from '@server/trpc'
import { createTestDatabase } from '@tests/utils/database'
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

it('should return no changes when nothing has been enetered', async () => {
  const caller2 = createCallerFactory(noteRouter)({ db, authUser: { id } })
  const note = fakeNote({ userId: id })

  const createdNote = await caller2.submit(note)

  const noteId = createdNote.note.id

  const updatedNote1 = await caller2.update({
    id: noteId,
    answer1: undefined,
    answer2: undefined,
  })

  expect(updatedNote1).toMatchObject({
    message: expect.stringMatching(/no changes/i),
    updatedNote: { answer1: note.answer1, answer2: note.answer2 },
  })
})

it('should update the note', async () => {
  const caller2 = createCallerFactory(noteRouter)({ db, authUser: { id } })
  const note = fakeNote({ userId: id })

  const createdNote = await caller2.submit(note)

  const noteId = createdNote.note.id
  const updatedNote2 = await caller2.update({
    id: noteId,
    answer1: 'updated text',
    answer2: 'updated text 2',
  })

  expect(updatedNote2).toMatchObject({
    message: expect.stringMatching(/success/i),
    updatedNote: {
      answer1: 'updated text',
      answer2: 'updated text 2',
    },
  })
})

it('should throw error if user is not authenticated', async () => {
  const caller2 = createCallerFactory(noteRouter)(requestContext({ db }))

  await expect(caller2.get()).rejects.toThrow(/must log in/i)
})

import { createTestDatabase } from '@tests/utils/database'
import { wrapInRollbacks } from '@tests/utils/transactions'
import { createCallerFactory } from '@server/trpc'
import { fakeNote, fakeUser } from '@server/entities/tests/fakes'
import { questionRepository } from '@server/repositories/questionRepository'
import { requestContext } from '@tests/utils/context'
import noteRouter from '..'
import userRouter from '../../user'

const db = await wrapInRollbacks(createTestDatabase())
const user = fakeUser({
  email: 'hello@gmail.com',
  password: 'labadiena152**',
})
const caller1 = createCallerFactory(userRouter)({ db })
const { id } = await caller1.signup(user)

it('should submit the note', async () => {
  const caller2 = createCallerFactory(noteRouter)({ db, authUser: { id } })
  const levelId = 1

  const questions = await questionRepository(db).findByLevel(1)

  const note = fakeNote({
    levelId,
    userId: id,
    question1: questions[0].content,
    question2: questions[1].content,
  })

  const response = await caller2.submit(note)

  expect(response).toMatchObject({
    message: expect.stringMatching(/success/i),
    note: {
      answer1: note.answer1,
      answer2: note.answer2,
      levelId,
      userId: id,
      question1: note.question1,
      question2: note.question2,
    },
  })
})

it('should throw error if user is not authenticated', async () => {
  const caller2 = createCallerFactory(noteRouter)(requestContext({ db }))

  const levelId = 1
  const questions = await questionRepository(db).findByLevel(levelId)

  const note = fakeNote({
    levelId,
    question1: questions[0].content,
    question2: questions[1].content,
  })

  await expect(caller2.submit(note)).rejects.toThrow(/must log in/i)
})

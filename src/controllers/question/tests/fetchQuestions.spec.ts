import { wrapInRollbacks } from '@tests/utils/transactions'
import { createTestDatabase } from '@tests/utils/database'
import { createCallerFactory } from '@server/trpc'
import { fakeUser } from '@server/entities/tests/fakes'
import questionRouter from '..'
import userRouter from '../../user'

const db = await wrapInRollbacks(createTestDatabase())
const user = fakeUser({
  email: 'hello@gmail.com',
  password: 'labadiena152**',
})
const caller1 = createCallerFactory(userRouter)({ db })
const { id } = await caller1.signup(user)
const caller2 = createCallerFactory(questionRouter)({ db, authUser: { id } })

it('should return questions for a given level', async () => {
  const response = await caller2.fetchQuestions()

  expect(response).toEqual({
    question1: 'What happened today?',
    question2: 'Did something good happened to you?',
  })
})

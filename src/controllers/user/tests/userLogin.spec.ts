import { createCallerFactory } from '@server/trpc'
import { createTestDatabase } from '@tests/utils/database'
import { wrapInRollbacks } from '@tests/utils/transactions'
import userRouter from '..'

const db = await wrapInRollbacks(createTestDatabase())

const caller = createCallerFactory(userRouter)({ db })

it('should login the user', async () => {
  // arrange
  const user = {
    firstName: 'Dumas',
    lastName: 'Koldunas',
    email: 'koldunas@domain.com',
    password: 'password123**',
  }

  await caller.signup(user)

  // act

  const response = await caller.login(user)

  // assert
  expect(response).toEqual({ email: 'koldunas@domain.com' })
})

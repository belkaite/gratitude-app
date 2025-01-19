import { createCallerFactory } from '@server/trpc'
import { createTestDatabase } from '@tests/utils/database'
import { wrapInRollbacks } from '@tests/utils/transactions'
import { selectAll } from '@tests/utils/records'
import userRouter from '..'
import exp from 'constants'

const db = await wrapInRollbacks(createTestDatabase())

const caller = createCallerFactory(userRouter)({ db })

it('should save the user', async () => {
  // arrange
  const user = {
    firstName: 'Dumas',
    lastName: 'Koldunas',
    email: 'koldunas@domain.com',
    password: 'password123**',
  }

  // act

  const response = await caller.signup(user)

  // assert
  expect(response).toEqual({ id: expect.any(Number) })

  const [userCreated] = await selectAll(db, 'user', (eb) =>
    eb('email', '=', user.email)
  )

  expect(userCreated).toMatchObject({
    id: expect.any(Number),
    email: 'koldunas@domain.com',
    password: 'password123**',
    firstName: 'Dumas',
    lastName: 'Koldunas',
  })

  expect(response).toEqual({id: userCreated.id})
})

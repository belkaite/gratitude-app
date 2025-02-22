import { createCallerFactory } from '@server/trpc'
import { createTestDatabase } from '@tests/utils/database'
import { wrapInRollbacks } from '@tests/utils/transactions'
import { fakeUser } from '@server/entities/tests/fakes'
import userRouter from '..'

const db = await wrapInRollbacks(createTestDatabase())

const caller = createCallerFactory(userRouter)({ db })



it('should return the token', async () => {
  const user = fakeUser({
    email: 'koldunas@gmail.com',
    password: 'verystrongpassword12369*',
  })

  await caller.signup(user)

  const response = await caller.login({
    email: 'koldunas@gmail.com',
    password: 'verystrongpassword12369*',
  })

  expect(response).toMatchObject({ accessToken: expect.any(String) })
  expect(response.accessToken.slice(0, 3)).toEqual('eyJ')
})

it('should throw an error when user did not do sign up', async () => {
  await expect(
    caller.login({
      email: 'mysterioususer@gmail.com',
      password: 'mysteriouspassword123**',
    })
  ).rejects.toThrow(/not find/i)
})

it('should throw an error when user do not enter correct password', async () => {
  const user = fakeUser({
    email: 'koldunas@gmail.com',
    password: 'verystrongpassword12369*',
  })

  await caller.signup(user)

  await expect(
    caller.login({
      email: 'koldunas@gmail.com',
      password: 'random1223*',
    })
  ).rejects.toThrow(/incorrect/i)
})

it('should throw an error when user do not enter correct email', async () => {
  const user = fakeUser({
    email: 'koldunas@gmail.com',
    password: 'verystrongpassword12369*',
  })

  await caller.signup(user)

  await expect(
    caller.login({
      email: 'whoareyou@gmail.com',
      password: 'verystrongpassword12369*',
    })
  ).rejects.toThrow(/not find/i)
})

it('allows logging when user enters email with upper case', async () => {
  const user = fakeUser({
    email: 'koldunas@gmail.com',
    password: 'verystrongpassword12369*',
  })

  await caller.signup(user)

  const response = await caller.login({
    email: 'KOLDUNAS@GMAIL.COM',
    password: 'verystrongpassword12369*',
  })

  expect(response).toMatchObject({ accessToken: expect.any(String) })
})

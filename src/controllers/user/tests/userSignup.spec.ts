import { createCallerFactory } from '@server/trpc'
import { createTestDatabase } from '@tests/utils/database'
import { wrapInRollbacks } from '@tests/utils/transactions'
import { selectAll } from '@tests/utils/records'
import { fakeUser } from '@server/entities/tests/fakes'
import userRouter from '..'

const db = await wrapInRollbacks(createTestDatabase())

const caller = createCallerFactory(userRouter)({ db })

it('should save the user', async () => {
  // arrange
  const user = fakeUser()

  // act

  const response = await caller.signup(user)

  // assert

  const [userCreated] = await selectAll(db, 'user', (eb) =>
    eb('email', '=', user.email)
  )

  expect(userCreated).toMatchObject({
    id: expect.any(Number),
    ...user,
    password: expect.not.stringContaining(user.password),
  })

  expect(response).toEqual({ id: userCreated.id })
})

it('throws error when the email is invalid', async () => {
  // arrange

  const user = fakeUser({ email: 'random-thing' })

  // assert and assert

  await expect(caller.signup(user)).rejects.toThrow(/email/i)
})

it('throws error when password is less than 8 characters', async () => {
  const user = fakeUser({ password: 'pass101' })

  await expect(caller.signup(user)).rejects.toThrow(/password/i)
})

it('throws error when email already exists', async () => {
  const email = 'lalalala@gmail.com'

  await caller.signup(fakeUser({ email }))

  await expect(caller.signup(fakeUser({ email }))).rejects.toThrow(
    /already exists/i
  )
})

it('stores email with trimmed whitespaces', async () => {
  const user = fakeUser({ email: '    testemail@gmail.com     ' })

  await caller.signup(user)

  const [userSaved] = await selectAll(db, 'user', (eb) =>
    eb('email', '=', 'testemail@gmail.com')
  )

  expect(userSaved).toMatchObject({email: 'testemail@gmail.com'})
})

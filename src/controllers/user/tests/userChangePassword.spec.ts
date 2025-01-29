import { wrapInRollbacks } from '@tests/utils/transactions'
import { createTestDatabase } from '@tests/utils/database'
import { createCallerFactory } from '@server/trpc'
import { fakeUser } from '@server/entities/tests/fakes'
import userRouter from '..'

const db = await wrapInRollbacks(createTestDatabase())

const user = fakeUser({
  email: 'hello@gmail.com',
  password: 'labadiena152**',
})
const caller = createCallerFactory(userRouter)({ db })
const { id } = await caller.signup(user)

it('should change the password', async () => {
  const caller2 = createCallerFactory(userRouter)({
    db,
    authUser: { id },
  })

  const response = await caller2.changePassword({
    currentPassword: 'labadiena152**',
    newPassword: 'gerovakaro152**',
  })

  expect(response).toMatchObject({
    message: expect.stringMatching(/success/i),
  })
})

it('should fail when current password is incorrect', async () => {
  const caller2 = createCallerFactory(userRouter)({
    db,
    authUser: { id },
  })

  await expect(
    caller2.changePassword({
      currentPassword: 'wrongpass123',
      newPassword: 'gerovakaro152**',
    })
  ).rejects.toThrow(/incorrect/i)
})

it('should fail if new password is too short', async () => {
  const caller2 = createCallerFactory(userRouter)({
    db,
    authUser: { id },
  })

  await expect(
    caller2.changePassword({
      currentPassword: 'labadiena152**',
      newPassword: 'short',
    })
  ).rejects.toThrow(/at least/i)
})

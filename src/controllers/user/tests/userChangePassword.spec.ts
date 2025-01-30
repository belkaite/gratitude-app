import { wrapInRollbacks } from '@tests/utils/transactions'
import { createTestDatabase } from '@tests/utils/database'
import { createCallerFactory } from '@server/trpc'
import { fakeUser } from '@server/entities/tests/fakes'
import { userRepository } from '@server/repositories/userRepository'
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

  const userBeforeUpdate = await userRepository(db).findById(id)
  if (!userBeforeUpdate) {
    throw new Error('User not found before password change')
  }

  const oldPassword = userBeforeUpdate.password

  const response = await caller2.changePassword({
    currentPassword: 'labadiena152**',
    newPassword: 'gerovakaro152**',
  })

  expect(response).toMatchObject({
    message: expect.stringMatching(/success/i),
  })

  const userAfterUpdate = await userRepository(db).findById(id)

  if (!userAfterUpdate) {
    throw new Error('User not found after password change')
  }

  const newPassword = userAfterUpdate.password

  expect(newPassword.slice(0, 4)).toEqual('$2b$')
  expect(oldPassword).not.toEqual(newPassword)
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

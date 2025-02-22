import { createTestDatabase } from '@tests/utils/database'
import { wrapInRollbacks } from '@tests/utils/transactions'
import { createCallerFactory } from '@server/trpc'
import { fakeUser, fakeNote } from '@server/entities/tests/fakes'
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

it('should return empty list when there are notes created', async () => {
  const caller2 = createCallerFactory(noteRouter)({ db, authUser: { id } })
  const response = await caller2.get()

  expect(response).toEqual([])
})

it('should get a note', async () => {
  const caller2 = createCallerFactory(noteRouter)({ db, authUser: { id } })
  await caller2.submit(fakeNote())

  const response = await caller2.get()

  expect(response).toHaveLength(1)
})

it('should throw error if user is not authenticated', async () => {
  const caller2 = createCallerFactory(noteRouter)(requestContext({ db }))

  await expect(caller2.get()).rejects.toThrow(/must log in/i)

})

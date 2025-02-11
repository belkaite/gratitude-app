import { createTestDatabase } from '@tests/utils/database'
import { wrapInRollbacks } from '@tests/utils/transactions'
import { createCallerFactory } from '@server/trpc'
import { fakeUser } from '@server/entities/tests/fakes'
import noteRouter from '..'
import userRouter from '../../user'


const db = await wrapInRollbacks(createTestDatabase())
const user = fakeUser({
  email: 'hello@gmail.com',
  password: 'labadiena152**',
})
const caller1 = createCallerFactory(userRouter)({ db })
const { id } = await caller1.signup(user)

const caller2 = createCallerFactory(noteRouter)({ db, authUser: { id } })

it('should return all users notes', async () => {
    const response = await caller2.get()

    expect(response).toEqual([])

})

import { createTestDatabase } from '@tests/utils/database'
import { wrapInRollbacks } from '@tests/utils/transactions'
import { createCallerFactory } from '@server/trpc'
import { fakeUser } from '@server/entities/tests/fakes'
import { userTipRepository } from '@server/repositories/userTipRepository'
import { tipRepository } from '@server/repositories/tipRepository'
import { TRPCError } from '@trpc/server'
import userRouter from '../../user'
import userTipRouter from '..'

const db = await wrapInRollbacks(createTestDatabase())

const userTipRepo = userTipRepository(db)
const tipRepo = tipRepository(db)

const user = fakeUser({
  email: 'hello@gmail.com',
  password: 'labadiena152**',
})
const caller1 = createCallerFactory(userRouter)({ db })
const { id } = await caller1.signup(user)
const caller2 = createCallerFactory(userTipRouter)({
  db,
  authUser: { id },
})

it('should get the questions to the user', async () => {
  const tip = await tipRepo.findByOrder(1)

  if (!tip) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'Tip is not found',
    })
  }

  await userTipRepo.saveShownTip(id, tip.id)

  const response = await caller2.get()

  expect(response).toMatchObject([
    { content: expect.any(String), shownAt: expect.any(Date) },
  ])
})

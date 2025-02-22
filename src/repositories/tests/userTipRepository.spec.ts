import { createTestDatabase } from '@tests/utils/database'
import { wrapInRollbacks } from '@tests/utils/transactions'
import { fakeUser } from '@server/entities/tests/fakes'
import { TRPCError } from '@trpc/server'
import { userTipRepository } from '../userTipRepository'
import { tipRepository } from '../tipRepository'
import { userRepository } from '../userRepository'

const db = await wrapInRollbacks(createTestDatabase())

const repository = userTipRepository(db)
const userRepo = userRepository(db)
const tipRepo = tipRepository(db)

it('should save and get the tip that was shown to the user', async () => {
  const user = await userRepo.create(fakeUser())

  const tip = await tipRepo.findByOrder(1)

  if (!tip) {
    throw new TRPCError({ code: 'NOT_FOUND', message: 'Test tip not found.' })
  }

  const response = await repository.saveShownTip(user.id, tip.id)

  expect(response).toMatchObject([
    {
      tipId: tip.id,
      userId: user.id,
    },
  ])

  const savedTip = await repository.getShown(user.id)

  expect(savedTip).toHaveLength(1)
  expect(savedTip).toMatchObject([
    {
      content: expect.any(String),
      shownAt: expect.any(Date),
    },
  ])
})

it('should throw error when saving a tip that does not exist', async () => {
  const user = await userRepo.create(fakeUser())

  const tipId = 3000

  await expect(repository.saveShownTip(user.id, tipId)).rejects.toThrow(
    /foreign key constraint/i
  )
})

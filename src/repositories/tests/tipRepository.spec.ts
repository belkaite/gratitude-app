import { createTestDatabase } from '@tests/utils/database'
import { wrapInRollbacks } from '@tests/utils/transactions'
import { tipRepository } from '../tipRepository'

const db = await wrapInRollbacks(createTestDatabase())

const repository = tipRepository(db)

it('should return a tip to the user depending on the order', async () => {
  const order = 3

  const tip = await repository.findByOrder(order)

  expect(tip).toMatchObject({
    content: expect.any(String),
  })
})

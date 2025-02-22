import { wrapInRollbacks } from '@tests/utils/transactions'
import { createTestDatabase } from '@tests/utils/database'
import { userRepository } from '@server/repositories/userRepository'
import { tipRepository } from '@server/repositories/tipRepository'
import { userTipRepository } from '@server/repositories/userTipRepository'
import { handleLevelUp, getTip } from '../handleLevelUp'

const db = await wrapInRollbacks(createTestDatabase())

const userRepo = userRepository(db)
const tipRepo = tipRepository(db)
const userTipRepo = userTipRepository(db)

describe('handleLevelUp', () => {
  it('should level up user if notes count is in threshold', async () => {
    const user = await userRepo.create({
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User',
      password: 'securepassword123',
      level: 1,
    })

    await handleLevelUp(user.level, user.id, 15, {
      userRepository: userRepo,
    })

    const updatedUser = await userRepo.findById(user.id)

    expect(updatedUser?.level).toBe(2)
  })
})

describe('getTip', () => {
  it('should return tip when user submits every 5 note', async () => {
    const user = await userRepo.create({
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User',
      password: 'securepassword123',
      level: 1,
    })

    const tip = await getTip(
      { tipRepository: tipRepo, userTipRepository: userTipRepo },
      5,
      user.id
    )

    expect(tip).toBeDefined()
    expect(tip).toMatchObject({ content: expect.any(String) })
  })
})

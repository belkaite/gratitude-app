import { userRepository } from '@server/repositories/userRepository'
import { tipRepository } from '../../../repositories/tipRepository'
import { userTipRepository } from '../../../repositories/userTipRepository'

export async function handleLevelUp(
  userLevel: number,
  userId: number,
  notesCount: number,
  repos: { userRepository: ReturnType<typeof userRepository> }
) {
  const levelThresholds = [15, 30]

  if (userLevel < 3 && levelThresholds.includes(notesCount)) {
    const newLevel = userLevel + 1

    await repos.userRepository.updateLevel(userId, newLevel)
  }
}

export async function getTip(
  repos: {
    tipRepository: ReturnType<typeof tipRepository>
    userTipRepository: ReturnType<typeof userTipRepository>
  },
  notesCount: number,
  userId: number
) {
  if (notesCount % 5 !== 0) return null

  const tip = await repos.tipRepository.findByOrder(notesCount / 5)

  if (tip) {
    await repos.userTipRepository.saveShownTip(userId, tip.id)
  }

  return tip
}

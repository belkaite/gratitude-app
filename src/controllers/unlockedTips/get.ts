import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'
import { userRepository } from '@server/repositories/userRepository'
import { userTipRepository } from '@server/repositories/userTipRepository'
import provideRepos from '../../trpc/provideRepos/index'

export default authenticatedProcedure
  .use(provideRepos({ userRepository, userTipRepository }))
  .query(async ({ ctx: { repos, authUser } }) => {
    const unlockedTips = await repos.userTipRepository.getShown(authUser.id)

    return unlockedTips
  })

import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'
import provideRepos from '@server/trpc/provideRepos'
import { userRepository } from '@server/repositories/userRepository'

export default authenticatedProcedure
  .use(provideRepos({ userRepository }))
  .query(async ({ ctx: { repos, authUser } }) => {
    const userInDatabase = await repos.userRepository.findById(authUser.id)

    return userInDatabase
  })

import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'
import provideRepos from '@server/trpc/provideRepos'
import { userRepository } from '@server/repositories/userRepository'
import { noteRepository } from '@server/repositories/noteRepository'

export default authenticatedProcedure
  .use(provideRepos({ userRepository, noteRepository }))
  .query(async ({ ctx: { repos, authUser } }) => {
    const notes = await repos.noteRepository.getAll(authUser.id)

    return notes
  })

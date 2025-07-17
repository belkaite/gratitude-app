import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'
import provideRepos from '@server/trpc/provideRepos'
import { userRepository } from '@server/repositories/userRepository'
import { noteRepository } from '@server/repositories/noteRepository'

export default authenticatedProcedure
  .use(provideRepos({ userRepository, noteRepository }))
  .query(async ({ ctx: { repos, authUser } }) => {
    const notesCount = await repos.noteRepository.countNotesByUser(authUser.id)

    return notesCount
  })

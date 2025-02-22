import { noteSchema } from '@server/entities/note'
import { noteRepository } from '@server/repositories/noteRepository'
import { userRepository } from '@server/repositories/userRepository'
import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'
import provideRepos from '@server/trpc/provideRepos'
import { TRPCError } from '@trpc/server'

export default authenticatedProcedure
  .use(provideRepos({ userRepository, noteRepository }))
  .input(noteSchema.pick({ id: true }))
  .mutation(async ({ input, ctx: { repos, authUser } }) => {
    const { id } = input

    const deletedNote = await repos.noteRepository.delete(authUser.id, id)

    if (!deletedNote) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Note not found.',
      })
    }

    return {
      message: 'Note deleted.',
      deletedNote,
    }
  })

import { noteSchema } from '@server/entities/note'
import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'
import provideRepos from '@server/trpc/provideRepos'
import { userRepository } from '@server/repositories/userRepository'
import { noteRepository } from '@server/repositories/noteRepository'
import { TRPCError } from '@trpc/server'

export default authenticatedProcedure
  .use(provideRepos({ userRepository, noteRepository }))
  .input(noteSchema.pick({ id: true, answer1: true, answer2: true }))
  .mutation(async ({ input, ctx: { repos, authUser } }) => {
    const { answer1, answer2, id } = input

    const updatedNote = await repos.noteRepository.update(authUser.id, id, {
      answer1,
      answer2,
    })

    if (!updatedNote) {
        throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Note not found.'
        })
    }

    return {
      message: 'Note successfully updated.',
      updatedNote,
    }
  })

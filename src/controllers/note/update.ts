import { noteSchema } from '@server/entities/note'
import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'
import provideRepos from '@server/trpc/provideRepos'
import { userRepository } from '@server/repositories/userRepository'
import { noteRepository } from '@server/repositories/noteRepository'
import { TRPCError } from '@trpc/server'

export default authenticatedProcedure
  .use(provideRepos({ userRepository, noteRepository }))
  .input(
    noteSchema
      .pick({ id: true, answer1: true, answer2: true })
      .partial()
      .extend({ id: noteSchema.shape.id })
  )
  .mutation(async ({ input, ctx: { repos, authUser } }) => {
    const { answer1, answer2, id } = input

    const existingNote = await repos.noteRepository.findById(authUser.id, id)

    if (!existingNote) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Note not found.',
      })
    }

    const updatedPayload: Partial<{ answer1: string; answer2: string }> = {}

    if (answer1 !== undefined) updatedPayload.answer1 = answer1
    if (answer2 !== undefined) updatedPayload.answer2 = answer2

    if (Object.keys(updatedPayload).length === 0) {
      return {
        message: 'No changes done.',
        updatedNote: existingNote,
      }
    }

    const updatedNote = await repos.noteRepository.update(
      authUser.id,
      id,
      updatedPayload
    )

    if (!updatedNote) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Note not found.',
      })
    }

    return {
      message: 'Note successfully updated.',
      updatedNote,
    }
  })

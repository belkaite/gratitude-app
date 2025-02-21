import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'
import provideRepos from '@server/trpc/provideRepos'
import { userRepository } from '@server/repositories/userRepository'
import { noteRepository } from '@server/repositories/noteRepository'
import { TRPCError } from '@trpc/server'
import { getAiReflection } from './utils/getAiResponse'


export default authenticatedProcedure
  .use(provideRepos({ userRepository, noteRepository }))
  .query(async ({ ctx: { repos, authUser } }) => {
    const lastAnswers = await repos.noteRepository.findLastAnswers(authUser.id)

    if (!lastAnswers) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'No previous journal entries'
      })
    }

    try {
      const aiResponse = await getAiReflection(lastAnswers?.answer1, lastAnswers?.answer2)
      return aiResponse
    } catch {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to generate AI reflection, try again',
      })
    }

  })

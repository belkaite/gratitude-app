import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'
import provideRepos from '@server/trpc/provideRepos'
import { userRepository } from '@server/repositories/userRepository'
import { TRPCError } from '@trpc/server'

export default authenticatedProcedure
  .use(provideRepos({ userRepository }))
  .query(async ({ ctx: { repos, authUser } }) => {
    const user = await repos.userRepository.findById(authUser.id)

    if (!user) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'User not found',
      })
    }

    const questions = await repos.questionRepository?.findByLevel(1)


    if (questions?.length !== 2) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Questions not found for this level',
      })
    }

    return {
      question1: questions[0].content,
      question2: questions[1].content,
    }
  })

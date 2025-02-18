import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'
import provideRepos from '@server/trpc/provideRepos'
import { userRepository } from '@server/repositories/userRepository'
import { noteRepository } from '@server/repositories/noteRepository'
import { TRPCError } from '@trpc/server'
import openai from '../../services/openaiService'

export default authenticatedProcedure
  .use(provideRepos({ userRepository, noteRepository }))
  .query(async ({ ctx: { repos, authUser } }) => {
    const lastAnswers = await repos.noteRepository.findLastAnswers(authUser.id)

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content:
            'Act as a helpful, senstive coach/assistant that provides reflections on gratitude journal entries',
        },
        {
          role: 'user',
          content: `Reflect on this gratitude journal entries: ${lastAnswers?.answer1}, ${lastAnswers?.answer2}`,
        },
      ],
      max_tokens: 100,
    })

    console.log(completion)

    const aiResponse = completion.choices[0].message.content
    if (!aiResponse) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'No response from AI.',
      })
    }

    return aiResponse
  })

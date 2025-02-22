import openai from '@server/services/openaiService'
import { TRPCError } from '@trpc/server'

export async function getAiReflection(answer1: string, answer2: string) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'developer',

          content: `You are kind, encouraging and insightful gratitude coach. Your role is to provide thoughtful reflection's
            on user's last entries in gratitude journal.
            Offer meaningful insights, encourage psoitive emotions, gently and subtly encourage the user to continue their
            practice.
            Help them see benefits of gratitude in a warm and uplifting tone. Avoid general praise. Instead offer specific, personal
            refelctions that make the user feel heard and motivated
            `,
        },
        {
          role: 'user',
          content: `Reflect on this gratitude journal entries: ${answer1}, ${answer2}`,
        },
      ],
      max_tokens: 200,
      stop: ['\n'],
    })

    const aiResponse = response.choices[0].message.content

    if (!aiResponse) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'No response from AI',
      })
    }

    return aiResponse
  } catch {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Failed to generate AI reflection, please try again later',
    })
  }
}

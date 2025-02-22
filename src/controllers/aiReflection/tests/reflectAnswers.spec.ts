import { createTestDatabase } from '@tests/utils/database'
import { wrapInRollbacks } from '@tests/utils/transactions'
import { fakeNote, fakeUser } from '@server/entities/tests/fakes'
import { userRepository } from '@server/repositories/userRepository'
import { noteRepository } from '@server/repositories/noteRepository'
import { createCallerFactory } from '@server/trpc'
import openai from '@server/services/openaiService'
import type { ChatCompletion } from 'openai/resources'
import aiRouter from '..'

const db = await wrapInRollbacks(createTestDatabase())
const repository = userRepository(db)
const noteRepo = noteRepository(db)

const user = fakeUser({
  email: 'hello@gmail.com',
  password: 'labadiena152**',
})

const createdUser = await repository.create(user)

const caller = createCallerFactory(aiRouter)({
  db,
  authUser: { id: createdUser.id },
})

vi.mock('@server/services/openaiService', () => ({
  default: {
    chat: {
      completions: {
        create: vi.fn(),
      },
    },
  },
}))

const getMockedResponse = (content: string | null): ChatCompletion => ({
  id: 'chatcmpl-123',
  object: 'chat.completion',
  created: Math.floor(Date.now() / 1000),
  model: 'gpt-4o-mini',
  choices: [
    {
      index: 0,
      message: {
        role: 'assistant',
        content,
        refusal: 'stop',
      },
      finish_reason: 'stop',
      logprobs: null,
    },
  ],
  usage: {
    prompt_tokens: 10,
    completion_tokens: 10,
    total_tokens: 20,
  },
})

const createdNote = async () => {
  const note = fakeNote({
    userId: createdUser.id,
    answer1: 'I had a long day, full of meetings',
    answer2: 'I woke up early and had a nice walk in sunrise',
  })

  return noteRepo.create(note)
}

it('should return AI reflection based on last answers entry', async () => {
  await createdNote()

  vi.mocked(openai.chat.completions.create).mockResolvedValue(
    getMockedResponse('Nice mornings can boost your whole day.')
  )

  const response = await caller.reflectAnswers()

  expect(response).toEqual('Nice mornings can boost your whole day.')
})

it('should reject if there is no response from AI', async () => {
  await createdNote()

  vi.mocked(openai.chat.completions.create).mockResolvedValue(
    getMockedResponse(null)
  )

  await expect(caller.reflectAnswers()).rejects.toThrow(/fail/i)
})

it('should throw bad request if no previous journal entries exist', async () => {
  await expect(caller.reflectAnswers()).rejects.toThrow(/no previous/i)
})

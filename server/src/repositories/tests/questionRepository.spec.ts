import { createTestDatabase } from '@tests/utils/database'
import { wrapInRollbacks } from '@tests/utils/transactions'
import { questionRepository } from '../questionRepository'

const db = await wrapInRollbacks(createTestDatabase())

const repository = questionRepository(db)

it('should fetch questions to user', async () => {
  const questions = await repository.findByLevel(1)

  expect(questions).toMatchObject([
    { content: 'What happened today?' },
    { content: 'Did something good happened to you?' },
  ])
})

it('should return no questions for non existing level', async () => {
  const questions = await repository.findByLevel(3000)

  expect(questions).toMatchObject([])
})

it('should return in the correct order', async () => {
  const questions = await repository.findByLevel(1)

  expect(questions.map((question) => question.content)).toEqual([
    'What happened today?',
    'Did something good happened to you?',
  ])
})

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

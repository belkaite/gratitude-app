import { wrapInRollbacks } from '@tests/utils/transactions'
import { createTestDatabase } from '@tests/utils/database'
// import { createCallerFactory } from '@server/trpc'
import { questionRepository } from '@server/repositories/questionRepository'

const db = await wrapInRollbacks(createTestDatabase())
// const caller = createCallerFactory(questionRepository)({ db })

it('should return questions for a given level', async () => {
  const questions = await questionRepository(db).findByLevel(1)

  expect(questions).toEqual([
    { content: 'What happened today?' },
    { content: 'Did something good happened to you?' },
  ])
})

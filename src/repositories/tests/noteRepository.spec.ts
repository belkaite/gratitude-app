import { createTestDatabase } from '@tests/utils/database'
import { wrapInRollbacks } from '@tests/utils/transactions'
import { fakeNote, fakeUser } from '@server/entities/tests/fakes'
import { noteRepository } from '../noteRepository'
import { userRepository } from '../userRepository'

const db = await wrapInRollbacks(createTestDatabase())

const repository = await noteRepository(db)
const userRepo = await userRepository(db)

it('should create the note', async () => {
  const user = await userRepo.create(fakeUser())
  const note = fakeNote({ userId: user.id })

  const createdNote = await repository.create(note)

  expect(createdNote).toMatchObject({
    id: expect.any(Number),
    answer1: note.answer1,
    answer2: note.answer2,
    userId: user.id,
    levelId: note.levelId,
    question1: note.question1,
    question2: note.question2,
    createdAt: expect.any(Date),
  })
})

it('should count notes by user', async () => {
  const user = await userRepo.create(fakeUser())

  const initialCount = await repository.countNotesByUser(user.id)
  expect(initialCount).toBe(0)

  const note = fakeNote({ userId: user.id })

  await repository.create(note)

  const updatedCount = await repository.countNotesByUser(user.id)

  expect(updatedCount).toBe(1)
})

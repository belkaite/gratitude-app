import { createTestDatabase } from '@tests/utils/database'
import { wrapInRollbacks } from '@tests/utils/transactions'
import { fakeNote, fakeUser } from '@server/entities/tests/fakes'
import { noteRepository } from '../noteRepository'
import { userRepository } from '../userRepository'

const db = await wrapInRollbacks(createTestDatabase())

const repository = noteRepository(db)
const userRepo = userRepository(db)

describe('create', () => {
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
})

describe('countNotesByUser', async () => {
  it('should be 0 when note is not submitted', async () => {
    const user = await userRepo.create(fakeUser())

    const initialCount = await repository.countNotesByUser(user.id)
    expect(initialCount).toBe(0)
  })

  it('should be 1 when note is submitted', async () => {
    const user = await userRepo.create(fakeUser())
    const note = fakeNote({ userId: user.id })

    await repository.create(note)

    const updatedCount = await repository.countNotesByUser(user.id)

    expect(updatedCount).toBe(1)
  })
})

describe('getAll', async () => {
  it('should return empty list if no notes have been created', async () => {
    const user = await userRepo.create(fakeUser())

    const notes = await repository.getAll(user.id)

    expect(notes).toEqual([])
  })

  it('should return the note if the note was created', async () => {
    const user = await userRepo.create(fakeUser())

    const note = await repository.create(fakeNote({ userId: user.id }))

    const updatedNotes = await repository.getAll(user.id)

    expect(updatedNotes).toEqual([
      {
        answer1: note.answer1,
        answer2: note.answer2,
        levelId: note.levelId,
        question1: note.question1,
        question2: note.question2,
        createdAt: note.createdAt,
        id: note.id,
      },
    ])
  })
})

describe('getById', async () => {
  it('should find note by id', async () => {
    const user = await userRepo.create(fakeUser())

    const note = await repository.create(fakeNote({ userId: user.id }))

    const foundNote = await repository.findById(user.id, note.id)

    expect(foundNote).toMatchObject({
      id: note.id,
    })
  })
})

describe('update', async () => {
  it('should update answers of the note', async () => {
    const user = await userRepo.create(fakeUser())

    const note = await repository.create(fakeNote({ userId: user.id }))

    const updatedNote = await repository.update(user.id, note.id, {
      answer1: 'test1',
      answer2: 'test2',
    })

    expect(updatedNote).toMatchObject({
      answer1: 'test1',
      answer2: 'test2',
      question1: updatedNote?.question1,
      question2: updatedNote?.question2,
    })
  })

  it('should return undefine for non existing note', async () => {
    const user = await userRepo.create(fakeUser())

    const updatedNote = await repository.update(user.id, 99999, {
      answer1: 'test1',
      answer2: 'test2',
    })

    expect(updatedNote).toBeUndefined()
  })
})

describe('delete', async () => {
  it('should delete the note', async () => {
    const user = await userRepo.create(fakeUser())

    const note = await repository.create(fakeNote({ userId: user.id }))

    await repository.delete(user.id, note.id)

    const deletedNote = await repository.findById(user.id, note.id)

    expect(deletedNote).toBeUndefined()
  })

  it('should return undefined for non existing note', async () => {
    const user = await userRepo.create(fakeUser())

    const deletedNote = await repository.delete(user.id, 99999)

    expect(deletedNote).toBeUndefined()
  })
})

describe('findLastAnswers', async () => {
  it('should find last user answers', async () => {
    const user = await userRepo.create(fakeUser())

    await repository.create(
      fakeNote({ userId: user.id, answer1: 'Test1', answer2: 'Test2' })
    )

    const lastAnswers = await repository.findLastAnswers(user.id)

    expect(lastAnswers).toEqual({
      answer1: 'Test1',
      answer2: 'Test2',
    })
  })
})

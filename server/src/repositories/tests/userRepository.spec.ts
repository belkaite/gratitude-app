import { createTestDatabase } from '@tests/utils/database'
import { wrapInRollbacks } from '@tests/utils/transactions'
import { fakeUser } from '@server/entities/tests/fakes'
import { userRepository } from '../userRepository'

const db = await wrapInRollbacks(createTestDatabase())

const repository = userRepository(db)

describe('create', () => {
  it('should create a user', async () => {
    const user = fakeUser()

    const createdUser = await repository.create(user)

    expect(createdUser).toEqual({
      id: expect.any(Number),
      firstName: user.firstName,
      lastName: user.lastName,
      level: 1,
    })
  })

  it('throws error when email is a duplicate', async () => {
    const user = fakeUser({ email: 'random@gmail.com' })

    await repository.create(user)

    await expect(repository.create(user)).rejects.toThrow(/email/i)
  })
})

describe('findByEmail', () => {
  it('should find user by email', async () => {
    const user = fakeUser({ email: 'random@gmail.com' })

    const { id } = await repository.create(user)

    const userFound = await repository.findByEmail('random@gmail.com')

    expect(userFound).toMatchObject({ id })
  })

  it('should return undefined when email does not exist', async () => {
    const user = await repository.findByEmail('nouser@gmail.com')

    expect(user).toBeUndefined()
  })
})

describe('findById', () => {
  it('should find user by id', async () => {
    const user = fakeUser()
    const { id } = await repository.create(user)

    const userFound = await repository.findById(id)

    expect(userFound).toMatchObject({
      id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    })
  })

  it('should return undefined id user id does not exit', async () => {
    const user = await repository.findById(9999)

    expect(user).toBeUndefined()
  })
})

describe('updatePassword', () => {
  it('should change password to user', async () => {
    const user = fakeUser()

    const { id } = await repository.create(user)

    await repository.updatePassword('newpass123!', id)

    const userAfterUpdate = await repository.findById(id)

    expect(userAfterUpdate?.password).not.to.equal(user.password)
  })
})

describe('updateLevel', () => {
  it('should update users level', async () => {
    const user = fakeUser()

    const { id } = await repository.create(user)

    const newLevel = 2

    await repository.updateLevel(id, newLevel)

    const userAfterUpdate = await repository.findById(id)

    expect(userAfterUpdate?.level).not.to.equal(user.level)
    expect(userAfterUpdate?.level).equal(newLevel)
  })
})

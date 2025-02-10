import type { User, Note } from '@server/database/types'
import type { Insertable } from 'kysely'
import { random } from '@tests/utils/random'
import type { AuthUser } from '../user'

const randomId = () =>
  random.integer({
    min: 1,
    max: 1000000,
  })

/**
 * Generates a fake user with some default test data.
 * @param overrides Any properties that should be different from default fake data.
 */
export const fakeUser = <T extends Partial<Insertable<User>>>(
  overrides: T = {} as T
) =>
  ({
    email: random.email(),
    firstName: random.first(),
    lastName: random.last(),
    password: 'Password.123!',
    ...overrides,
  }) satisfies Insertable<User>

export const fakeAuthUser = <T extends Partial<AuthUser>>(
  overrides: T = {} as T
): AuthUser => ({
  id: randomId(),
  email: random.email(),
  ...overrides,
})

export const fakeNote = <T extends Partial<Insertable<Note>>>(
  overrides: T = {} as T
) =>
  ({
    answer1: random.sentence(),
    answer2: random.sentence(),
    levelId: random.integer({ min: 1, max: 3 }),
    question1: random.sentence(),
    question2: random.sentence(),
    userId: randomId(),
    ...overrides,
  }) satisfies Insertable<Note>

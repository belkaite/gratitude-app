import type { Database } from '@server/database'
import { userRepository } from './userRepository'
import { questionRepository } from './questionRepository'
import { noteRepository } from './noteRepository'
import { tipRepository } from './tipRepository'

export type RepositoryFactory = <T>(db: Database) => T

// index of all repositories for provideRepos
const repositories = { userRepository, questionRepository, noteRepository, tipRepository }

export type RepositoriesFactories = typeof repositories
export type Repositories = {
  [K in keyof RepositoriesFactories]: ReturnType<RepositoriesFactories[K]>
}
export type RepositoriesKeys = keyof Repositories

export { repositories }

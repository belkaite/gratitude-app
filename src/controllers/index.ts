import { router } from '../trpc'
import user from './user'
import question from './question'

export const appRouter = router({
  user,
  question
})

// ?
export type AppRouter = typeof appRouter

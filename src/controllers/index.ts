import { router } from '../trpc'
import user from './user'
import question from './question'
import note from './note'

export const appRouter = router({
  user,
  question,
  note,
})

// ?
export type AppRouter = typeof appRouter

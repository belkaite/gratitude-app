import { router } from '../trpc'
import user from './user'
import question from './question'
import note from './note'
import unlockedTips from './unlockedTips'

export const appRouter = router({
  user,
  question,
  note,
  unlockedTips
})

// ?
export type AppRouter = typeof appRouter

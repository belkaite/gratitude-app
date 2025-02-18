import { router } from '../trpc'
import user from './user'
import question from './question'
import note from './note'
import unlockedTips from './unlockedTips'
import aiReflection from './aiReflection'

export const appRouter = router({
  user,
  question,
  note,
  unlockedTips,
  aiReflection
})

// ?
export type AppRouter = typeof appRouter

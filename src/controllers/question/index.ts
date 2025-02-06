import { router } from '@server/trpc'
import fetchQuestions from './fetchQuestions'

export default router({ fetchQuestions })

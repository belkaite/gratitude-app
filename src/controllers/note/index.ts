import { router } from '@server/trpc'
import submit from './submit'
import get from './get'

export default router({ submit, get })

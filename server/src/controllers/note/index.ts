import { router } from '@server/trpc'
import submit from './submit'
import get from './get'
import update from './update'
import deleteNote from './delete'

export default router({ submit, get, update, delete: deleteNote})

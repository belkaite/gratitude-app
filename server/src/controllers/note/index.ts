import { router } from '@server/trpc'
import submit from './submit'
import get from './get'
import update from './update'
import deleteNote from './delete'
import getCount from './getCount'
import getLast from './getLast'

export default router({ submit, get, update, getCount, delete: deleteNote, getLast})

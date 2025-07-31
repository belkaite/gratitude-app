import { router } from '@server/trpc'
import  get  from './get'
import getLast from './getLast'

export default router({ get, getLast })

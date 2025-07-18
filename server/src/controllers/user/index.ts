import { router } from '@server/trpc'
import signup from './signup'
import login from './login'
import changePassword from './changePassword'
import getUser from './getUser'

export default router({
  signup,
  login,
  changePassword,
  getUser
})

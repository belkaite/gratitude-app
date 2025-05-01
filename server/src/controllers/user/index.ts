import { router } from '@server/trpc'
import signup from './signup'
import login from './login'
import changePassword from './changePassword'

export default router({
  signup,
  login,
  changePassword,
})

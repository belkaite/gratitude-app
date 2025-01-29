import provideRepos from '@server/trpc/provideRepos'
import { userRepository } from '@server/repositories/userRepository'
import { changePasswordSchema } from '@server/entities/user'
import { TRPCError } from '@trpc/server'
import config from '@server/config'
import bcrypt, { hash } from 'bcrypt'
import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'

export default authenticatedProcedure
  .use(provideRepos({ userRepository }))
  .input(changePasswordSchema)
  .mutation(
    async ({
      input: { currentPassword, newPassword },
      ctx: { repos, authUser },
    }) => {
      const userInDatabase = await repos.userRepository.findById(authUser.id)

      if (!userInDatabase) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User not found.',
        })
      }

      const isCurrentPasswordValid = await bcrypt.compare(
        currentPassword,
        userInDatabase.password
      )

      if (!isCurrentPasswordValid) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'The current password is incorrect',
        })
      }

      const hashedPassword = await hash(newPassword, config.auth.passwordCost)

      await repos.userRepository.updatePassword(
        hashedPassword,
        userInDatabase.id
      )

      return {
        email: userInDatabase.email,
        message: 'Password successfully updated',
      }
    }
  )

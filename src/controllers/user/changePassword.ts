import { publicProcedure } from '@server/trpc'
import provideRepos from '@server/trpc/provideRepos'
import { userRepository } from '@server/repositories/userRepository'
import { changePasswordSchema, type AuthUser } from '@server/entities/user'
import { TRPCError } from '@trpc/server'
import jsonwebtoken from 'jsonwebtoken'
import config from '@server/config'
import bcrypt, { hash } from 'bcrypt'

const { tokenKey } = config.auth

export default publicProcedure
  .use(provideRepos({ userRepository }))
  .input(changePasswordSchema)
  .mutation(
    async ({
      input: { email, currentPassword, newPassword },
      ctx: { repos, req },
    }) => {
      if (!req) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'This endpoint should be in express',
        })
      }

      const token = req.header('Authorization')?.replace('Bearer ', '')

      if (!token) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Missing token.',
        })
      }

      const { user } = getUserFromToken(token)

      if (user.email !== email) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'You are not authorized to change this password.',
        })
      }

      const userInDatabase = await repos.userRepository.findByEmail(email)

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
        userInDatabase.email
      )

      return { email, message: 'Password successfullt updated' }
    }
  )

function getUserFromToken(token: string) {
  return jsonwebtoken.verify(token, tokenKey) as { user: AuthUser }
}

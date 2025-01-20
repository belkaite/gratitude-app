import { userSchema } from '@server/entities/user'
import { userRepository } from '@server/repositories/userRepository'
import { publicProcedure } from '@server/trpc'
import provideRepos from '@server/trpc/provideRepos'
import { TRPCError } from '@trpc/server'
import bcrypt from 'bcrypt'

export default publicProcedure
  .use(provideRepos({ userRepository }))
  .input(userSchema.pick({ email: true, password: true }))
  .mutation(async ({ input: { email, password }, ctx: { repos } }) => {
    const user = await repos.userRepository.findByEmail(email)

    if (!user) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'We could not find your account with this email address',
      })
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Incorrect password. Please try again',
      })
    }

    return {
      email,
    }
  })

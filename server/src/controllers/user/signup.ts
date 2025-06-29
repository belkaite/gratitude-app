import { publicProcedure } from '@server/trpc'
import provideRepos from '@server/trpc/provideRepos'
import { userRepository } from '@server/repositories/userRepository'
import { userSchema } from '@server/entities/user'
import { hash } from 'bcrypt'
import config from '@server/config'
// import { assertError } from '@server/utils/errors'
import { TRPCError } from '@trpc/server'

export default publicProcedure
  .use(provideRepos({ userRepository }))
  .input(
    userSchema.pick({
      email: true,
      password: true,
      firstName: true,
      lastName: true,
    })
  )
  .mutation(async ({ input, ctx: { repos } }) => {
    const { email, password, firstName, lastName } = input

    const existingUser = await repos.userRepository.findByEmail(email)
  
    if (existingUser) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message:
          'User with this email already exists. Please sign up with another email.',
      })
    }

    const hashedPassword = await hash(password, config.auth.passwordCost)

    const newUser = await repos.userRepository
      .create({
        email,
        password: hashedPassword,
        firstName,
        lastName,
      })


    return { id: newUser.id }
  })

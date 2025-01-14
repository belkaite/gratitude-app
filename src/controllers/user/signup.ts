import { publicProcedure } from '@server/trpc'
import provideRepos from '@server/trpc/provideRepos'
import { userRepository } from '@server/repositories/userRepository'
import { userSchema } from '@server/entities/user'

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
    const newUser = await repos.userRepository.create({
      email,
      password,
      firstName,
      lastName,
    })

    return { id: newUser.id }
  })

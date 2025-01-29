import config from '@server/config'
import jsonwebtoken from 'jsonwebtoken'
import { TRPCError } from '@trpc/server'
import { parseTokenPayload } from '../tokenPayload'
import { publicProcedure } from '..'

const { tokenKey } = config.auth

function verify(token: string) {
  return jsonwebtoken.verify(token, tokenKey)
}

function getUserFromToken(token: string | undefined) {
  if (!token) {
    throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'You must log in to access this website'
    })
  }
  try {
    const tokenVerified = verify(token)
    const tokenParsed = parseTokenPayload(tokenVerified)

    return tokenParsed.user
  } catch (error) {
    return null
  }
}

export const authenticatedProcedure = publicProcedure.use(({ ctx, next }) => {
  if (ctx.authUser) {
    return next({
      ctx: {
        authUser: ctx.authUser,
      },
    })
  }

  if (!ctx.req) {
    const message =
      config.env === 'development' || config.env === 'test'
        ? 'Missing Express request object. If you are running tests, make sure to provide some req object in the procedure context.'
        : 'Missing Express request object.'

    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message,
    })
  }

  const token = ctx.req.header('Authorization')?.replace('Bearer ', '')

  const authUser = getUserFromToken(token)

  if (!authUser) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Invalid token',
    })
  }

  return next({
    ctx: {
      authUser,
    },
  })
})

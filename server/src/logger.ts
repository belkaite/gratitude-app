import pino from 'pino'

process.env.TZ = 'Europe/Kiev'

export const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      translateTime: 'SYS:yyyy-mm-dd HH:MM:ss Z',
    },
  },
})

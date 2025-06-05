import createApp from './app'
import { createDatabase } from './database'
import config from './config'
import { logger } from './logger'

const database = createDatabase(config.database)
logger.info('Database initialized')

const app = createApp(database)

const server = app.listen(config.port, () => {
  logger.info(`Server is running on port ${config.port}`)
})

async function gracefulShutdown() {
  logger.info('Closing server')

  await new Promise((resolve) => {
    server.close(resolve)
  })
  logger.info('Server closed.')

  await database.destroy()
  logger.info('Database destroyed.')

  process.exit(1)
}

process.on('uncaughtException', (error) => {
  logger.fatal(error,`Uncaught exception`)
  gracefulShutdown()
})

process.on('unhandledRejection', (reason) => {
  logger.fatal(reason, `Unhandled promise rejection`)
  gracefulShutdown()
})

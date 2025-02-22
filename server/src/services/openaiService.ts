import OpenAI from 'openai'
import config from '@server/config'

const openai = new OpenAI({
  apiKey: config.ai.apiKey,
})

export default openai

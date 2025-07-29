import { defineStore } from 'pinia'
import { ref } from 'vue'
import { trpc } from '@/trpc'

export const useAIStore = defineStore('ai', () => {
  const aiResponse = ref('')

  async function getAIresponse() {
    const response = await trpc.aiReflection.reflectAnswers.query()
    aiResponse.value = response
  }
  return { aiResponse, getAIresponse }
})

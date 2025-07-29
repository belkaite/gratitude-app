import { defineStore } from 'pinia'
import { ref } from 'vue'
import { trpc } from '@/trpc'

export const useQuestionStore = defineStore('question', () => {
  const firstQuestion = ref('')
  const secondQuestion = ref(' ')

  async function getQuestions() {
    const { question1, question2 } = await trpc.question.fetchQuestions.query()
    firstQuestion.value = question1
    secondQuestion.value = question2
  }

  return { getQuestions, firstQuestion, secondQuestion }
})

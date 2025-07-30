import { defineStore } from 'pinia'
import { ref } from 'vue'
import { trpc } from '@/trpc'
import type { ShownTip } from '@server/shared/types'

export const useTipStore = defineStore('tip', () => {
  const tips = ref<ShownTip[]>([])

  async function getShownTips() {
    tips.value = await trpc.unlockedTips.get.query()
  }

  return {
    getShownTips,
    tips,
  }
})

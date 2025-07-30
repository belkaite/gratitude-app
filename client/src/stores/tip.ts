import { defineStore } from 'pinia'
import { ref } from 'vue'
import { trpc } from '@/trpc'
import type { ShownTip } from '@server/shared/types'

export const useTipStore = defineStore('tip', () => {
  const tips = ref<ShownTip[]>([])
  const lastTip = ref()

  async function getShownTips() {
    tips.value = await trpc.unlockedTips.get.query()
  }

  async function getLastTip() {
    lastTip.value = await trpc.unlockedTips.getLast.query()
  }

  return {
    getShownTips,
    tips,
    getLastTip,
    lastTip
  }
})

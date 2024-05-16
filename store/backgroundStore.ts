import { create } from 'zustand'

import { TempBackgroundState } from '@/types'

export const useTempBackgroundStore = create<TempBackgroundState>()((set) => ({
  temporarilyMovedToBackground: false,
  setTemporarilyMovedToBackground: () =>
    set((state) => ({ temporarilyMovedToBackground: !state.temporarilyMovedToBackground })),
}))

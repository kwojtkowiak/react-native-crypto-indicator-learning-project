import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { BalanceState, Transaction } from '@/types'

export const useBalanceStore = create<BalanceState>()(
  persist(
    (set, get) => ({
      transactions: [],
      runTransaction: (transaction: Transaction) => {
        set((state) => ({ transactions: [...state.transactions, transaction] }))
      },
      balance: () => get().transactions.reduce((acc, t) => acc + t.amount, 0),
      clearTransactions: () => {
        set({ transactions: [] })
      },
    }),
    { name: 'balance', storage: createJSONStorage(() => AsyncStorage) }
  )
)

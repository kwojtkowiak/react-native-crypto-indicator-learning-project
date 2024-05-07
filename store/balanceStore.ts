import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { BalanceState, Transaction } from '@/types'
import { formatDate } from '@/utils/date.utils'

export const useBalanceStore = create<BalanceState>()(
  persist(
    (set, get) => ({
      transactions: [],
      runTransaction: (transaction: Transaction) => {
        const formattedTransaction: Transaction = {
          ...transaction,
          date: formatDate(transaction.date, 'dd/MM/yyyy HH:mm'),
        }
        set((state) => ({ transactions: [...state.transactions, formattedTransaction] }))
      },
      balance: () => get().transactions.reduce((acc, t) => acc + t.amount, 0),
      clearTransactions: () => {
        set({ transactions: [] })
      },
    }),
    { name: 'balance', storage: createJSONStorage(() => AsyncStorage) }
  )
)

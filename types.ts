import { Ionicons } from '@expo/vector-icons'

export enum SignInType {
  Phone,
  Email,
  Google,
  Apple,
}
export type IconName = keyof typeof Ionicons.glyphMap

export type Transaction = {
  id: string
  amount: number
  date: Date
  title: string
}

export type BalanceState = {
  transactions: Transaction[]
  runTransaction: (transaction: Transaction) => void
  balance: () => number
  clearTransactions: () => void
}

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
  date: Date | string
  title: string
}

export type BalanceState = {
  transactions: Transaction[]
  runTransaction: (transaction: Transaction) => void
  balance: () => number
  clearTransactions: () => void
}

export type TilePosition = {
  x: number
  y: number
}

export type TilePositionsState = {
  [id: string]: TilePosition
}

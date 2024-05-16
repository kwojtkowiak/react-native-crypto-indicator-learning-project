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

export type TempBackgroundState = {
  temporarilyMovedToBackground: boolean
  setTemporarilyMovedToBackground: () => void
}

export type TilePosition = {
  x: number
  y: number
}

export type TilePositionsState = {
  [id: string]: TilePosition
}

export type CryptoCurrency = {
  id: number
  name: string
  symbol: string
  slug: string
  num_market_pairs: number
  date_added: string
  tags: string[]
  max_supply: number
  circulating_supply: number
  total_supply: number
  infinite_supply: boolean
  platform?: any
  cmc_rank: number
  self_reported_circulating_supply?: any
  self_reported_market_cap?: any
  tvl_ratio?: any
  last_updated: string
  quote: Quote
}

export type Quote = {
  EUR: EUR
}

export type EUR = {
  price: number
  volume_24h: number
  volume_change_24h: number
  percent_change_1h: number
  percent_change_24h: number
  percent_change_7d: number
  percent_change_30d: number
  percent_change_60d: number
  percent_change_90d: number
  market_cap: number
  market_cap_dominance: number
  fully_diluted_market_cap: number
  tvl?: any
  last_updated: string
}

export type Ticker = {
  timestamp: string
  price: number
  volume_24h: number
  market_cap: number
}

// import { QUERY_KEYS } from '@/constants/queryKeys'
// import { Ticker } from '@/types'
// import { useQuery } from '@tanstack/react-query'

// export function useCryptoTickers(symbol: string, name: string, ids: number[] | number) {
//   const tickerName = symbol == 'BNB' ? 'bnb-binance-coin' : `${symbol.toLowerCase()}-${name}`

//   return useQuery({
//     queryKey: [QUERY_KEYS.GET_TICKER, symbol, name],
//     queryFn: (): Promise<Ticker[]> => fetch(`/api/tickers?tickername=${tickerName}`).then((res) => res.json()),
//   })
// }

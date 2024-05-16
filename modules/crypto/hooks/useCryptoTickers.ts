import { QUERY_KEYS } from '@/constants/queryKeys'
import { Ticker } from '@/types'
import { useQuery } from '@tanstack/react-query'

export function useCryptoTickers(tickerName: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_TICKER, tickerName],
    queryFn: (): Promise<Ticker[]> => fetch(`/api/tickers?tickername=${tickerName}`).then((res) => res.json()),
    enabled: !!tickerName,
  })
}

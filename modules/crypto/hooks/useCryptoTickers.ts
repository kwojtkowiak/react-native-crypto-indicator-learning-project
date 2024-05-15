import { QUERY_KEYS } from '@/constants/queryKeys'
import { Ticker } from '@/types'
import { useQuery } from '@tanstack/react-query'

export function useCryptoTickers() {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_TICKER],
    queryFn: (): Promise<Ticker[]> => fetch(`/api/tickers`).then((res) => res.json()),
  })
}

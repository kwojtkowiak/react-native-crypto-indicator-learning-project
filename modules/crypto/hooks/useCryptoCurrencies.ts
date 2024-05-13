import { QUERY_KEYS } from '@/constants/queryKeys'
import { useQuery } from '@tanstack/react-query'

export function useCryptoCurrencies(ids: number[] | number) {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_INFO, ids],
    queryFn: () => fetch(`/api/info?ids=${ids}`).then((res) => res.json()),
    enabled: !!ids,
  })
}

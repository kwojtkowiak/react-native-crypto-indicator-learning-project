import { useQuery } from '@tanstack/react-query'
import { ActivityIndicator, Image, Text, View } from 'react-native'

import { QUERY_KEYS } from '@/constants/queryKeys'
import colors from '@/styles/colors'
import { CryptoCurrency } from '@/types'
import { Link } from 'expo-router'

export default function Page() {
  const currencies = useQuery({
    queryKey: [QUERY_KEYS.GET_CURRENCIES],
    queryFn: async () => {
      const response = await fetch('/api/listings')
      return await response.json()
    },
  })
  const ids = currencies.data?.map((currency: CryptoCurrency) => currency.id).join(',')

  const { data } = useQuery({
    queryKey: [QUERY_KEYS.GET_INFO, ids],
    queryFn: async () => {
      const response = await fetch(`/api/info?ids=${ids}`)
      return await response.json()
    },
    // not simply "ids" because in JS "[]" is considered truthy
    enabled: !!ids,
  })

  if (currencies.isLoading) {
    return <ActivityIndicator color={colors.primary} />
  }

  return (
    <View>
      {currencies.data?.map((currency: CryptoCurrency) => (
        <Link key={currency.id} href={`/crypto/${currency.id}`}>
          <View key={currency.id} style={{ flexDirection: 'row' }}>
            <Image source={{ uri: data?.[currency.id].logo }} style={{ width: 32, height: 32 }}></Image>
            <Text key={currency.id}>{currency.name}</Text>
          </View>
        </Link>
      ))}
    </View>
  )
}

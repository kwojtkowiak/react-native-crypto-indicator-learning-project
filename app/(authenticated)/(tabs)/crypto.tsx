import { useHeaderHeight } from '@react-navigation/elements'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'expo-router'
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

import { HeaderAndDesc } from '@/components/HeaderAndDesc'
import { QUERY_KEYS } from '@/constants/queryKeys'
import { useCryptoCurrencies } from '@/modules/crypto/hooks/useCryptoCurrencies'
import colors from '@/styles/colors'
import { defaultStyles } from '@/styles/styles'
import { CryptoCurrency } from '@/types'
import { Ionicons } from '@expo/vector-icons'

export default function Page() {
  const headerHeight = useHeaderHeight()

  const currencies = useQuery({
    queryKey: [QUERY_KEYS.GET_CURRENCIES],
    queryFn: async () => {
      const response = await fetch('/api/listings')
      return await response.json()
    },
  })
  const ids = currencies.data?.map((currency: CryptoCurrency) => currency.id).join(',')

  const { data } = useCryptoCurrencies(ids)

  if (currencies.isLoading) {
    return <ActivityIndicator color={colors.primary} />
  }

  return (
    <ScrollView style={{ backgroundColor: colors.background }} contentContainerStyle={{ paddingTop: headerHeight }}>
      <HeaderAndDesc
        headerText="Latest Crypto"
        headerStyle={{ paddingHorizontal: 20, paddingBottom: 4, fontSize: 20 }}
      />
      <View style={defaultStyles.block}>
        {currencies.data?.map((currency: CryptoCurrency) => (
          <Link key={currency.id} href={`/crypto/${currency.id}`} asChild>
            <TouchableOpacity key={currency.id} style={{ flexDirection: 'row', gap: 14, alignItems: 'center' }}>
              <Image source={{ uri: data?.[currency.id].logo }} style={{ width: 40, height: 40 }}></Image>
              <View style={{ flex: 1, gap: 6 }}>
                <Text style={{ color: colors.dark, fontWeight: '600' }}>{currency.name}</Text>
                <Text style={{ color: colors.gray }}>{currency.symbol}</Text>
              </View>
              <View style={{ gap: 6, alignItems: 'flex-end' }}>
                <Text style={{ color: colors.gray }}>{currency.quote.EUR.price.toFixed(2)} €</Text>
                <View style={{ flexDirection: 'row', gap: 4 }}>
                  <Ionicons
                    name={currency.quote.EUR.percent_change_1h > 0 ? 'caret-up' : 'caret-down'}
                    size={16}
                    color={colors.success}
                  />
                  <Text style={{ color: currency.quote.EUR.percent_change_1h > 0 ? colors.success : colors.error }}>
                    {currency.quote.EUR.percent_change_1h.toFixed(2)}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </Link>
        ))}
      </View>
    </ScrollView>
  )
}

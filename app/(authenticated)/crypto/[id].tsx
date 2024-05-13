import { Stack, useLocalSearchParams } from 'expo-router'
import { Image, SectionList, StyleSheet, Text, View } from 'react-native'

import { useCryptoCurrencies } from '@/modules/crypto/hooks/useCryptoCurrencies'
import colors from '@/styles/colors'
import { defaultStyles } from '@/styles/styles'

export default function Page() {
  const { id } = useLocalSearchParams()

  const { data } = useCryptoCurrencies(+id!)

  if (!id || typeof id !== 'string' || !data || !data[id]) {
    return <Text style={{ color: colors.error }}>No data found!</Text>
  }
  return (
    <>
      <Stack.Screen options={{ title: data?.[id].name }} />
      <SectionList
        keyExtractor={(i) => i.title}
        contentInsetAdjustmentBehavior="always"
        sections={[{ data: [{ title: 'Chart' }] }]}
        ListHeaderComponent={() => (
          <>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginHorizontal: 16,
              }}
            >
              <Text style={styles.subtitle}>{data?.[id].symbol}</Text>
              <Image source={{ uri: data?.[id].logo }} style={{ width: 40, height: 40 }} />
            </View>
          </>
        )}
        renderItem={({ item }) => (
          <>
            <View style={[defaultStyles.block, { marginTop: 20 }]}>
              <Text style={styles.subtitle}>Overview</Text>
              <Text style={{ color: colors.gray }}>
                Bitcoin is a decentralized digital currency, without a central bank or single administrator, that can be
                sent from user to user on the peer-to-peer bitcoin network without the need for intermediaries.
                Transactions are verified by network nodes through cryptography and recorded in a public distributed
                ledger called a blockchain.
              </Text>
            </View>
          </>
        )}
      />
    </>
  )
}

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.gray,
  },
  categoryText: {
    fontSize: 14,
    color: colors.gray,
  },
  categoryTextActive: {
    fontSize: 14,
    color: '#000',
  },
  categoriesBtn: {
    padding: 10,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  categoriesBtnActive: {
    padding: 10,
    paddingHorizontal: 14,

    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
  },
})

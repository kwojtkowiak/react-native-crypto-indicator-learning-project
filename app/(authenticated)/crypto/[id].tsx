import { Ionicons } from '@expo/vector-icons'
import { useFont } from '@shopify/react-native-skia'
import { format } from 'date-fns'
import * as Haptics from 'expo-haptics'
import { Stack, useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Image,
  ScrollView,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useAnimatedProps } from 'react-native-reanimated'
import { CartesianChart, Line, useChartPressState } from 'victory-native'

import { AnimatedTextInput } from '@/components/AnimatedTextInput'
import { cryptoInfoCategories } from '@/constants/cryptoInfoCategories'
import { ChartTouchTooltip } from '@/modules/crypto/components/ChartTouchTooltip'
import { useCryptoCurrencies } from '@/modules/crypto/hooks/useCryptoCurrencies'
import { useCryptoTickers } from '@/modules/crypto/hooks/useCryptoTickers'
import colors from '@/styles/colors'
import { defaultStyles } from '@/styles/styles'

export default function Page() {
  const { id } = useLocalSearchParams()

  const font = useFont(require('@/assets/fonts/SpaceMono-Regular.ttf'), 12)
  const { state, isActive } = useChartPressState({ x: '0', y: { price: 0 } })

  const [activeCategory, setActiveCategory] = useState('Overview')
  const [tickerName, setTickerName] = useState('')

  const { data, isError } = useCryptoCurrencies(+id!)

  useEffect(() => {
    if (data && data[+id!]) {
      const newTickerName =
        data[+id!].symbol === 'BNB'
          ? 'bnb-binance-coin'
          : data[+id!].symbol === 'USDT'
          ? 'usdt-tether'
          : `${data[+id!].symbol.toLowerCase()}-${data[+id!].name.toLowerCase()}`
      setTickerName(newTickerName)
    } else {
      setTickerName('')
    }
  }, [data, id])

  const { data: tickers, isError: tickerError, isLoading: tickerLoading } = useCryptoTickers(tickerName)

  useEffect(() => {
    if (isActive) Haptics.selectionAsync()
  }, [isActive])

  const animatedText = useAnimatedProps(() => {
    return {
      text: `${state.y.price.value.value.toFixed(2)} €`,
      defaultValue: '',
    }
  })

  const animatedDateText = useAnimatedProps(() => {
    const date = new Date(state.x.value.value)
    return {
      text: `${date.toLocaleDateString()}`,
      defaultValue: '',
    }
  })

  if (isError || tickerError) {
    return (
      <View style={{ alignItems: 'center' }}>
        <Text style={{ color: colors.error }}>No data found!</Text>
      </View>
    )
  }

  if (!id || typeof id !== 'string' || !data || !data[id]) {
    return (
      <View style={{ alignItems: 'center' }}>
        <ActivityIndicator color={colors.primary} />
      </View>
    )
  }

  return (
    <>
      <Stack.Screen options={{ title: data?.[id].name }} />
      <SectionList
        keyExtractor={(i) => i.title}
        contentInsetAdjustmentBehavior="always"
        sections={[{ data: [{ title: 'Chart' }] }]}
        /*used because it grants sticky when scrolling*/
        renderSectionHeader={() => (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              paddingHorizontal: 16,
              paddingBottom: 8,
              backgroundColor: colors.background,
              borderBottomColor: colors.lightGray,
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          >
            {cryptoInfoCategories.map((category, index) => (
              <TouchableOpacity
                key={category}
                onPress={() => setActiveCategory(category)}
                style={activeCategory == category ? styles.categoriesBtnActive : styles.categoriesBtn}
              >
                <Text style={activeCategory == category ? styles.categoryText : styles.categoryTextActive}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
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
            <View style={{ flexDirection: 'row', gap: 10, margin: 12 }}>
              <TouchableOpacity
                style={[
                  defaultStyles.pillButtonSmall,
                  { backgroundColor: colors.primary, flexDirection: 'row', gap: 16 },
                ]}
              >
                <Ionicons name={'add'} size={24} color={'#fff'} />
                <Text style={[defaultStyles.buttonText, { color: '#fff' }]}>Buy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  defaultStyles.pillButtonSmall,
                  { backgroundColor: colors.primaryMuted, flexDirection: 'row', gap: 16 },
                ]}
              >
                <Ionicons name={'arrow-back'} size={24} color={colors.primary} />
                <Text style={[defaultStyles.buttonText, { color: colors.primary }]}>Receive</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        renderItem={({ item }) => (
          <>
            <View style={[defaultStyles.block, { height: 500 }]}>
              {tickerLoading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <ActivityIndicator color={colors.primary} />
                </View>
              ) : (
                tickers && (
                  <>
                    {!isActive && (
                      <View>
                        <Text style={{ fontSize: 30, fontWeight: 'bold', color: colors.dark }}>
                          {tickers[tickers.length - 1].price.toFixed(2)}
                        </Text>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.gray }}>Today</Text>
                      </View>
                    )}
                    {isActive && (
                      <View>
                        <AnimatedTextInput
                          editable={false}
                          underlineColorAndroid={'transparent'}
                          style={{ fontSize: 30, fontWeight: 'bold', color: colors.dark }}
                          animatedProps={animatedText}
                        />
                        <AnimatedTextInput
                          editable={false}
                          underlineColorAndroid={'transparent'}
                          style={{ fontSize: 18, color: colors.gray }}
                          animatedProps={animatedDateText}
                        />
                      </View>
                    )}
                    <CartesianChart
                      chartPressState={state}
                      data={tickers}
                      xKey="timestamp"
                      yKeys={['price']}
                      axisOptions={{
                        font,
                        tickCount: 3,
                        labelOffset: { x: -2, y: 0 },
                        labelColor: colors.gray,
                        formatXLabel: (ms) => format(new Date(ms), 'MM/yyyy'),
                        formatYLabel: (value) => `${value} €`,
                      }}
                    >
                      {({ points }) => (
                        <>
                          <Line points={points.price} color={colors.primary} strokeWidth={3} />
                          {isActive && <ChartTouchTooltip x={state.x.position} y={state.y.price.position} />}
                        </>
                      )}
                    </CartesianChart>
                  </>
                )
              )}
            </View>
            <View style={[defaultStyles.block, { marginTop: 20 }]}>
              <Text style={styles.subtitle}>Overview</Text>
              <Text style={{ color: colors.gray }}>{data?.[id].description}</Text>
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

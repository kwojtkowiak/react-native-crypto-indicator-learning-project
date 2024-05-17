import { useUser } from '@clerk/clerk-expo'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import * as Haptics from 'expo-haptics'
import * as LocalAuthentication from 'expo-local-authentication'
import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'

import { useTempBackgroundStore } from '@/store/backgroundStore'
import colors from '@/styles/colors'

export default function Page() {
  const { user } = useUser()
  const [firstName, setFirstName] = useState(user?.firstName)
  const [code, setCode] = useState<number[]>([])
  const codeLength = Array(6).fill(0)
  const router = useRouter()
  const setTemporarilyMovedToBackground = useTempBackgroundStore((state) => state.setTemporarilyMovedToBackground)

  const offset = useSharedValue(0)
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value }],
    }
  })

  const OFFSET = 20
  const TIME = 80

  useEffect(() => {
    if (code.length === 6) {
      console.log(code)
      if (code.join('') == '111111') {
        router.replace('/(authenticated)/(tabs)/home')
      } else {
        offset.value = withSequence(
          withTiming(-OFFSET, { duration: TIME / 2 }),
          withRepeat(withTiming(OFFSET, { duration: TIME }), 4, true),
          withTiming(0, { duration: TIME / 2 })
        )
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
        setCode([])
      }
    }
  }, [code])

  function onNumberPress(number: number) {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    setCode([...code, number])
  }

  function numberBackspace() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    setCode(code.slice(0, -1))
  }

  async function onBiometricTouch() {
    setTemporarilyMovedToBackground()
    const { success } = await LocalAuthentication.authenticateAsync()
    if (success) {
      router.replace('/(authenticated)/(tabs)/home')
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
    }
    setTimeout(() => {
      setTemporarilyMovedToBackground()
    }, 1000)
  }

  return (
    <SafeAreaView>
      <Text style={styles.greeting}>Welcome back, {firstName}</Text>
      <Animated.View style={[styles.codeView, animatedStyle]}>
        {codeLength.map((_, index) => (
          <View
            key={index}
            style={[styles.codeEmpty, { backgroundColor: code[index] ? colors.primary : colors.lightGray }]}
          ></View>
        ))}
      </Animated.View>
      <View style={styles.numbersView}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          {[1, 2, 3].map((number) => (
            <TouchableOpacity key={number} onPress={() => onNumberPress(number)}>
              <Text style={styles.number}>{number}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          {[4, 5, 6].map((number) => (
            <TouchableOpacity key={number} onPress={() => onNumberPress(number)}>
              <Text style={styles.number}>{number}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          {[7, 8, 9].map((number) => (
            <TouchableOpacity key={number} onPress={() => onNumberPress(number)}>
              <Text style={styles.number}>{number}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <TouchableOpacity onPress={onBiometricTouch}>
            <MaterialCommunityIcons name="face-recognition" size={26} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onNumberPress(0)}>
            <Text style={styles.number}>0</Text>
          </TouchableOpacity>
          <View style={{ minWidth: 12 }}>
            {code.length > 0 && (
              <TouchableOpacity onPress={numberBackspace}>
                <MaterialCommunityIcons name="backspace-outline" size={26} color="black" />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <Text
          style={{
            alignSelf: 'center',
            color: colors.primary,
            fontWeight: '500',
            fontSize: 18,
          }}
        >
          Forgot your passcode?
        </Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  greeting: { fontSize: 24, fontWeight: 'bold', marginTop: 80, alignSelf: 'center' },
  codeView: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 100, gap: 20 },
  codeEmpty: { width: 40, height: 40, borderRadius: 20 },
  numbersView: { marginHorizontal: 80, gap: 60 },
  number: { fontSize: 32 },
})

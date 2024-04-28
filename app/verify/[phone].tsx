import { HeaderAndDesc } from '@/components/HeaderAndDesc'
import { defaultStyles } from '@/styles/styles'
import { verifyCode, verifySignIn } from '@/utils/clerk'
import { useSignIn, useSignUp } from '@clerk/clerk-expo'
import { useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { View, Text } from 'react-native'

export default function Page() {
  const { phone, isLogin } = useLocalSearchParams<{ phone: string; isLogin: string }>()
  const [code, setCode] = useState('')
  const { signIn } = useSignIn()
  const { signUp, setActive } = useSignUp()

  useEffect(() => {
    if (code.length == 6) {
      if (isLogin == 'true') {
        verifySignIn()
      } else {
        verifyCode()
      }
    }
  }, [code])

  return (
    <View style={defaultStyles.container}>
      <HeaderAndDesc headerText="6-digit code" descText={`Code sent to ${phone} unless you already have an account`} />
    </View>
  )
}

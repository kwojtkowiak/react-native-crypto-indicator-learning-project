import CodeInput from '@/components/CodeInput'
import { HeaderAndDesc } from '@/components/HeaderAndDesc'
import { defaultStyles } from '@/styles/styles'
import { isClerkAPIResponseError, useSignIn, useSignUp } from '@clerk/clerk-expo'
import { Link, useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { Alert, Text, TouchableOpacity, View } from 'react-native'

export default function Page() {
  const { phone, islogin } = useLocalSearchParams<{ phone: string; islogin: string }>()
  console.log('🚀 ~ Page ~ islogin:', islogin)
  const [code, setCode] = useState('')
  const { signIn } = useSignIn()
  const { signUp, setActive } = useSignUp()

  useEffect(() => {
    if (code.length == 6) {
      if (islogin == 'true') {
        verifySignIn()
      } else {
        verifyCode()
      }
    }
  }, [code])

  const verifyCode = async () => {
    try {
      await signUp!.attemptPhoneNumberVerification({
        code,
      })
      await setActive!({ session: signUp!.createdSessionId })
    } catch (err) {
      console.log('error', JSON.stringify(err, null, 2))
      if (isClerkAPIResponseError(err)) {
        Alert.alert('Error', err.errors[0].message)
      }
    }
  }

  const verifySignIn = async () => {
    try {
      await signIn!.attemptFirstFactor({
        strategy: 'phone_code',
        code,
      })
      await setActive!({ session: signIn!.createdSessionId })
    } catch (err) {
      console.log('error', JSON.stringify(err, null, 2))
      if (isClerkAPIResponseError(err)) {
        Alert.alert('Error', err.errors[0].message)
      }
    }
  }

  return (
    <View style={defaultStyles.container}>
      <HeaderAndDesc headerText="6-digit code" descText={`Code sent to ${phone} unless you already have an account`} />
      <CodeInput value={code} setter={setCode}></CodeInput>
      <Link href="/login" replace asChild>
        <TouchableOpacity>
          <Text style={defaultStyles.textLink}>Already have an account? Log in</Text>
        </TouchableOpacity>
      </Link>
    </View>
  )
}

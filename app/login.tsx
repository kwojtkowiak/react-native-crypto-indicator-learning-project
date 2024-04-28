import { useRouter } from 'expo-router'
import { useState } from 'react'
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { CountryPicker } from 'react-native-country-codes-picker'

import { LoginPanel } from '@/components/LoginPanel'
import Colors from '@/styles/colors'
import { defaultStyles } from '@/styles/styles'
import { SignInType } from '@/types'
import { isClerkAPIResponseError, useSignIn } from '@clerk/clerk-expo'

export default function Page() {
  const [show, setShow] = useState(false)
  const [countryCode, setCountryCode] = useState('+48')
  const [phoneNumber, setPhoneNumber] = useState('')
  const router = useRouter()
  const { signIn } = useSignIn()

  const keyboardVerticalOffset = Platform.OS == 'ios' ? 80 : 0

  const onLogin = async (type: SignInType) => {
    if (type == SignInType.Phone) {
      try {
        const fullPhoneNumber = `${countryCode}${phoneNumber}`
        const { supportedFirstFactors } = await signIn!.create({ identifier: fullPhoneNumber })

        const firstPhoneFactor: any = supportedFirstFactors.find((factor: any) => {
          return factor.strategy == 'phone_code'
        })

        const { phoneNumberId } = firstPhoneFactor

        await signIn!.prepareFirstFactor({ strategy: 'phone_code', phoneNumberId })

        router.push({ pathname: '/verify/[phone]', params: { phone: fullPhoneNumber, isLogin: 'true' } })
      } catch (error) {
        console.log('error', JSON.stringify(error, null, 2))
        if (isClerkAPIResponseError(error)) {
          if (error.errors[0].code == 'form_identifier_not_found') {
            Alert.alert('Error', error.errors[0].message)
          }
        }
      }
    }
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={keyboardVerticalOffset}>
      <View style={defaultStyles.container}>
        <Text style={defaultStyles.header}>Welcome back</Text>
        <Text style={defaultStyles.descriptionText}>Enter phone number of your account</Text>
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.input} onPress={() => setShow(true)}>
            <Text style={{ fontSize: 20 }}>{countryCode || 'Select Country Code'}</Text>
          </TouchableOpacity>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Mobile number"
            placeholderTextColor={Colors.gray}
            keyboardType="numeric"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>
        <TouchableOpacity
          style={[defaultStyles.pillButton, phoneNumber != '' ? styles.enabled : styles.disabled, { marginBottom: 20 }]}
          disabled={phoneNumber == ''}
          onPress={() => onLogin(SignInType.Phone)}
        >
          <Text style={defaultStyles.buttonText}>Continue</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          <View style={{ flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: Colors.lightGray }}></View>
          <Text style={{ color: Colors.gray, fontSize: 20 }}>or</Text>
          <View style={{ flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: Colors.lightGray }}></View>
        </View>
        <LoginPanel />
        <CountryPicker
          lang={'pl'}
          show={show}
          pickerButtonOnPress={(item) => {
            setCountryCode(item.dial_code)
            setShow(false)
          }}
          style={{ modal: { height: 400 } }}
          onBackdropPress={() => setShow(false)}
        />
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  inputContainer: { marginVertical: 40, flexDirection: 'row' },
  input: { backgroundColor: Colors.lightGray, padding: 20, borderRadius: 16, fontSize: 20, marginRight: 10 },
  enabled: { backgroundColor: Colors.primary },
  disabled: { backgroundColor: Colors.primaryMuted },
})

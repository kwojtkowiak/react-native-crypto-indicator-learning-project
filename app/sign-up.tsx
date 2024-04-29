import { Link, useRouter } from 'expo-router'
import { useState } from 'react'
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { CountryPicker } from 'react-native-country-codes-picker'

import Colors from '@/styles/colors'
import { defaultStyles } from '@/styles/styles'
import { useSignUp } from '@clerk/clerk-expo'
import { HeaderAndDesc } from '@/components/HeaderAndDesc'

export default function Page() {
  const [show, setShow] = useState(false)
  const [countryCode, setCountryCode] = useState('+48')
  const [phoneNumber, setPhoneNumber] = useState('')

  const router = useRouter()
  const { signUp } = useSignUp()

  const onSignup = async () => {
    const fullPhoneNumber = `${countryCode}${phoneNumber}`
    try {
      await signUp!.create({ phoneNumber: fullPhoneNumber })
      signUp!.preparePhoneNumberVerification()

      router.push({ pathname: '/verify/[phone]', params: { phone: fullPhoneNumber } })
    } catch (error) {
      console.error('Error signing up', error)
    }
  }

  const keyboardVerticalOffset = Platform.OS == 'ios' ? 80 : 0

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={keyboardVerticalOffset}>
      <View style={defaultStyles.container}>
        <HeaderAndDesc
          headerText="Let's get started!"
          descText="Enter your phone number. We will send you a confirmation code there"
        />
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
        <Link href={'/login'} replace asChild>
          <TouchableOpacity>
            <Text style={defaultStyles.textLink}>Already have an account? Log in</Text>
          </TouchableOpacity>
        </Link>
        <View style={{ flex: 1 }} />
        <TouchableOpacity
          style={[defaultStyles.pillButton, phoneNumber != '' ? styles.enabled : styles.disabled, { marginBottom: 20 }]}
          onPress={onSignup}
        >
          <Text style={defaultStyles.buttonText}>Sign up</Text>
        </TouchableOpacity>
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

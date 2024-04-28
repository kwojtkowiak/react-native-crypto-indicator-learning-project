import { Link } from 'expo-router'
import { useState } from 'react'
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { CountryPicker } from 'react-native-country-codes-picker'

import Colors from '@/constants/Colors'
import { defaultStyles } from '@/styles/Styles'

export default function Page() {
  const [show, setShow] = useState(false)
  const [countryCode, setCountryCode] = useState('+48')
  const [phoneNumber, setPhoneNumber] = useState('')

  const keyboardVerticalOffset = Platform.OS == 'ios' ? 80 : 0

  const onSignup = async () => {}

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={keyboardVerticalOffset}>
      <View style={defaultStyles.container}>
        <Text style={defaultStyles.header}>Let's get started!</Text>
        <Text style={defaultStyles.descriptionText}>
          Enter your phone number. We will send you a confirmation code there
        </Text>
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

import { Link } from 'expo-router'
import { useState } from 'react'
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { CountryPicker } from 'react-native-country-codes-picker'

import Colors from '@/constants/Colors'
import { defaultStyles } from '@/styles/Styles'
import { Ionicons } from '@expo/vector-icons'

enum SignInType {
  Phone,
  Email,
  Google,
  Apple,
}

export default function Page() {
  const [show, setShow] = useState(false)
  const [countryCode, setCountryCode] = useState('+48')
  const [phoneNumber, setPhoneNumber] = useState('')

  const keyboardVerticalOffset = Platform.OS == 'ios' ? 80 : 0

  const onLogin = async (type: SignInType) => {
    if (type == SignInType.Phone) {
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

        <TouchableOpacity
          onPress={() => onLogin(SignInType.Email)}
          style={[defaultStyles.pillButton, { flexDirection: 'row', gap: 16, marginTop: 20, backgroundColor: '#fff' }]}
        >
          <Ionicons name="mail" size={24} color="#000" />
          <Text style={[defaultStyles.buttonText, { color: '#000' }]}>Continue with e-mail</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onLogin(SignInType.Google)}
          style={[defaultStyles.pillButton, { flexDirection: 'row', gap: 16, marginTop: 20, backgroundColor: '#fff' }]}
        >
          <Ionicons name="logo-google" size={24} color="#000" />
          <Text style={[defaultStyles.buttonText, { color: '#000' }]}>Continue with e-mail</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onLogin(SignInType.Apple)}
          style={[defaultStyles.pillButton, { flexDirection: 'row', gap: 16, marginTop: 20, backgroundColor: '#fff' }]}
        >
          <Ionicons name="logo-apple" size={24} color="#000" />
          <Text style={[defaultStyles.buttonText, { color: '#000' }]}>Continue with e-mail</Text>
        </TouchableOpacity>
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

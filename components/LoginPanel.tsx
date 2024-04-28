import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity, View, Text } from 'react-native'
import { IconName, SignInType } from '@/types'
import { defaultStyles } from '@/styles/styles'

export function LoginPanel() {
  const buttons = [
    { type: SignInType.Email, icon: 'mail', text: 'Continue with E-mail' },
    { type: SignInType.Google, icon: 'logo-google', text: 'Continue with Google' },
    { type: SignInType.Apple, icon: 'logo-apple', text: 'Continue with Apple' },
  ]

  return (
    <View>
      {buttons.map((button) => (
        <TouchableOpacity
          key={button.type}
          onPress={() => {}}
          style={[
            defaultStyles.pillButton,
            { flexDirection: 'row', alignItems: 'center', gap: 16, marginTop: 20, backgroundColor: '#fff' },
          ]}
        >
          <Ionicons name={button.icon as IconName} size={24} color={'#000'} />
          <Text style={[defaultStyles.buttonText, { color: '#000' }]}>{button.text}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

import { RoundButton } from '@/components/RoundButton'
import colors from '@/styles/colors'
import { IconName } from '@/types'
import { useAuth } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

export function AccountActionButtonsPanel() {
  const { signOut } = useAuth()

  const buttonsContent = [
    {
      text: 'Log out',
      icon: 'log-out',
      onPress: () => signOut(),
      touchableStyle: styles.btn,
      iconColor: '#fff',
      labelStyle: styles.label,
      iconSize: 24,
    },
    {
      text: 'Account',
      icon: 'person',
      touchableStyle: styles.btn,
      iconColor: '#fff',
      labelStyle: styles.label,
      iconSize: 24,
    },
    {
      text: 'Learn',
      icon: 'bulb',
      touchableStyle: styles.btn,
      iconColor: '#fff',
      labelStyle: styles.label,
      iconSize: 24,
    },
  ]

  return (
    <View style={styles.actions}>
      {buttonsContent.map((button, index) => (
        <RoundButton
          key={index}
          text={button.text}
          icon={button.icon as IconName}
          iconSize={button.iconSize}
          iconColor={button.iconColor}
          touchableStyle={button.touchableStyle}
          labelStyle={button.labelStyle}
          onPress={button.onPress}
        />
      ))}
      <TouchableOpacity style={styles.btn}>
        <Ionicons name="megaphone" size={24} color={'#fff'} />
        <Text style={{ color: '#fff', fontSize: 18, flex: 1 }}>Inbox</Text>
        <View
          style={{
            backgroundColor: colors.primary,
            paddingHorizontal: 10,
            borderRadius: 10,
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: '#fff', fontSize: 12 }}>14</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  actions: {
    backgroundColor: 'rgba(256, 256, 256, 0.1)',
    borderRadius: 16,
    gap: 0,
    margin: 20,
  },
  btn: {
    padding: 14,
    flexDirection: 'row',
    gap: 20,
  },
  label: { color: '#fff', fontSize: 18 },
})

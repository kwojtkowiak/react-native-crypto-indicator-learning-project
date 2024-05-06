import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import colors from '@/styles/colors'
import { IconName } from '@/types'

type RoundButton = {
  text: string
  icon: IconName
  onPress?: () => void
}
export function RoundButton(props: RoundButton) {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <View style={styles.circle}>
        <Ionicons name={props.icon} size={30} color={colors.dark} />
      </View>
      <Text style={styles.label}>{props.text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', gap: 10 },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: { fontWeight: '500', fontSize: 16, color: colors.dark },
})

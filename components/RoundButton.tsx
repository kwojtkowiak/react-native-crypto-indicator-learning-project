import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import colors from '@/styles/colors'
import { defaultStyles } from '@/styles/styles' 
import { IconName } from '@/types'

type RoundButton = {
  text: string
  icon: IconName
  onPress?: () => void
}
export function RoundButton(props: RoundButton) {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <View style={defaultStyles.circle}>
        <Ionicons name={props.icon} size={30} color={colors.dark} />
      </View>
      <Text style={styles.label}>{props.text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', gap: 10 },
  label: { fontWeight: '500', fontSize: 16, color: colors.dark },
})

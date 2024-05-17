import { Ionicons } from '@expo/vector-icons'
import {
  OpaqueColorValue,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'

import colors from '@/styles/colors'
import { defaultStyles } from '@/styles/styles'
import { IconName } from '@/types'

type RoundButton = {
  text: string
  icon: IconName
  iconSize?: number
  iconColor?: string | OpaqueColorValue
  touchableStyle?: StyleProp<ViewStyle>
  isCircle?: boolean
  circleStyle?: StyleProp<ViewStyle>
  labelStyle?: StyleProp<TextStyle>
  onPress?: () => void
}
export function RoundButton(props: RoundButton) {
  return (
    <TouchableOpacity style={props.touchableStyle ?? styles.container} onPress={props.onPress}>
      {props.isCircle ? (
        <View style={props.circleStyle ?? defaultStyles.circle}>
          <Ionicons name={props.icon} size={props.iconSize ?? 30} color={props.iconColor ?? colors.dark} />
        </View>
      ) : (
        <Ionicons name={props.icon} size={props.iconSize ?? 30} color={props.iconColor ?? colors.dark} />
      )}
      <Text style={props.labelStyle ?? styles.label}>{props.text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', gap: 10 },
  label: { fontWeight: '500', fontSize: 16, color: colors.dark },
})

import Colors from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'

type IconName = keyof typeof Ionicons.glyphMap

type NavigationButtonProps = {
  onPress: () => void
  iconName: IconName
  iconColor?: string
  iconSize?: number
}

export default function NavigationButton(props: NavigationButtonProps) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Ionicons name={props.iconName} size={props.iconSize ?? 34} color={props.iconColor ?? Colors.dark}></Ionicons>
    </TouchableOpacity>
  )
}

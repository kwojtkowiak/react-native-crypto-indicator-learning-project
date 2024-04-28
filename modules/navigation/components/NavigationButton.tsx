import Colors from '@/styles/colors'
import { IconName } from '@/types'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'

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

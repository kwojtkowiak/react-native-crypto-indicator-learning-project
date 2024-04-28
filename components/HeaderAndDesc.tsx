import { defaultStyles } from '@/styles/styles'
import { View, Text } from 'react-native'

export function HeaderAndDesc(props: { headerText: string; descText: string }) {
  return (
    <View>
      <Text style={defaultStyles.header}>{props.headerText}</Text>
      <Text style={defaultStyles.descriptionText}>{props.descText} </Text>
    </View>
  )
}

import { View, Text, TextStyle, StyleProp } from 'react-native'

import { defaultStyles } from '@/styles/styles'

export function HeaderAndDesc(props: {
  headerText: string
  descText?: string
  headerStyle?: StyleProp<TextStyle>
  descStyle?: StyleProp<TextStyle>
}) {
  return (
    <View>
      <Text style={[defaultStyles.header, props.headerStyle]}>{props.headerText}</Text>
      {props.descText && <Text style={[defaultStyles.descriptionText, props.descStyle]}>{props.descText}</Text>}
    </View>
  )
}

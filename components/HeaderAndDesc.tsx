import { View, Text, TextStyle, StyleProp } from 'react-native'

import { defaultStyles } from '@/styles/styles'

type HeaderAndDescProps = {
  headerText: string
  descText?: string
  headerStyle?: StyleProp<TextStyle>
  descStyle?: StyleProp<TextStyle>
}

export function HeaderAndDesc(props: HeaderAndDescProps) {
  return (
    <View>
      <Text style={[defaultStyles.header, props.headerStyle]}>{props.headerText}</Text>
      {props.descText && <Text style={[defaultStyles.descriptionText, props.descStyle]}>{props.descText}</Text>}
    </View>
  )
}

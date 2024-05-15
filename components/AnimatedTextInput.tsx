import { TextInput } from 'react-native'
import Animated from 'react-native-reanimated'

Animated.addWhitelistedNativeProps({ text: true })
export const AnimatedTextInput = Animated.createAnimatedComponent(TextInput)

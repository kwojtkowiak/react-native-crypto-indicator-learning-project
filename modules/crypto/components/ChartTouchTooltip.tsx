import { Circle } from '@shopify/react-native-skia'
import { SharedValue } from 'react-native-reanimated'

import colors from '@/styles/colors'

export function ChartTouchTooltip({ x, y }: { x: SharedValue<number>; y: SharedValue<number> }) {
  return <Circle cx={x} cy={y} r={8} color={colors.primary} />
}

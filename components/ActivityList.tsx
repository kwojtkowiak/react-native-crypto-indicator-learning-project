import { StyleSheet, View } from 'react-native'
import { RoundButton } from './RoundButton'

export function ActivityList() {
  return (
    <View style={styles.actionRow}>
      <RoundButton icon="add" text="Add money" />
      <RoundButton icon="refresh" text="Exchange" />
      <RoundButton icon="list" text="Details" />
      <RoundButton icon="list" text="Details" />
    </View>
  )
}

const styles = StyleSheet.create({
  actionRow: { flexDirection: 'row', justifyContent: 'space-between', padding: 20 },
})

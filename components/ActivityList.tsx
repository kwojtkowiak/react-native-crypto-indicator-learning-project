import { StyleSheet, View } from 'react-native'

import { useBalanceStore } from '@/store/balanceStore'
import { RoundButton } from './RoundButton'

export function ActivityList() {
  const { runTransaction, clearTransactions } = useBalanceStore()

  function onAddMoney() {
    runTransaction({
      id: Math.random().toString(),
      amount: Math.floor(Math.random() * 1000) * (Math.random() > 0.5 ? 1 : -1),
      date: new Date(),
      title: 'Added money',
    })
  }

  return (
    <View style={styles.actionRow}>
      <RoundButton icon="add" text="Add money" onPress={onAddMoney} />
      <RoundButton icon="refresh" text="Exchange" onPress={clearTransactions} />
      <RoundButton icon="list" text="Details" />
      <RoundButton icon="ellipsis-horizontal" text="More" />
    </View>
  )
}

const styles = StyleSheet.create({
  actionRow: { flexDirection: 'row', justifyContent: 'space-between', padding: 20 },
})

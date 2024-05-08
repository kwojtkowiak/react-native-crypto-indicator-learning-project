import { useHeaderHeight } from '@react-navigation/elements'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

import { ActivityList } from '@/components/ActivityList'
import WidgetList from '@/components/SortableList/WidgetList'
import TransactionList from '@/modules/home/components/TransactionList'
import { useBalanceStore } from '@/store/balanceStore'
import colors from '@/styles/colors'

export default function Page() {
  const { balance, transactions } = useBalanceStore()
  const headerHeight = useHeaderHeight()

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={{ paddingTop: headerHeight, paddingBottom: 60 }}
    >
      <View style={styles.account}>
        <View style={styles.row}>
          <Text style={styles.balance}>{balance()}</Text>
          <Text style={styles.currency}>$</Text>
        </View>
      </View>
      <ActivityList />
      {/* Could do with global state, but wanted to pass transactions as prop for practice */}
      <TransactionList transactions={transactions} />
      <WidgetList />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  account: { margin: 80, alignItems: 'center' },
  row: { flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end', gap: 12 },
  balance: { fontSize: 40, fontWeight: 'bold' },
  currency: { fontSize: 20, fontWeight: '500' },
  actionRow: { flexDirection: 'row', justifyContent: 'space-between', padding: 20 },
  transactions: { marginHorizontal: 20, padding: 14, backgroundColor: '#fff', borderRadius: 16, gap: 20 },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, Text, View } from 'react-native'

import colors from '@/styles/colors'
import { defaultStyles } from '@/styles/styles'
import { Transaction } from '@/types'

export default function TransactionList(props: { transactions: Transaction[] }) {
  return (
    <>
      <Text style={defaultStyles.sectionHeader}>Transactions</Text>
      <View style={styles.transactions}>
        {props.transactions.length == 0 && <Text style={{ padding: 14, color: colors.gray }}>No transactions yet</Text>}
        {props.transactions.reverse().map((transaction) => (
          <View key={transaction.id} style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
            <View style={styles.circle}>
              <Ionicons name={transaction.amount > 0 ? 'add' : 'remove'} size={24} color={colors.dark} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: '400' }}>{transaction.title}</Text>
              <Text style={{ color: colors.gray, fontSize: 12 }}>{transaction.date.toLocaleString()}</Text>
            </View>
            <Text style={{ fontWeight: '400', color: transaction.amount < 0 ? 'red' : 'black' }}>
              {transaction.amount}$
            </Text>
          </View>
        ))}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
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

import { ActivityList } from '@/components/ActivityList'
import colors from '@/styles/colors'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

export default function Page() {
  const balance = (Math.random() * (1000 - 100) + 1000).toFixed(2)
  return (
    <ScrollView style={{ backgroundColor: colors.background }}>
      <View style={styles.account}>
        <View style={styles.row}>
          <Text style={styles.balance}>{balance}</Text>
          <Text style={styles.currency}>$</Text>
        </View>
      </View>
      <ActivityList />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  account: { margin: 80, alignItems: 'center' },
  row: { flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end', gap: 12 },
  balance: { fontSize: 40, fontWeight: 'bold' },
  currency: { fontSize: 20, fontWeight: '500' },
  actionRow: { flexDirection: 'row', justifyContent: 'space-between', padding: 20 },
})

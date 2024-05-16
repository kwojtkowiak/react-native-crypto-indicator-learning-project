import { useUser } from '@clerk/clerk-expo'
import { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Page() {
  const { user } = useUser()
  const [firstName, setFirstName] = useState(user?.firstName)
  const [code, setCode] = useState<number[]>([])

  useEffect(() => {
    if (code.length === 6) {
      console.log(code)
    }
  }, [code])

  return (
    <SafeAreaView style={{ backgroundColor: 'yellow' }}>
      <Text>Welcome back, {firstName}</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  greeting: { fontSize: 24, fontWeight: 'bold' },
  row: { flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end', gap: 12 },
  balance: { fontSize: 40, fontWeight: 'bold' },
  currency: { fontSize: 20, fontWeight: '500' },
  actionRow: { flexDirection: 'row', justifyContent: 'space-between', padding: 20 },
  transactions: { marginHorizontal: 20, padding: 14, backgroundColor: '#fff', borderRadius: 16, gap: 20 },
})

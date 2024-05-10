import { useEffect } from 'react'
import { View, Text } from 'react-native'

export default function Page() {
  useEffect(() => {
    const foo = async () => {
      const res = await fetch('/api/listings')
      const data = await res.json()
      console.log('🚀 ~ foo ~ data:', data)
    }
    foo()
  }, [])

  return (
    <View>
      <Text>EXAMPLE</Text>
    </View>
  )
}

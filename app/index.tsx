import { useAssets } from 'expo-asset'
import { View, Text, StyleSheet } from 'react-native'

export default function Page() {
  const [assets] = useAssets([require('@/assets/videos/video1.mp4')])

  return (
    <View style={styles.container}>
      <Text>UPDATE</Text>
    </View>
  )
}

const styles = StyleSheet.create({ container: { flex: 1, justifyContent: 'center' } })

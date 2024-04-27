import { useAssets } from 'expo-asset'
import { ResizeMode, Video } from 'expo-av'
import { Link } from 'expo-router'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import Colors from '@/constants/Colors'
import { defaultStyles } from '@/styles/Styles'

export default function Page() {
  const [assets, error] = useAssets([require('@/assets/videos/video1.mp4')])

  return (
    <View style={styles.container}>
      {assets ? (
        <Video
          resizeMode={ResizeMode.COVER}
          isMuted
          isLooping
          shouldPlay
          source={{ uri: assets[0].uri }}
          style={styles.video}
        />
      ) : (
        error && <Text style={styles.errorMsg}>{error.message}</Text>
      )}
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Change the way you invest in crypto!</Text>
      </View>
      <View style={styles.buttons}>
        <Link href="/login" asChild style={[defaultStyles.pillButton, { flex: 1, backgroundColor: Colors.dark }]}>
          <TouchableOpacity>
            <Text style={{ color: '#fff', fontSize: 22, fontWeight: '500' }}>Log in</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/sign-up" asChild style={[defaultStyles.pillButton, { flex: 1, backgroundColor: '#fff' }]}>
          <TouchableOpacity>
            <Text style={{ fontSize: 22, fontWeight: '500' }}>Sign up</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'space-between' },
  video: { width: '100%', height: '100%', position: 'absolute' },
  header: {
    fontSize: 36,
    fontWeight: '900',
    color: '#fff',
    textTransform: 'uppercase',
  },
  headerContainer: { marginTop: 80, padding: 20 },
  errorMsg: { color: Colors.error },
  buttons: { flexDirection: 'row', justifyContent: 'center', gap: 20, marginBottom: 60, paddingHorizontal: 20 },
})

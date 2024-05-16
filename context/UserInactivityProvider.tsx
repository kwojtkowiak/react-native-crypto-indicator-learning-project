import { useAuth } from '@clerk/clerk-expo'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SplashScreen, useRouter } from 'expo-router'
import { useEffect, useRef, useState } from 'react'
import { AppState, AppStateStatus, View, StyleSheet, Text } from 'react-native'

export function UserInactivityProvider(props: { children: any }) {
  const appState = useRef(AppState.currentState)
  const router = useRouter()
  const { isSignedIn } = useAuth()
  const [isBackground, setIsBackground] = useState(false)

  useEffect(() => {
    const subscription = AppState.addEventListener('change', handleAppStateChange)

    return () => {
      subscription.remove()
    }
  }, [])

  const handleAppStateChange = async (nextAppState: AppStateStatus) => {
    setIsBackground(true)
    if (nextAppState == 'background') {
      recordStartTime()
    } else if (nextAppState == 'active' && appState.current.match(/background/)) {
      const startTime = await AsyncStorage.getItem('startTime')
      const elapsed = Date.now() - (startTime ? parseInt(startTime, 10) : 0)
      if (elapsed > 2500 && isSignedIn) {
        console.log('🚀 ~ handleAppStateChange ~ isSignedIn:', isSignedIn)
        console.log('🚀 ~ handleAppStateChange ~ elapsed:', elapsed)
        router.replace('/(authenticated)/(modals)/lock')
      }
      setIsBackground(false)
    }
    appState.current = nextAppState
    console.log('🚀 ~ handleAppStateChange ~ appState.current:', appState.current)
  }

  const recordStartTime = async () => {
    await AsyncStorage.setItem('startTime', Date.now().toString())
  }

  return (
    <>
      {isBackground && (
        <View style={styles.blankScreen}>
          <Text style={styles.hiddenText}>HIDDEN FOR SECURITY REASONS</Text>
        </View>
      )}
      {props.children}
    </>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  blankScreen: {
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hiddenText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
})

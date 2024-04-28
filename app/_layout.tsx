import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useFonts } from 'expo-font'
import { Stack, useRouter } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'

import Colors from '@/constants/Colors'
import NavigationButton from '@/modules/navigation/components/NavigationButton'
import { StatusBar } from 'expo-status-bar'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export function InitialLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  })
  const router = useRouter()
  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error
  }, [error])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="sign-up"
        options={{
          title: '',
          headerBackTitle: '',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.background },
          headerLeft: () => <NavigationButton iconName="arrow-back" onPress={router.back} />,
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          title: '',
          headerBackTitle: '',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.background },
          headerLeft: () => <NavigationButton iconName="arrow-back" onPress={router.back} />,
          headerRight: () => (
            <NavigationButton iconName="help-circle-outline" onPress={() => router.navigate('help')} />
          ),
        }}
      />
      <Stack.Screen name="help" options={{ title: 'Help', presentation: 'modal' }}></Stack.Screen>
    </Stack>
  )
}

export default function RootLayoutNav() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="light" />
      <InitialLayout />
    </GestureHandlerRootView>
  )
}

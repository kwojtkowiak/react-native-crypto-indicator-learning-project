import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useFonts } from 'expo-font'
import { Stack, useRouter, useSegments } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'

import Colors from '@/styles/colors'
import NavigationButton from '@/modules/navigation/components/NavigationButton'
import { tokenCache } from '@/utils/clerk'
import { ClerkProvider, useAuth } from '@clerk/clerk-expo'
import { StatusBar } from 'expo-status-bar'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import colors from '@/styles/colors'

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY

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
  const { isLoaded, isSignedIn } = useAuth()
  const segments = useSegments()

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error
  }, [error])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  useEffect(() => {
    if (!isLoaded) return

    const inAuthGroup = segments[0] == '(authenticated)'

    if (isSignedIn && !inAuthGroup) {
      router.replace('/(authenticated)/(tabs)/crypto')
    } else if (!isSignedIn) {
      router.replace('/')
    }
  }, [isSignedIn])

  if (!loaded || !isLoaded) {
    return <ActivityIndicator color={colors.primary} />
  }

  return (
    <Stack initialRouteName="index">
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
      <Stack.Screen
        name="verify/[phone]"
        options={{
          title: '',
          headerBackTitle: '',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.background },
          headerLeft: () => <NavigationButton iconName="arrow-back" onPress={router.back} />,
        }}
      />
      <Stack.Screen name="(authenticated)/(tabs)" options={{ headerShown: false }} />
    </Stack>
  )
}

export default function RootLayoutNav() {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY!} tokenCache={tokenCache}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar style="light" />
        <InitialLayout />
      </GestureHandlerRootView>
    </ClerkProvider>
  )
}

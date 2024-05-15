import { ClerkProvider, useAuth } from '@clerk/clerk-expo'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { QueryClientProvider } from '@tanstack/react-query'
import { useFonts } from 'expo-font'
import { Stack, useRouter, useSegments } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import NavigationButton from '@/modules/navigation/components/NavigationButton'
import colors from '@/styles/colors'
import { tokenCache } from '@/utils/clerk.utils'
import { queryClient } from '@/utils/queryClient.utils'

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export function InitialLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
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
          headerStyle: { backgroundColor: colors.background },
          headerLeft: () => <NavigationButton iconName="arrow-back" onPress={router.back} />,
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          title: '',
          headerBackTitle: '',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: colors.background },
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
          headerStyle: { backgroundColor: colors.background },
          headerLeft: () => <NavigationButton iconName="arrow-back" onPress={router.back} />,
        }}
      />
      <Stack.Screen name="(authenticated)/(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(authenticated)/crypto/[id]"
        options={{
          title: '',
          headerLeft: () => <NavigationButton iconName="arrow-back" onPress={router.back} />,
          headerRight: () => (
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <NavigationButton iconName="notifications-outline" onPress={() => router.navigate('help')} />
              <NavigationButton iconName="star-outline" onPress={() => router.navigate('help')} />
            </View>
          ),
          headerTransparent: true,
          headerTitleAlign: 'center',
        }}
      />
    </Stack>
  )
}

export default function RootLayoutNav() {
  return (
    <QueryClientProvider client={queryClient}>
      <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY!} tokenCache={tokenCache}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <StatusBar style="light" />
          <InitialLayout />
        </GestureHandlerRootView>
      </ClerkProvider>
    </QueryClientProvider>
  )
}

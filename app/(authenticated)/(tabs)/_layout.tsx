import { FontAwesome } from '@expo/vector-icons'
import { BlurView } from 'expo-blur'
import { Tabs } from 'expo-router'

import CustomHeader from '@/components/CustomHeader'
import colors from '@/styles/colors'

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarBackground: () => (
          <BlurView intensity={100} tint={'extraLight'} style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.05)' }} />
        ),
        tabBarStyle: {
          backgroundColor: 'transparent',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          borderTopWidth: 0,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ size, color }) => <FontAwesome name="registered" size={size} color={color} />,
          header: () => <CustomHeader />,
          headerTransparent: true,
        }}
      />
      <Tabs.Screen
        name="invest"
        options={{
          title: 'Invest',
          tabBarIcon: ({ size, color }) => <FontAwesome name="line-chart" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="indicators"
        options={{
          title: 'Indicators',
          tabBarIcon: ({ size, color }) => <FontAwesome name="exchange" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="crypto"
        options={{
          title: 'Crypto',
          tabBarIcon: ({ size, color }) => <FontAwesome name="bitcoin" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="insights"
        options={{
          title: 'Insights',
          tabBarIcon: ({ size, color }) => <FontAwesome name="list-alt" size={size} color={color} />,
        }}
      />
    </Tabs>
  )
}

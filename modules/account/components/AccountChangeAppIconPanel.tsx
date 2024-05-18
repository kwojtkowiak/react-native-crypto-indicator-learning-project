import { Ionicons } from '@expo/vector-icons'
import { getAppIcon, setAppIcon } from 'expo-dynamic-app-icon'
import { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const icons = [
  {
    name: 'Default',
    icon: require('@/assets/images/icon.png'),
  },
  {
    name: 'Dark',
    icon: require('@/assets/images/icon-dark.png'),
  },
  {
    name: 'Green',
    icon: require('@/assets/images/icon-green.png'),
  },
]

export function AccountChangeAppIconPanel() {
  const [activeIcon, setActiveIcon] = useState('Default')

  useEffect(() => {
    const loadCurrentIconPref = async () => {
      const icon = await getAppIcon()
      setActiveIcon(icon)
    }
    loadCurrentIconPref()
  })

  function onChangeAppIcon(icon: string) {
    setAppIcon(icon.toLowerCase())
    setActiveIcon(icon)
  }

  return (
    <View style={styles.actions}>
      {icons.map((icon) => (
        <TouchableOpacity key={icon.name} style={styles.btn} onPress={() => onChangeAppIcon(icon.name)}>
          <Image source={icon.icon} style={{ width: 24, height: 24 }} />
          <Text style={{ fontSize: 18, color: '#fff' }}>{icon.name}</Text>
          {activeIcon.toLowerCase() == icon.name.toLowerCase() && <Ionicons name="checkmark" size={24} color="#fff" />}
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  actions: {
    backgroundColor: 'rgba(256, 256, 256, 0.1)',
    borderRadius: 16,
    gap: 0,
    margin: 20,
  },
  btn: {
    padding: 14,
    flexDirection: 'row',
    gap: 20,
  },
})

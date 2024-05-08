import { BlurView } from 'expo-blur'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import colors from '@/styles/colors'
import { defaultStyles } from '@/styles/styles'
import { Ionicons } from '@expo/vector-icons'

export default function CustomHeader() {
  const { top } = useSafeAreaInsets()

  return (
    <BlurView intensity={80} tint={'extraLight'} style={{ paddingTop: top }}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.roundBtn}>
          <Text style={{ color: '#fff', fontWeight: '500', fontSize: 16 }}>SG</Text>
        </TouchableOpacity>
        <View style={styles.searchSection}>
          <Ionicons style={styles.searchIcon} name="search" size={24} color={colors.dark} />
          <TextInput style={styles.input} placeholder="Search" placeholderTextColor={colors.dark} />
        </View>
        <View style={defaultStyles.circle}>
          <Ionicons name="stats-chart" size={20} color={colors.dark}></Ionicons>
        </View>
        <View style={defaultStyles.circle}>
          <Ionicons name="card" size={20} color={colors.dark}></Ionicons>
        </View>
      </View>
    </BlurView>
  )
}
export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    height: 60,
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
  },
  roundBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.gray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.lightGray,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchIcon: {
    padding: 10,
  },
  input: { flex: 1, paddingTop: 10, paddingRight: 10, paddingBottom: 10, paddingLeft: 0, color: colors.dark },
})

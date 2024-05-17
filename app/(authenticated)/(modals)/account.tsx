import { useUser } from '@clerk/clerk-expo'
import { BlurView } from 'expo-blur'
import { StyleSheet } from 'react-native'

import { AccountActionButtonsPanel } from '@/modules/account/components/AccountActionButtonsPanel'
import { AccountChangeAppIconPanel } from '@/modules/account/components/AccountChangeAppIconPanel'
import { AccountEditForm } from '@/modules/account/components/AccountEditForm'

export default function Page() {
  const { user } = useUser()

  return (
    <BlurView intensity={80} tint={'dark'} style={styles.blurView}>
      <AccountEditForm user={user} />
      <AccountActionButtonsPanel />
      <AccountChangeAppIconPanel />
    </BlurView>
  )
}

const styles = StyleSheet.create({
  blurView: { flex: 1, paddingTop: 100, backgroundColor: 'rgba(0,0,0,0.5)' },
})

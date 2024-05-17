import colors from '@/styles/colors'
import { useAuth, useUser } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons'
import { BlurView } from 'expo-blur'
import { useState } from 'react'
import { View, Text, StyleSheet, Image, TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function Page() {
  const { user } = useUser()
  const { signOut } = useAuth()
  const [firstName, setFirstName] = useState(user?.firstName)
  const [lastName, setLastName] = useState(user?.lastName)
  const [edit, setEdit] = useState(false)

  const onSaveUser = async () => {
    try {
      await user?.update({ firstName: firstName!, lastName: lastName! })
    } catch (error) {
      console.error(error)
    } finally {
      setEdit(false)
    }
  }
  const onCaptureImage = async () => {}

  return (
    <BlurView intensity={80} tint={'dark'} style={{ flex: 1, padding: 100, backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <View style={{ alignItems: 'center' }}>
        <TouchableOpacity onPress={onCaptureImage} style={styles.captureBtn}>
          {user?.imageUrl && <Image />}
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', gap: 6 }}>
          {edit ? (
            <View style={styles.editRow}>
              <TextInput
                placeholder="First Name"
                value={firstName || ''}
                onChangeText={setFirstName}
                style={[styles.inputField]}
              />
              <TextInput
                placeholder="Last Name"
                value={lastName || ''}
                onChangeText={setLastName}
                style={[styles.inputField]}
              />
              <TouchableOpacity onPress={onSaveUser}>
                <Ionicons name="checkmark-outline" size={24} color={'#fff'} />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.editRow}>
              <Text style={{ fontSize: 26, color: '#fff' }}>
                {firstName} {lastName}
              </Text>
              <TouchableOpacity onPress={() => setEdit(true)}>
                <Ionicons name="ellipsis-horizontal" size={24} color={'#fff'} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </BlurView>
  )
}

const styles = StyleSheet.create({
  editRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  captureBtn: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.gray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputField: {
    width: 140,
    height: 44,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
  },
})

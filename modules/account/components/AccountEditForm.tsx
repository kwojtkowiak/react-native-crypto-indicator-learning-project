import { TextInput, View, Text, StyleSheet, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'
import { UserResource } from '@clerk/types'
import { useAuth } from '@clerk/clerk-expo'
import { useState } from 'react'
import * as ImagePicker from 'expo-image-picker'

import colors from '@/styles/colors'

export function AccountEditForm(props: { user: UserResource | null | undefined }) {
  const { signOut } = useAuth()
  const [firstName, setFirstName] = useState(props.user?.firstName)
  const [lastName, setLastName] = useState(props.user?.lastName)
  const [edit, setEdit] = useState(false)

  const onSaveUser = async () => {
    try {
      await props.user?.update({ firstName: firstName!, lastName: lastName! })
    } catch (error) {
      console.error(error)
    } finally {
      setEdit(false)
    }
  }
  const onCaptureImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.75,
      base64: true,
    })

    if (!result.canceled) {
      const base64 = `data:image/png;base64,${result.assets[0].base64}`
      props.user?.setProfileImage({
        file: base64,
      })
    }
  }

  return (
    <View style={{ alignItems: 'center' }}>
      <TouchableOpacity onPress={onCaptureImage} style={styles.captureBtn}>
        {props.user?.imageUrl ? (
          <Image source={{ uri: props.user?.imageUrl }} style={styles.avatar} />
        ) : (
          <Ionicons name="camera-outline" size={36} color={'#fff'}></Ionicons>
        )}
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
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.gray,
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

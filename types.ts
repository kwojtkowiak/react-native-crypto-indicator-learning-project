import { Ionicons } from '@expo/vector-icons'

export enum SignInType {
  Phone,
  Email,
  Google,
  Apple,
}
export type IconName = keyof typeof Ionicons.glyphMap

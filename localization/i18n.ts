import * as Localization from 'expo-localization'
import i18n from 'i18next'
import AsyncStoragePlugin from 'i18next-react-native-async-storage'
import { initReactI18next } from 'react-i18next'

import { en, fr, pl } from './translations'

const resources = {
  en: {
    translation: en,
  },
  fr: {
    translation: fr,
  },
  pl: {
    translation: pl,
  },
}

i18n
  .use(initReactI18next)
  .use(AsyncStoragePlugin())
  .init({
    resources,
    compatibilityJSON: 'v3',
    fallbackLng: Localization.getLocales()[0].languageCode!,
    interpolation: {
      escapeValue: false,
    },
  })
export default i18n

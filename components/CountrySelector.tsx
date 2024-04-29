import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet } from 'react-native'
import { SelectCountry } from 'react-native-element-dropdown'

import i18n from '@/localization/i18n'
import colors from '@/styles/colors'

const FLAG_CDN_URL = 'https://flagcdn.com/w80/'
const FORMAT = '.png'
const countriesList = [
  { abb: 'pl', label: 'Polish' },
  { abb: 'fr', label: 'French' },
  { abb: 'en', label: 'English', flag: 'gb' },
]
const countryArr = countriesList.map(({ abb, label, flag }) => {
  return {
    abb,
    countryName: label,
    flag: { uri: FLAG_CDN_URL + (flag ?? abb).toLocaleLowerCase() + FORMAT },
  }
})

export default function CountrySelector() {
  const { t } = useTranslation()

  const [country, setCountry] = useState(i18n.language)
  const [countryBorderColor, setCountryBorderColor] = useState('#000')

  return (
    <SelectCountry
      style={{
        ...dropdownStyles.dropdown,
        borderColor: countryBorderColor,
        borderWidth: countryBorderColor === colors.primary ? 2 : 0,
      }}
      selectedTextStyle={[dropdownStyles.selectedTextStyle]}
      placeholderStyle={dropdownStyles.placeholderStyle}
      imageStyle={dropdownStyles.imageStyle}
      inputSearchStyle={[dropdownStyles.inputSearchStyle]}
      iconStyle={dropdownStyles.iconStyle}
      activeColor={colors.primary}
      maxHeight={200}
      value={country}
      data={countryArr}
      valueField="abb"
      labelField="countryName"
      imageField="flag"
      placeholder={t('general.selectLanguage')}
      dropdownPosition="top"
      itemContainerStyle={{ backgroundColor: colors.lightGray }}
      onChange={(e) => {
        setCountry(e.abb)
        i18n.changeLanguage(e.abb)
      }}
      onFocus={() => setCountryBorderColor(colors.primary)}
      onBlur={() => setCountryBorderColor('#000')}
    />
  )
}
export const dropdownStyles = StyleSheet.create({
  dropdown: {
    margin: 16,
    marginLeft: 0,
    marginRight: 0,
    height: 50,
    minWidth: 190,
    backgroundColor: colors.lightGray,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  imageStyle: {
    width: 24,
    height: 24,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 22,
    marginLeft: 8,
    fontWeight: '500',
    color: colors.gray,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    borderRadius: 8,
  },
})

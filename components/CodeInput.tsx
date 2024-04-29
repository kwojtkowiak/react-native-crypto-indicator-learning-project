import colors from '@/styles/colors'
import { Fragment } from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field'

export default function CodeInput(props: { value: string; setter: React.Dispatch<React.SetStateAction<string>> }) {
  const CELL_COUNT = 6

  const ref = useBlurOnFulfill({ value: props.value, cellCount: CELL_COUNT })
  const [hookProps, getCellOnLayoutHandler] = useClearByFocusCell({
    value: props.value,
    setValue: props.setter,
  })

  return (
    <CodeField
      ref={ref}
      {...props}
      value={props.value}
      onChangeText={props.setter}
      cellCount={CELL_COUNT}
      rootStyle={styles.codeFieldRoot}
      keyboardType="number-pad"
      textContentType="oneTimeCode"
      // from unknown reasons I had to directly point to type
      autoComplete={Platform.select({ android: 'sms-otp' as 'sms-otp', default: 'one-time-code' as 'one-time-code' })}
      testID="my-code-input"
      renderCell={({ index, symbol, isFocused }) => (
        <Fragment key={index}>
          <View
            // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
            onLayout={getCellOnLayoutHandler(index)}
            key={index}
            style={[styles.cellRoot, isFocused && styles.focusCell]}
          >
            <Text style={styles.cellText}>{symbol || (isFocused ? <Cursor /> : null)}</Text>
          </View>
          {index === 2 ? <View key={`separator-${index}`} style={styles.separator} /> : null}
        </Fragment>
      )}
    />
  )
}

const styles = StyleSheet.create({
  codeFieldRoot: { marginVertical: 20, marginLeft: 'auto', marginRight: 'auto', gap: 12 },
  cellRoot: {
    width: 45,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
    borderRadius: 8,
  },
  focusCell: {
    paddingBottom: 8,
  },
  cellText: {
    color: '#000',
    fontSize: 36,
    textAlign: 'center',
  },
  separator: { height: 2, width: 10, backgroundColor: colors.gray, alignSelf: 'center' },
})

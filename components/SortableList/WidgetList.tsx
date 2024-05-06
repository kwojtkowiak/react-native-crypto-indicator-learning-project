import React from 'react'
import { View, Text } from 'react-native'

import { MARGIN } from './Config'
import SortableList from './SortableList'
import Tile from './Tile'
import { defaultStyles } from '@/styles/styles'

const tiles = [
  {
    id: 'spent',
  },

  {
    id: 'farming',
  },
  {
    id: 'recent',
  },
  {
    id: 'cards',
  },
]

export default function WidgetList() {
  return (
    <>
      <Text style={defaultStyles.sectionHeader}>Widgets</Text>
      <View style={{ paddingHorizontal: MARGIN, marginBottom: 8 }}>
        <SortableList editing={true} onDragEnd={(positions) => console.log(JSON.stringify(positions, null, 2))}>
          {tiles.map((tile, index) => (
            <Tile onLongPress={() => true} key={tile.id + '-' + index} id={tile.id}></Tile>
          ))}
        </SortableList>
      </View>
    </>
  )
}

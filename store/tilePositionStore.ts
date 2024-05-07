// import { TilePositionsState } from '@/types'
// import AsyncStorage from '@react-native-async-storage/async-storage'
// import { create } from 'zustand'
// import { createJSONStorage, persist } from 'zustand/middleware'

// export interface TilePosition {
//   x: number
//   y: number
// }

// export interface TilePositionsState {
//   positions: Record<string, TilePosition>
//   setPositions: (positions: Record<string, TilePosition>) => void
// }

// export const useTilePositionStore = create<TilePositionsState>()(
//   persist(
//     (set) => ({
//       positions: { x:0 , y: 0 },
//       setPositions: (positions) => {
//         set({ positions })
//       },
//     }),
//     {
//       name: 'tilePositions',
//       getStorage: () => AsyncStorage,
//     }
//   )
// )

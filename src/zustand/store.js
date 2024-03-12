import { create } from 'zustand'
import { persist } from 'zustand/middleware'
const useUpdateBoard = create(set => ({
  board: null,
  setBoard: (newBoard) => set({ board: newBoard })
}))

const useUpdateColumn = create(set => ({
  column: {},
  setColumn: (newColumn) => set({ column: newColumn })
}))

const useUser = create(
  persist(set => ({
    user: null,
    setUser: (newUser) => set({ user: newUser })
  }),
    {
      name: 'user-storage', // name of the item in the storage (must be unique)
      getStorage: () => localStorage // (optional) by default the 'localStorage' is used
    }
  )

)
export { useUpdateBoard, useUpdateColumn, useUser }

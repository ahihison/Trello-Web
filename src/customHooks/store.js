import { create } from 'zustand'

const useUpdateBoard = create(set => ({
  board: {},
  setBoard: (newBoard) => set({ board: newBoard })
}))

const useUpdateColumn = create(set => ({
  column: {},
  setColumn: (newColumn) => set({ column: newColumn })
}))
export { useUpdateBoard, useUpdateColumn }
import Container from '@mui/material/Container'
import { useEffect, useState } from 'react'
import { fetchBoardDetailAPI } from '~/apis'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { mockData } from '~/apis/mock-data'
import { useUpdateBoard } from '~/customHooks/store'
function Board() {
  const setBoard = useUpdateBoard((state) => state.setBoard) // Get the setBoard function from the state
  const board = useUpdateBoard((state) => state.board) // Get the board from the state
  useEffect(() => {
    const fetchBoardDetail = async () => {
      const boardId = '65d6bb4811db20c610affca6'
      const board = await fetchBoardDetailAPI(boardId)
      setBoard(board)

    }
    fetchBoardDetail()
  }, [setBoard])

  console.log('re-render', board)
  return (
    <>
      <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
        <AppBar/>
        <BoardBar board ={board}/>
        <BoardContent board = {board}/>
      </Container>
    </>
  )
}

export default Board

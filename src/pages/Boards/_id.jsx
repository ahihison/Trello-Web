import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { mockData } from '~/apis/mock-data'
import { fetchBoardDetailAPI } from '~/apis'
import { useEffect, useState } from 'react'
function Board() {
  const [board, setBoard] = useState(null)
  useEffect(() => {
    const fetchBoardDetail = async () => {
      const boardId = '65d5b7d9cf379313558f59ad'
      const board = await fetchBoardDetailAPI(boardId)
      setBoard(board)
    }
    fetchBoardDetail()
  }, [])
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

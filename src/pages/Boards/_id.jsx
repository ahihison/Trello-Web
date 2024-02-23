import Container from '@mui/material/Container'
import { useEffect, useState } from 'react'
import { fetchBoardDetailAPI } from '~/apis'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { mockData } from '~/apis/mock-data'
function Board() {
  // const [board, setBoard] = useState(null)
  // useEffect(() => {
  //   const fetchBoardDetail = async () => {
  //     const boardId = '65d6bb4811db20c610affca6'
  //     const board = await fetchBoardDetailAPI(boardId)
  //     setBoard(board)
  //   }
  //   fetchBoardDetail()
  // }, [])
  return (
    <>
      <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
        <AppBar/>
        <BoardBar board ={mockData.board}/>
        <BoardContent board = {mockData.board}/>
      </Container>
    </>
  )
}

export default Board

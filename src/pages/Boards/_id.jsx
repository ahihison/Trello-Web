import Container from '@mui/material/Container'
import { isEmpty } from 'lodash'
import { useEffect } from 'react'
import { fetchBoardDetailAPI } from '~/apis'
import AppBar from '~/components/AppBar/AppBar'
import { useUpdateBoard, useUpdateColumn } from '~/customHooks/store'
import { generatePlaceholderCard } from '~/utils/formatters'
import { mapOrder } from '~/utils/sort'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { Box, CircularProgress, Typography } from '@mui/material'
function Board() {
  const setBoard = useUpdateBoard((state) => state.setBoard) // Get the setBoard function from the state
  const board = useUpdateBoard((state) => state.board) // Get the board from the state
  const column = useUpdateColumn((state) => state.column) // Get the column from the state
  useEffect(() => {
    const fetchBoardDetail = async () => {
      const boardId = '65d6bb4811db20c610affca6'
      const board = await fetchBoardDetailAPI(boardId)
      //sort column before set to state
      board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')
      board.columns.forEach(column => {
        // column not empty
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)]
          column.cardOrderIds = [generatePlaceholderCard(column)._id]
        } else {
          // sort card before set to state
          column.cards = mapOrder(column.cards, column.cardOrderIds, '_id')
        }
      })
      setBoard(board)

    }
    fetchBoardDetail()

  }, [setBoard, column])
  if (!board) {
    return (
      <Box sx={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', gap:2, color:'black' }}>
        <CircularProgress />
        <Typography>Loading Board...</Typography>
      </Box>
    )
  }

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

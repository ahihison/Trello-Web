import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sort'
function BoardContent({ board }) {
  const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')

  return (
    <Box sx={{ backgroundColor: 'primary.main',
      bgcolor:(theme) => (theme.palette.mode === 'dark' ?'#172b4d':'#1976d2'),
      width: '100%', display: 'flex',

      height:(theme) => theme.trello.boardContentHeight,
      p:'10px 0'

    }}

    >
      <ListColumns columns={orderedColumns}/>

    </Box>

  )
}

export default BoardContent

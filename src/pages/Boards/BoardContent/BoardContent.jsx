import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
function BoardContent() {


  return (
    <Box sx={{ backgroundColor: 'primary.main',
      bgcolor:(theme) => (theme.palette.mode === 'dark' ?'#172b4d':'#1976d2'),
      width: '100%', display: 'flex',

      height:(theme) => theme.trello.boardContentHeight,
      p:'10px 0'

    }}

    >
      <ListColumns/>

    </Box>

  )
}

export default BoardContent

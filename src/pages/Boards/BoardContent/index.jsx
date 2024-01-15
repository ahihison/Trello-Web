import Box from '@mui/material/Box'

function BoardContent() {
  return (
    <Box sx={{ backgroundColor: 'primary.main',
      bgcolor:(theme) => (theme.palette.mode === 'dark' ?'#172b4d':'#1976d2'),
      width: '100%', display: 'flex',
      alignItems: 'center',
      height:(theme) => `calc(100vh - ${theme.trello.boardBarHeight} -  ${theme.trello.appBarHeight})` }}>
          Box content
    </Box>

  )
}

export default BoardContent

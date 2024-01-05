import Box from '@mui/material/Box'

function BoardContent() {
  return (
    <Box sx={{ backgroundColor: 'primary.main',
      width: '100%', display: 'flex',
      alignItems: 'center',
      height:(theme) => `calc(100vh - ${theme.trello.boardBarHeight} -  ${theme.trello.appBarHeight})` }}>
          Box content
    </Box>

  )
}

export default BoardContent

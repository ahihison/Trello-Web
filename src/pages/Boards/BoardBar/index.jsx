import Box from '@mui/material/Box'

function BoardBar() {
  return (
    <div>  <Box sx={{
      width: '100%',
      backgroundColor: 'primary.dark',
      height: (theme) => theme.trello.appBarHeight,
      display: 'flex',
      alignItems: 'center'
    }}>Board Bar</Box></div>
  )
}

export default BoardBar

import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import AppBar from '../../components/AppBar'
import BoardContent from './BoardContent'
import BoardBar from './BoardBar'

function Board() {
  return (
    <>
      <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>

        <AppBar/>
        <BoardBar/>
        <BoardContent/>
      </Container>
    </>
  )
}

export default Board
import { Button, useColorScheme, useMediaQuery } from '@mui/material'

import ModeSelect from './components/ModeSelect'
function App() {

  function ModeToggle() {
    const { mode, setMode } = useColorScheme()


    return (
      <Button
        onClick={() => {
          setMode(mode === 'light' ? 'dark' : 'light')
        }}
      >
        {mode === 'light' ? 'Turn dark' : 'Turn light'}
      </Button>
    )
  }
  return (
    <>
      <div>Hello world</div>
      <Button variant="contained">Hello</Button>
      <ModeToggle />
      <hr />
      <ModeSelect />
    </>
  )
}

export default App

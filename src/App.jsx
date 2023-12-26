import { Button, useColorScheme } from '@mui/material'


function App() {
  function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  return (
    <Button
      onClick={() => {
        setMode(mode === 'light' ? 'dark' : 'light');
      }}
    >
      {mode === 'light' ? 'Turn dark' : 'Turn light'}
    </Button>
  );
}
  return (
    <>
    <div>Hello world</div>
      <Button variant="contained">Hello</Button>
      <ModeToggle />
    </>
  )
}

export default App

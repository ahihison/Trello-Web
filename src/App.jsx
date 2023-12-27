import { Button, useColorScheme, useMediaQuery } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Box from '@mui/material/Box'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'
function App() {
  function ModeSelect() {

    const { mode, setMode } = useColorScheme()
    const handleChange = (event) => {
      setMode(event.target.value)
    }

    return (
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="label-select-dark-light-mode">Mode</InputLabel>
        <Select
          labelId="label-select-dark-light-mode"
          id="select-dark-light-mode"
          value={mode}
          label="Mode"
          onChange={handleChange}
        >

          <MenuItem value='light'>
            <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
              <LightModeIcon fontSize='small' /> Light
            </div>
          </MenuItem>
          <MenuItem value='dark'>
            <Box sx={{ display:'flex', alignItems:'center', gap:1 }}>
              <DarkModeOutlinedIcon fontSize='small'/> Dark
            </Box>
          </MenuItem>
          <MenuItem value='system'>
            <Box sx={{ display:'flex', alignItems:'center', gap:2 }}>
              <SettingsBrightnessIcon fontSize='small' /> System
            </Box>
          </MenuItem>
        </Select>
      </FormControl>
    )
  }
  function ModeToggle() {
    const { mode, setMode } = useColorScheme()
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')


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

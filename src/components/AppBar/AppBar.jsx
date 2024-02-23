
import { useState } from 'react'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos'
import AppsIcon from '@mui/icons-material/Apps'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import SearchIcon from '@mui/icons-material/Search'
import InputAdornment from '@mui/material/InputAdornment'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import SvgIcon from '@mui/material/SvgIcon'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { ReactComponent as TrelloIcon } from '~/assets/trello.svg'
import ModeSelect from '~/components/ModeSelect/ModeSelect'
import More from './Menus/More'
import Profile from './Menus/Profile'
import Recent from './Menus/Recent'
import Starred from './Menus/Starred'
import WorkSpaces from './Menus/WorkSpaces'
import CloseIcon from '@mui/icons-material/Close'
function AppBar() {
  const [search, setSearch] = useState('')
  const handleChangeInput = (e) => {
    setSearch(e.target.value)
  }
  const clearTextSearch = () => {
    setSearch('')
  }
  return (
    <Box px={2} sx={{
      width: '100%',
      height: (theme) => theme.trello.appBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap:2,
      overflowX:'auto',
      bgcolor:(theme) => (theme.palette.mode === 'dark' ?'#1e2333':'#1565d0'),
      '&::-webkit-scrollbar-track': { m:2 }
    }} >
      <Box sx={{ display:'flex', alignItems:'center', gap:2 }}>
        <AppsIcon sx={{ color:'white' }}/>
        <Box sx={{ display:'flex', alignItems:'center', gap:0.5 }}>

          <SvgIcon component={TrelloIcon} inheritViewBox fontSize="small" sx={{ color:'white' }} />
          <Typography variant='span' sx={{ fontSize:'1.2rem', fontWeight:'bold', color:'white' }}>Trello</Typography>
        </Box>
        <Box sx={{ display:{ xs:'none', md:'flex' }, gap:1 }}>
          <WorkSpaces/>
          <Recent/>
          <Starred/>
          <More/>
          <Button sx={{ color:'white' }} startIcon ={<AddToPhotosIcon/>}>Create</Button>
        </Box>

      </Box>
      <Box sx={{ display:'flex', alignItems:'center', gap:2 }}>
        <TextField

          id="outlined-search"
          label="Search..."
          type="text"
          size="small"
          value={search}
          onChange={handleChangeInput}

          InputProps={{
            startAdornment:(
              <InputAdornment position="start">
                <SearchIcon sx={{ color:'white' }}/>
              </InputAdornment>
            ),
            endAdornment:(
              <InputAdornment position="end">
                <CloseIcon fontSize='small' sx={{ color:'white', cursor:'pointer' }} onClick={clearTextSearch}/>
              </InputAdornment>
            )
          }}
          sx={{ minWidth:'120px', maxWidth:'180px',
            '& label':{ color:'white' },
            '& input':{ color:'white' },
            '& label.Mui-focused':{ color:'white' },
            '& .MuiOutlinedInput-root':{
              '& fieldset':{
                borderColor:'white'

              },
              '&:hover fieldset':{
                borderColor:'white'

              },
              '&.Mui-focused fieldset':{
                borderColor:'white'
              }

            }


          }}/>
        <ModeSelect />

        <Tooltip title="Notification">
          <Badge color="warning" variant="dot" sx={{ cursor:'pointer' }}>
            <NotificationsNoneIcon sx={{ color:'white' }} />
          </Badge>

        </Tooltip>
        <Tooltip title="Information">

          <HelpOutlineIcon sx={{ cursor:'pointer', color:'white' }}/>


        </Tooltip>
        <Profile/>
      </Box>
    </Box>
  )
}

export default AppBar

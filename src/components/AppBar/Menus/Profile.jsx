
import { Logout, PersonAdd, Settings } from '@mui/icons-material'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'
import * as React from 'react'
function Profile() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box>

      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ padding:0 }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar sx={{ width: 32, height: 32 }} src="https://scontent.fsgn5-12.fna.fbcdn.net/v/t1.6435-9/126070927_1086903931762763_7456376576950448604_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=be3454&_nc_eui2=AeE5xv4UP1hiGMjpSGuP9w8gSL9Tap6LKhxIv1NqnosqHCNMLf2bEknhOSrOj635pDOCy3zvvEgAKVKiVHs5hnmY&_nc_ohc=lhV71wojYdgAX8go7mP&_nc_ht=scontent.fsgn5-12.fna&oh=00_AfANpVAMQFuJbh85jS627KS_MmmxGp31gApkmlkztMT80g&oe=65C780DB" alt="Sonnguyenavatar"/>
        </IconButton>
      </Tooltip>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        <MenuItem>
          <Avatar sx={{ width:'28px', height:'28px', mr:2 }} /> Profile
        </MenuItem>
        <MenuItem>
          <Avatar sx={{ width:'28px', height:'28px', mr:2 }}/> My account
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default Profile

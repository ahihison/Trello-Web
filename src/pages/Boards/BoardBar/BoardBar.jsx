import Box from '@mui/material/Box'
import DashboardIcon from '@mui/icons-material/Dashboard'
import Chip from '@mui/material/Chip'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { capitalizeFirstLetter } from '~/utils/formatters'
const MENU_STYLES = {
  color:'white',
  bgcolor:'transparent',
  border:'none',
  paddingX:'5px',
  borderRadius:'4px',
  '& .MuiChip-icon': { color:'white' },
  '&:hover':{ bgcolor:'primary.50' }
}
function BoardBar( { board } ) {

  return (
    <div>  <Box sx={{
      width: '100%',
      height: (theme) => theme.trello.appBarHeight,
      display: 'flex',
      alignItems: 'center',
      paddingX:2,
      justifyContent: 'space-between',
      gap:2,
      overflowX:'auto',
      borderBottom: '1px solid white',
      bgcolor:(theme) => (theme.palette.mode === 'dark' ?'#172b4d':'#1976d2'),
      '&::-webkit-scrollbar-track': { m:2 }
    }}>
      <Box sx={{ display:'flex', alignItems:'center', gap:2 }}>
        <Tooltip title={board?.description}>
          <Chip
            label={board?.title}
            icon={<DashboardIcon/>}
            onClick={() => {}}
            sx={MENU_STYLES} />
        </Tooltip>

        <Chip
          label={capitalizeFirstLetter(board?.type)}
          icon={<VpnLockIcon/>}
          onClick={() => {}}
          sx={MENU_STYLES} />
        <Chip
          label="Add to Google Drive"
          icon={<AddToDriveIcon/>}
          onClick={() => {}}
          sx={MENU_STYLES} />
        <Chip
          label="Automation"
          icon={<BoltIcon/>}
          onClick={() => {}}
          sx={MENU_STYLES} />
        <Chip
          label="Filters"
          icon={<FilterListIcon/>}
          onClick={() => {}}
          sx={MENU_STYLES} />
      </Box>
      <Box sx={{ display:'flex', alignItems:'center', gap:2 }}>
        <Button
          sx={{ color:'white',
            borderColor:'white',
            '&:hover':{ borderColor:'white' } }}
          variant="outlined"
          startIcon={<PersonAddIcon/>}>Invite</Button>
        <AvatarGroup max={7}
          sx={{ '& .MuiAvatar-root':{
            width: 34,
            height: 34,
            fontSize:16,
            border:'none',
            color:'white',
            cursor:'pointer',
            '&:first-child':{ bgcolor:'#a4b0be' }

          } }}
        >
          <Tooltip title="SownDev">
            <Avatar alt="Sown Dev" src="https://scontent.fsgn5-12.fna.fbcdn.net/v/t1.6435-9/126070927_1086903931762763_7456376576950448604_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=be3454&_nc_eui2=AeE5xv4UP1hiGMjpSGuP9w8gSL9Tap6LKhxIv1NqnosqHCNMLf2bEknhOSrOj635pDOCy3zvvEgAKVKiVHs5hnmY&_nc_ohc=lhV71wojYdgAX8go7mP&_nc_ht=scontent.fsgn5-12.fna&oh=00_AfANpVAMQFuJbh85jS627KS_MmmxGp31gApkmlkztMT80g&oe=65C780DB" />
          </Tooltip>
          <Tooltip title="SownDev">
            <Avatar alt="Sown Dev" src="https://1.bp.blogspot.com/-5T3LHfmZg40/UkP8zXDOXXI/AAAAAAAAAhc/8rAFPtXx7-U/s1600/anh-dep-hinh-nen-thien-nhien-4.jpg" />
          </Tooltip>
          <Tooltip title="SownDev">
            <Avatar alt="Sown Dev" src="https://th.bing.com/th/id/R.77d8658879913c158737b9a1b512db75?rik=FIqGVLpzM9ekFw&riu=http%3a%2f%2f1.bp.blogspot.com%2f-GnA1n_zrJxg%2fUhdvtyZXRaI%2fAAAAAAAAEOw%2f98MVqEeg1tw%2fs1600%2fhinh-nen-dep-nhat%2b(15).jpg&ehk=CxTsz%2fIl%2bZCcIS5cQJBszLsl5D1Z9OT09iQLiHfR2Qs%3d&risl=&pid=ImgRaw&r=0" />
          </Tooltip>
          <Tooltip title="SownDev">
            <Avatar alt="Sown Dev" src="https://img3.thuthuatphanmem.vn/uploads/2019/06/13/anh-nen-anime-cho-may-tinh-dep_095239016.jpg" />
          </Tooltip>
          <Tooltip title="SownDev">
            <Avatar alt="Sown Dev" src="https://th.bing.com/th/id/OIP.6bd7nhhOmQJ_CQXhmE506wHaJq?rs=1&pid=ImgDetMain" />
          </Tooltip>
          <Tooltip title="SownDev">
            <Avatar alt="Sown Dev" src="https://1.bp.blogspot.com/-5T3LHfmZg40/UkP8zXDOXXI/AAAAAAAAAhc/8rAFPtXx7-U/s1600/anh-dep-hinh-nen-thien-nhien-4.jpg" />
          </Tooltip>
          <Tooltip title="SownDev">
            <Avatar alt="Sown Dev" src="https://scontent.fsgn5-12.fna.fbcdn.net/v/t1.6435-9/126070927_1086903931762763_7456376576950448604_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=be3454&_nc_eui2=AeE5xv4UP1hiGMjpSGuP9w8gSL9Tap6LKhxIv1NqnosqHCNMLf2bEknhOSrOj635pDOCy3zvvEgAKVKiVHs5hnmY&_nc_ohc=lhV71wojYdgAX8go7mP&_nc_ht=scontent.fsgn5-12.fna&oh=00_AfANpVAMQFuJbh85jS627KS_MmmxGp31gApkmlkztMT80g&oe=65C780DB" />
          </Tooltip>
          <Tooltip title="SownDev">
            <Avatar alt="Sown Dev" src="https://1.bp.blogspot.com/-5T3LHfmZg40/UkP8zXDOXXI/AAAAAAAAAhc/8rAFPtXx7-U/s1600/anh-dep-hinh-nen-thien-nhien-4.jpg" />
          </Tooltip>
          <Tooltip title="SownDev">
            <Avatar alt="Sown Dev" src="https://th.bing.com/th/id/R.77d8658879913c158737b9a1b512db75?rik=FIqGVLpzM9ekFw&riu=http%3a%2f%2f1.bp.blogspot.com%2f-GnA1n_zrJxg%2fUhdvtyZXRaI%2fAAAAAAAAEOw%2f98MVqEeg1tw%2fs1600%2fhinh-nen-dep-nhat%2b(15).jpg&ehk=CxTsz%2fIl%2bZCcIS5cQJBszLsl5D1Z9OT09iQLiHfR2Qs%3d&risl=&pid=ImgRaw&r=0" />
          </Tooltip>
          <Tooltip title="SownDev">
            <Avatar alt="Sown Dev" src="https://img3.thuthuatphanmem.vn/uploads/2019/06/13/anh-nen-anime-cho-may-tinh-dep_095239016.jpg" />
          </Tooltip>
          <Tooltip title="SownDev">
            <Avatar alt="Sown Dev" src="https://th.bing.com/th/id/OIP.6bd7nhhOmQJ_CQXhmE506wHaJq?rs=1&pid=ImgDetMain" />
          </Tooltip>
          <Tooltip title="SownDev">
            <Avatar alt="Sown Dev" src="https://1.bp.blogspot.com/-5T3LHfmZg40/UkP8zXDOXXI/AAAAAAAAAhc/8rAFPtXx7-U/s1600/anh-dep-hinh-nen-thien-nhien-4.jpg" />
          </Tooltip>
        </AvatarGroup>
      </Box>

    </Box></div>
  )
}

export default BoardBar

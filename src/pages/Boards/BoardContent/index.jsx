import AddCardIcon from '@mui/icons-material/AddCard'
import AttachmentIcon from '@mui/icons-material/Attachment'
import Cloud from '@mui/icons-material/Cloud'
import CommentIcon from '@mui/icons-material/Comment'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import ContentCut from '@mui/icons-material/ContentCut'
import ContentPasteIcon from '@mui/icons-material/ContentPaste'
import Delete from '@mui/icons-material/Delete'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import GroupsIcon from '@mui/icons-material/Groups'
import { CardMedia } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import * as React from 'react'
const COLUMN_HEADER_HEIGHT ='50px'
const COLUMN_FOOTER_HEIGHT ='56px'
function BoardContent() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box sx={{ backgroundColor: 'primary.main',
      bgcolor:(theme) => (theme.palette.mode === 'dark' ?'#172b4d':'#1976d2'),
      width: '100%', display: 'flex',

      height:(theme) => theme.trello.boardContentHeight,
      p:'10px 0'

    }}

    >
      {/* Box column */}
      <Box sx={{
        bgcolor:'inherit',
        width:'100%',
        height:'100%',
        display:'flex',
        overflowX:'auto',
        overflowY:'hidden',
        '&::-webkit-scrollbar-track': { m:2 }
      }}>
        <Box sx={{
          minWidth:'300px',
          maxWidth:'300px',
          bgcolor:(theme) => (theme.palette.mode === 'dark' ?'#333643':'#ebecf0'),
          ml:2,
          borderRadius:'6px',
          height:'fit-content',
          maxHeight:(theme) => `(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`


        }}>
          <Box sx={{
            height:COLUMN_HEADER_HEIGHT,
            display:'flex',
            alignItems:'center',
            justifyContent:'space-between',
            p:2

          }}>
            <Typography variant='h6' sx={{
              fontSize:'1rem',
              fontWeight:'bold',
              cursor:'pointer'
            }}>Column Title</Typography>
            {/* Box column header */}
            <Box>
              <Tooltip title="More options">
                <ExpandMoreIcon
                  id="basic-button"
                  aria-controls={open ? 'basic-menu-column-dropdown' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                  sx={{
                    color:'primary.main',
                    cursor:'pointer'
                  }}/>
              </Tooltip>

              <Menu
                id="basic-menu-column-dropdown"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button'
                }}
              > <MenuItem>
                  <ListItemIcon>
                    <AddCardIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Add new card</ListItemText>

                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentCut fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Cut</ListItemText>

                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentCopyIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Coppy</ListItemText>

                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentPasteIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Paste</ListItemText>

                </MenuItem>
                <Divider />
                <MenuItem>
                  <ListItemIcon> <Delete fontSize="small" /> </ListItemIcon>
                  <ListItemText>Remove this column</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon> <Cloud fontSize="small" /> </ListItemIcon>
                  <ListItemText>Archive this column</ListItemText>
                </MenuItem>
              </Menu>
            </Box>
          </Box>
          {/* Box column list card */}
          <Box sx={{
            p:'0 5px',
            m:'0 5px',
            display:'flex',
            flexDirection:'column',
            gap:1,
            overflowX:'hidden',
            overflowY:'auto',
            maxHeight:(theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)} - ${COLUMN_HEADER_HEIGHT} - ${COLUMN_FOOTER_HEIGHT})`,
            '&::-webkit-scrollbar-thumb': { backgroundColor: '#ced0da' },
            '&::-webkit-scrollbar-thumb:hover': { backgroundColor: '#bfc2cf' }
          }}>

            <Card sx={{ maxWidth: 345,
              cursor:'pointer',
              gap:1,
              boxShadow:'0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow:'unset'
            }}>
              <CardMedia
                sx={{ height: 140 }}
                image="https://th.bing.com/th/id/OIP.G6wrRmvN4QcIAku4yL24XQHaD5?rs=1&pid=ImgDetMain"
                title="green iguana"
              />
              <CardContent sx={{
                p:1.5, '&:last-child':{
                  p:1.5
                }
              }}>
                <Typography> SownDev  </Typography>
              </CardContent>
              <CardActions sx={{ p:'0 4px 8px 4px' }}>
                <Button size="small" startIcon={<GroupsIcon/>}>10</Button>
                <Button size="small" startIcon={<CommentIcon/>}>20</Button>
                <Button size="small" startIcon={<AttachmentIcon/>}>4</Button>

              </CardActions>
            </Card>
            <Card sx={{ maxWidth: 345,
              cursor:'pointer',
              gap:1,
              boxShadow:'0 1px 1px rgba(0, 0, 0, 0.2)'
            }}>

              <CardContent sx={{
                p:1.5, '&:last-child':{
                  p:1.5
                }
              }}>
                <Typography >
          Lizard
                </Typography>

              </CardContent>

            </Card>

            <Card sx={{ maxWidth: 345,
              cursor:'pointer',
              gap:1,
              boxShadow:'0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow:'unset'
            }}>
              <CardMedia
                sx={{ height: 140 }}
                image="https://th.bing.com/th/id/OIP.G6wrRmvN4QcIAku4yL24XQHaD5?rs=1&pid=ImgDetMain"
                title="green iguana"
              />
              <CardContent sx={{
                p:1.5, '&:last-child':{
                  p:1.5
                }
              }}>
                <Typography> SownDev  </Typography>
              </CardContent>
              <CardActions sx={{ p:'0 4px 8px 4px' }}>
                <Button size="small" startIcon={<GroupsIcon/>}>10</Button>
                <Button size="small" startIcon={<CommentIcon/>}>20</Button>
                <Button size="small" startIcon={<AttachmentIcon/>}>4</Button>

              </CardActions>
            </Card>
            <Card sx={{ maxWidth: 345,
              cursor:'pointer',
              gap:1,
              boxShadow:'0 1px 1px rgba(0, 0, 0, 0.2)'
            }}>

              <CardContent sx={{
                p:1.5, '&:last-child':{
                  p:1.5
                }
              }}>
                <Typography >
          Lizard
                </Typography>

              </CardContent>

            </Card>
            <Card sx={{ maxWidth: 345,
              cursor:'pointer',
              gap:1,
              boxShadow:'0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow:'unset'
            }}>
              <CardMedia
                sx={{ height: 140 }}
                image="https://th.bing.com/th/id/OIP.G6wrRmvN4QcIAku4yL24XQHaD5?rs=1&pid=ImgDetMain"
                title="green iguana"
              />
              <CardContent sx={{
                p:1.5, '&:last-child':{
                  p:1.5
                }
              }}>
                <Typography> SownDev  </Typography>
              </CardContent>
              <CardActions sx={{ p:'0 4px 8px 4px' }}>
                <Button size="small" startIcon={<GroupsIcon/>}>10</Button>
                <Button size="small" startIcon={<CommentIcon/>}>20</Button>
                <Button size="small" startIcon={<AttachmentIcon/>}>4</Button>

              </CardActions>
            </Card>
            <Card sx={{ maxWidth: 345,
              cursor:'pointer',
              gap:1,
              boxShadow:'0 1px 1px rgba(0, 0, 0, 0.2)'
            }}>

              <CardContent sx={{
                p:1.5, '&:last-child':{
                  p:1.5
                }
              }}>
                <Typography >
          Lizard
                </Typography>

              </CardContent>

            </Card>
            <Card sx={{ maxWidth: 345,
              cursor:'pointer',
              gap:1,
              boxShadow:'0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow:'unset'
            }}>
              <CardMedia
                sx={{ height: 140 }}
                image="https://th.bing.com/th/id/OIP.G6wrRmvN4QcIAku4yL24XQHaD5?rs=1&pid=ImgDetMain"
                title="green iguana"
              />
              <CardContent sx={{
                p:1.5, '&:last-child':{
                  p:1.5
                }
              }}>
                <Typography> SownDev  </Typography>
              </CardContent>
              <CardActions sx={{ p:'0 4px 8px 4px' }}>
                <Button size="small" startIcon={<GroupsIcon/>}>10</Button>
                <Button size="small" startIcon={<CommentIcon/>}>20</Button>
                <Button size="small" startIcon={<AttachmentIcon/>}>4</Button>

              </CardActions>
            </Card>
            <Card sx={{ maxWidth: 345,
              cursor:'pointer',
              gap:1,
              boxShadow:'0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow:'unset'
            }}>

              <CardContent sx={{
                p:1.5, '&:last-child':{
                  p:1.5
                }
              }}>
                <Typography >
          Lizard
                </Typography>

              </CardContent>

            </Card>
          </Box>
          {/* Box column footer */}
          <Box
            sx={{
              height:COLUMN_FOOTER_HEIGHT,
              display:'flex',
              alignItems:'center',
              justifyContent:'space-between',
              p:2

            }}
          >
            <Button startIcon={<AddCardIcon/>}>Add new card</Button>
            <Tooltip title="Drag handle icon">
              <DragHandleIcon sx={{
                cursor:'pointer'

              }}/>
            </Tooltip>
          </Box>
        </Box>
      </Box>

    </Box>

  )
}

export default BoardContent

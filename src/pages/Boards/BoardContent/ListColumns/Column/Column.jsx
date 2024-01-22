import AddCardIcon from '@mui/icons-material/AddCard'
import Cloud from '@mui/icons-material/Cloud'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import ContentCut from '@mui/icons-material/ContentCut'
import ContentPasteIcon from '@mui/icons-material/ContentPaste'
import Delete from '@mui/icons-material/Delete'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import React from 'react'
import ListCards from './ListCards/ListCards'
import { mapOrder } from '~/utils/sort'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
function Column({ column }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: column._id,
    data:{ ...column }
  })

  const dndKitColumnStyles = {
    touchAction: 'none',
    transform: CSS.Translate.toString(transform),
    transition,
    height:'100%',
    opacity: isDragging ? 0.5 : 1
  }

  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const orderedCards = mapOrder(column?.cards, column?.cardOrderIds, '_id')
  return (
    <div ref={setNodeRef}
      style={dndKitColumnStyles}
      {...attributes}
    >
      <Box
        {...listeners}
        sx={{
          minWidth:'300px',
          maxWidth:'300px',
          bgcolor:(theme) => (theme.palette.mode === 'dark' ?'#333643':'#ebecf0'),
          ml:2,
          borderRadius:'6px',
          height:'fit-content',
          maxHeight:(theme) => `(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`


        }}>
        <Box sx={{
          height:(theme) => theme.trello.columnHeaderHeight,
          display:'flex',
          alignItems:'center',
          justifyContent:'space-between',
          p:2

        }}>
          <Typography variant='h6' sx={{
            fontSize:'1rem',
            fontWeight:'bold',
            cursor:'pointer'
          }}>{column?.title}</Typography>
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
        {/*  List cards */}
        <ListCards cards={orderedCards}/>
        {/* Box column footer */}
        <Box
          sx={{
            height:(theme) => theme.trello.columnHeaderHeight,
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
    </div>

  )
}

export default Column
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import AddCardIcon from '@mui/icons-material/AddCard'
import CloseIcon from '@mui/icons-material/Close'
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
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { createNewCardAPI, deleteColumnDetailApi } from '~/apis'
import { useUpdateBoard, useUpdateColumn, useUser } from '~/zustand/store'
import ListCards from './ListCards/ListCards'
import { useConfirm } from 'material-ui-confirm'
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
    opacity: isDragging ? 0.5 : undefined,
    cursor: 'default'

  }

  const [anchorEl, setAnchorEl] = React.useState(null)
  const setColumn = useUpdateColumn(state => state.setColumn)
  const board = useUpdateBoard(state => state.board)
  const setBoard = useUpdateBoard(state => state.setBoard)
  const open = Boolean(anchorEl)
  const user = useUser(state => state.user)
  const setUser = useUser(state => state.setUser)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const orderedCards = column.cards
  const [openNewCardForm, setOpenNewCardForm] = useState(false)
  const toggleOpenNewCardForm = () => {setOpenNewCardForm(!openNewCardForm)
    setNewCardTitle('')
  }
  const [newCardTitle, setNewCardTitle] = useState('')
  const addNewColumn = async() => {
    if (newCardTitle.trim() === '') {
      toast.error('Please enter card title', {
        position:'bottom-right'
      })

      return
    }
    const newCardData = {
      title: newCardTitle,
      boardId: column.boardId,
      columnId: column._id

    }

    // API call to create new card
    const responseCard = await createNewCardAPI(newCardData, user, setUser)


    const newColumn = { ...column }

    if (newColumn.cards.some(card => card.FE_PlaceholderCard))
    {
      newColumn.cards = [responseCard]
      newColumn.cardOrderIds = [responseCard._id]
    } else {
      newColumn.cards.push(responseCard)
      newColumn.cardOrderIds.push(responseCard._id)
    }


    setColumn(newColumn)
    // Update the column state


    setOpenNewCardForm(false)
    setOpenNewCardForm('')
  }
  // Delete column
  const confirmDeleteColumn = useConfirm()

  const handleDeleteColumn = () => {
    confirmDeleteColumn({
      title:'Delete column',
      description:'This action will delete the column and all the cards in it. Are you sure you want to delete this column?'

    })
      .then(async() => {
        // Delete column
        // Update the column state
        const newBoard = { ...board }
        newBoard.columns = newBoard.columns.filter(c => c._id !== column._id)
        newBoard.columnOrderIds = newBoard.columnOrderIds.filter(_id => _id !== column._id)
        setBoard(newBoard)
        // API call to delete column
        const result = await deleteColumnDetailApi(column._id, user, setUser)

        toast.success(result?.deleteResult)

      })
      .catch(() => {
        // Do nothing
      })
  }
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
          cursor:'pointer',
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
              onClick={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button'
              }}
            > <MenuItem onClick={toggleOpenNewCardForm}>
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
              <MenuItem
                onClick={handleDeleteColumn}
              >
                <ListItemIcon> <Delete fontSize="small" /> </ListItemIcon>
                <ListItemText>Delete this column</ListItemText>
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
            p:2

          }}
        >
          {!openNewCardForm
            ? <Box sx={{
              height:'100%',
              display:'flex',
              alignItems:'center',
              justifyContent:'space-between' }}>
              <Button startIcon={<AddCardIcon/>} onClick={toggleOpenNewCardForm}>Add new card</Button>
              <Tooltip title="Drag handle icon">
                <DragHandleIcon sx={{
                  cursor:'pointer'

                }}/>
              </Tooltip>
            </Box>
            :
            <Box sx={{ height:'100%', display:'flex', alignItems:'center', gap:1 }}>
              <TextField

                id="outlined-search"
                label="Enter card title"
                type="text"
                size="small"
                variant='outlined'
                autoFocus
                data-no-dnd="true"
                value={newCardTitle}
                onChange={(e) => setNewCardTitle(e.target.value)}


                sx={{
                  '& label':{ color:'text.primary' },
                  '& input':{ color:(theme) => theme.palette.primary.main,
                    bgcolor:(theme) => theme.palette.mode === 'dark' ? '#333743' : 'white' },
                  '& label.Mui-focused':{ color:(theme) => theme.palette.primary.main },
                  '& .MuiOutlinedInput-root':{
                    '& fieldset':{
                      borderColor:(theme) => theme.palette.primary.main

                    },
                    '&:hover fieldset':{
                      borderColor:(theme) => theme.palette.primary.main

                    },
                    '&.Mui-focused fieldset':{
                      borderColor:(theme) => theme.palette.primary.main
                    },
                    '& .MuiOutlinedInput-input':{
                      borderRadius:1
                    }
                  }

                }}/>
              <Box sx={{ display:'flex', alignItems:'center', gap:0.5 }}>
                <Button
                  data-no-dnd="true"
                  onClick={addNewColumn}
                  variant='contained' color="success" size='small' sx={{
                    boxShadow:'none',
                    border:'0.5px solid',
                    borderColor:(theme) => theme.palette.success.main,
                    '&:hover':{ bgcolor:(theme) => theme.palette.success.main }
                  }}>Add</Button>
                <Box sx={{ py:0.5, px:1, '&:hover': {
                  bgcolor:(theme) => theme.palette.mode === 'dark' ? '#63748d' : '#6aabeb'
                  , borderRadius:'6px' }, cursor:'pointer', color:(theme) => theme.palette.warning.light }} onClick={toggleOpenNewCardForm}>  <CloseIcon fontSize="small" />

                </Box>

              </Box>
            </Box>
          }


        </Box>
      </Box>
    </div>

  )
}

export default Column
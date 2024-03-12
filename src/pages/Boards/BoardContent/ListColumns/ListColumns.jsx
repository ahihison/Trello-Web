import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import CloseIcon from '@mui/icons-material/Close'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useState } from 'react'
import Column from './Column/Column'
import { toast } from 'react-toastify'
import { useUpdateBoard } from '~/zustand/store'
import { createNewColumnAPI } from '~/apis'
import { generatePlaceholderCard } from '~/utils/formatters'
function ListColumns({ columns }) {
  const board = useUpdateBoard(state => state.board)
  const setBoard = useUpdateBoard(state => state.setBoard)
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false)
  const toggleNewColumnForm = () => {setOpenNewColumnForm(!openNewColumnForm)
    setNewColumnTitle('')
  }
  const [newColumnTitle, setNewColumnTitle] = useState('')
  const addNewColumn = async() => {
    if (newColumnTitle.trim() === '')
    {
      toast.error('Please enter column title')
      return
    }
    // API call to create new column
    const newColumnData = {
      title: newColumnTitle,

      boardId:board?._id
    }

    const columnResponse = await createNewColumnAPI(newColumnData)
    //update to drog drag card to the new column
    columnResponse.cards = [generatePlaceholderCard(columnResponse)]
    columnResponse.cardOrderIds = [generatePlaceholderCard(columnResponse)._id]
    // Update the board state
    const newBoard = { ...board }
    newBoard.columns.push(columnResponse)
    setBoard(newBoard)

    setOpenNewColumnForm(false)
    setNewColumnTitle('')
  }
  return (
    <>
      {/* Box column */}
      <SortableContext items={columns?.map(c => c?._id)} strategy={horizontalListSortingStrategy}>
        <Box sx={{
          bgcolor:'inherit',
          width:'100%',
          height:'100%',
          display:'flex',
          overflowX:'auto',
          overflowY:'hidden',
          '&::-webkit-scrollbar-track': { m:2 }
        }}>
          {columns?.map(column => <Column key = {column?._id} column={column}/> )}
          {
            !openNewColumnForm
              ?
              <Box
                onClick={toggleNewColumnForm}
                sx={{
                  minWidth:'250px',
                  maxWidth:'250px',
                  mx:2,
                  borderRadius:'6px',
                  height:'fit-content',
                  bgcolor:'#ffffff3d'
                }}>
                <Button
                  startIcon={<NoteAddIcon/>}
                  sx={{
                    color:'white',
                    width:'100%',
                    justifyContent:'flex-start',
                    pl:2.5,
                    py:1
                  }}
                >Add new Column</Button>
              </Box>
              :
              <Box

                sx={{
                  minWidth:'250px',
                  maxWidth:'250px',
                  mx:2,
                  p:1,
                  borderRadius:'6px',
                  height:'fit-content',
                  bgcolor:'#ffffff3d',
                  display:'flex',
                  flexDirection:'column',
                  gap:1
                }}>
                <TextField

                  id="outlined-search"
                  label="Enter column title"
                  type="text"
                  size="small"
                  variant='outlined'
                  autoFocus
                  value={newColumnTitle}
                  onChange={(e) => setNewColumnTitle(e.target.value)}


                  sx={{
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
                <Box sx={{ display:'flex', alignItems:'center', gap:0.5 }}>
                  <Button
                    onClick={addNewColumn}
                    variant='contained' color="success" size='small' sx={{
                      boxShadow:'none',
                      border:'0.5px solid',
                      borderColor:(theme) => theme.palette.success.main,
                      '&:hover':{ bgcolor:(theme) => theme.palette.success.main }
                    }}>Add Column</Button>
                  <Box sx={{ py:0.5, px:1, '&:hover': {
                    bgcolor:(theme) => theme.palette.mode === 'dark' ? '#63748d' : '#6aabeb'
                    , borderRadius:'6px' }, cursor:'pointer', color:'white' }} onClick={toggleNewColumnForm}>  <CloseIcon fontSize="small" />

                  </Box>

                </Box>

              </Box>
          }

        </Box>
      </SortableContext>


    </>
  )
}

export default ListColumns
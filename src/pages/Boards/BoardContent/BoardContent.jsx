import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sort'
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { useEffect, useState } from 'react'
import {
  arrayMove

} from '@dnd-kit/sortable'
function BoardContent({ board }) {
  const pointerSensor = useSensor(PointerSensor,
    { activationConstraint: { distance: 10 }
    })
  const sensors = useSensors(pointerSensor)
  const [orderedColumns, setOrderedColumns] = useState([])
  useEffect(() => {

    setOrderedColumns( mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])
  const handleDragEnd = (event) => {
    console.log('handleDragEnd', event)
    const { active, over } = event
    if (!over) return
    if (active?.id !== over?.id) {
      console.log('move column')
      // get old index from active from orderedColumns
      const oldIndex = orderedColumns.findIndex(c => c?._id === active?.id)
      // get new index from active from orderedColumns
      const newIndex = orderedColumns.findIndex(c => c?._id === over?.id)

      const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex)
      // const dndOrderedColumnIds = dndOrderedColumns.map(c => c?._id)
      // console.log('dndOrderedColumns', dndOrderedColumns)
      setOrderedColumns(dndOrderedColumns)
    }
  }
  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
      <Box sx={{ backgroundColor: 'primary.main',
        bgcolor:(theme) => (theme.palette.mode === 'dark' ?'#172b4d':'#1976d2'),
        width: '100%', display: 'flex',

        height:(theme) => theme.trello.boardContentHeight,
        p:'10px 0'

      }}

      >
        <ListColumns columns={orderedColumns}/>

      </Box>
    </DndContext>
  )
}

export default BoardContent

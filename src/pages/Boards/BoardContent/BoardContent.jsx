import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors, DragOverlay, defaultDropAnimationSideEffects } from '@dnd-kit/core'
import {
  arrayMove
} from '@dnd-kit/sortable'
import Box from '@mui/material/Box'
import { useEffect, useState } from 'react'
import { mapOrder } from '~/utils/sort'
import ListColumns from './ListColumns/ListColumns'
import Card from './ListColumns/Column/ListCards/Card/Card'
import Column from './ListColumns/Column/Column'
const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN:'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD:'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

function BoardContent({ board }) {
  // const pointerSensor = useSensor(PointerSensor,
  //   { activationConstraint: { distance: 10 }
  //   })
  const mouseSensor = useSensor(MouseSensor,
    { activationConstraint: { distance: 10 }
    })
  const touchSensor = useSensor(TouchSensor,
    { activationConstraint: { delay:250, tolerance:5 }
    })
  const sensors = useSensors(mouseSensor, touchSensor)
  const [orderedColumns, setOrderedColumns] = useState([])
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)

  useEffect(() => {

    setOrderedColumns( mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  const handleDragStart = (event) => {

    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(event?.active?.data?.current?.columnId?ACTIVE_DRAG_ITEM_TYPE.CARD:ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(event?.active?.data?.current)
  }
  const handleDragEnd = (event) => {

    const { active, over } = event
    if (!over) return
    if (active?.id !== over?.id) {

      // get old index from active from orderedColumns
      const oldIndex = orderedColumns.findIndex(c => c?._id === active?.id)
      // get new index from active from orderedColumns
      const newIndex = orderedColumns.findIndex(c => c?._id === over?.id)

      const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex)
      // const dndOrderedColumnIds = dndOrderedColumns.map(c => c?._id)
      // console.log('dndOrderedColumns', dndOrderedColumns)
      setOrderedColumns(dndOrderedColumns)
    }
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
  }
  const customDropAnimation={
    sideEffect:defaultDropAnimationSideEffects({
      styles:{
        active:{
          opacity:0.5
        }
      }
    })
  }
  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      sensors={sensors}>
      <Box sx={{ backgroundColor: 'primary.main',
        bgcolor:(theme) => (theme.palette.mode === 'dark' ?'#172b4d':'#1976d2'),
        width: '100%', display: 'flex',

        height:(theme) => theme.trello.boardContentHeight,
        p:'10px 0'

      }}

      >
        <ListColumns columns={orderedColumns}/>
        <DragOverlay dropAnimation={customDropAnimation}>
          {( !activeDragItemType) && null }
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN)&&<Column column={activeDragItemData}/>}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD)&&<Card card={activeDragItemData}/>}
        </DragOverlay>


      </Box>
    </DndContext>
  )
}

export default BoardContent

import { DndContext, DragOverlay, MouseSensor, TouchSensor, closestCorners, defaultDropAnimationSideEffects, useSensor, useSensors } from '@dnd-kit/core'
import {
  arrayMove
} from '@dnd-kit/sortable'
import Box from '@mui/material/Box'
import { cloneDeep } from 'lodash'
import { useEffect, useState } from 'react'
import { mapOrder } from '~/utils/sort'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'
import ListColumns from './ListColumns/ListColumns'
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
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] = useState(null)

  useEffect(() => {

    setOrderedColumns( mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])
  const findColumnByCardId = (cardId) => {
    const column = orderedColumns.find(column => column?.cards?.map(card => card?._id).includes(cardId))
    return column
  }

  const moveCardBetweenDifferentColumns = (overColumn, overCardId, active, over, activeColumn, activeDraggingCardId, activeDraggingCardData) => {
    setOrderedColumns(prevColumn => {
      //find index of card in the over column (position of the card will be dropped)
      const overCardIndex = overColumn?.cards?.findIndex(card => card?._id === overCardId)
      //Logic to determine position of the card will be dropped
      let newCardIndex
      const isBelowOverItem = active.rect.current.translated && active.rect.current.translated.top> over.rect.top + over.rect.height
      const modifier = isBelowOverItem ? 1 : 0
      newCardIndex = overCardIndex >=0 ? overCardIndex + modifier : overColumn?.cards?.length +1
      //clone new column and new card array to avoid mutate state
      const nextColumns = cloneDeep(prevColumn)
      const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
      const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)
      if (nextActiveColumn) {
        //delete card in old column when drag over new column
        nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)
        //update cardOrderIds
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
      }
      //new column
      if (nextOverColumn) {
        //check if card already in new column then delete it
        nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)
        //add card to correct index in new column
        const rebuild_ActiveDraggingCardData = {
          ...activeDraggingCardData,
          columnId:nextOverColumn._id
        }
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, rebuild_ActiveDraggingCardData)

      }

      return nextColumns
    })
  }
  const handleDragStart = (event) => {

    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(event?.active?.data?.current?.columnId?ACTIVE_DRAG_ITEM_TYPE.CARD:ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(event?.active?.data?.current)
    //when drag card, save old column to state
    if (event?.active?.data?.current?.columnId) {
      setOldColumnWhenDraggingCard(findColumnByCardId(event?.active?.id))
    }
  }
  //Trigger when drag over
  const handleDragOver = (event) => {

    if (activeDragItemType===ACTIVE_DRAG_ITEM_TYPE.COLUMN) return
    const { active, over } = event
    if (!active || !over) return
    const { id:activeDraggingCardId, data:{ current:activeDraggingCardData } } = active
    const { id:overCardId } = over
    //find 2 columns follow CardId
    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)
    if (!overColumn || !activeColumn) return
    // if drag over not same column then move card to new column
    if (overColumn._id !== activeColumn._id) {
      moveCardBetweenDifferentColumns(overColumn, overCardId, active, over, activeColumn, activeDraggingCardId, activeDraggingCardData)
    }
    // console.log('eventDragOver', event)

  }
  const handleDragEnd = (event) => {

    const { active, over } = event
    if (!active || !over) return
    if (activeDragItemType===ACTIVE_DRAG_ITEM_TYPE.CARD) {

      const { id:activeDraggingCardId, data:{ current:activeDraggingCardData } } = active
      const { id:overCardId } = over
      //find 2 columns follow CardId
      const activeColumn = findColumnByCardId(activeDraggingCardId)
      const overColumn = findColumnByCardId(overCardId)

      if (!overColumn || !activeColumn) return

      if (oldColumnWhenDraggingCard!== overColumn._id) {
        moveCardBetweenDifferentColumns(overColumn, overCardId, active, over, activeColumn, activeDraggingCardId, activeDraggingCardData)
      } else {
        // get old index from active from orderedColumns
        const oldCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex(c => c?._id === activeDragItemId)
        // get new index from active from orderedColumns
        const newCardIndex = overColumn?.cards?.findIndex(c => c?._id === overCardId)
        const dndOrderedCards = arrayMove(oldColumnWhenDraggingCard.cards, oldCardIndex, newCardIndex)

        setOrderedColumns(prevColumn => {
          //clone new column and new card array to avoid mutate state
          const nextColumns = cloneDeep(prevColumn)
          const targetColumn = nextColumns.find(column => column._id === overColumn._id)

          if (targetColumn) {
            targetColumn.cards = dndOrderedCards
            targetColumn.cardOrderIds = targetColumn.cards.map(card => card._id)
          }

          return nextColumns
        })
      }
    }
    //handle drag column
    if (activeDragItemType===ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      if (active?.id !== over?.id) {

        // get old index from active from orderedColumns
        const oldColumnIndex = orderedColumns.findIndex(c => c?._id === active?.id)
        // get new index from active from orderedColumns
        const newColumnIndex = orderedColumns.findIndex(c => c?._id === over?.id)

        const dndOrderedColumns = arrayMove(orderedColumns, oldColumnIndex, newColumnIndex)
        // const dndOrderedColumnIds = dndOrderedColumns.map(c => c?._id)
        // console.log('dndOrderedColumns', dndOrderedColumns)
        setOrderedColumns(dndOrderedColumns)
      }
      return
    }

    //reset state
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
    setOldColumnWhenDraggingCard(null)
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
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      sensors={sensors}
      collisionDetection={closestCorners}
    >
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

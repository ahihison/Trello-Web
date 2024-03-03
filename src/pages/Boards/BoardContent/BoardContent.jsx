import { DndContext, DragOverlay, closestCorners, defaultDropAnimationSideEffects, getFirstCollision, pointerWithin, useSensor, useSensors } from '@dnd-kit/core'
import {
  arrayMove
} from '@dnd-kit/sortable'
import Box from '@mui/material/Box'
import { cloneDeep, isEmpty } from 'lodash'
import { useCallback, useEffect, useRef, useState } from 'react'
import { generatePlaceholderCard } from '~/utils/formatters'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'
import ListColumns from './ListColumns/ListColumns'

import { moveCardToDiffirentcolumnApi, updateBoardDetailApi, updateColumnDetailApi } from '~/apis'
import { useUpdateBoard } from '~/customHooks/store'
import {
  MouseSensor,
  TouchSensor
} from '~/customLibraries/dndKitSensor'
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
  const setBoard = useUpdateBoard(state => state.setBoard)
  const [orderedColumns, setOrderedColumns] = useState([])
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] = useState(null)
  const lastOverId = useRef(null)

  const moveCardToDifferentColumn = (activeCardId, prevColumnId, nextColumnId, nextColumn) => {

    const orderedColumnsIds = nextColumn.map(c => c?._id)
    const newBoard = { ...board }
    newBoard.columns = nextColumn
    //fix temp bug orderCardIds not update
    newBoard.columns.forEach(column => {
      column._id === nextColumnId && (column.cardOrderIds = column.cards.map(card => card._id))
    })

    newBoard.columnOrderIds = orderedColumnsIds

    setBoard(newBoard)
    let prevCardOrderIds =nextColumn.find(c => c._id === prevColumnId)?.cardOrderIds
    // handle case when drag a last card in column, column empty card will be have a place-holder in id so need to remove it
    if (prevCardOrderIds[0].includes('placeholder-card')) {
      prevCardOrderIds = []
    }
    moveCardToDiffirentcolumnApi({
      activeCardId,
      prevColumnId,
      prevCardOrderIds,
      nextColumnId,
      nextCardOrderIds:newBoard.columns.find(c => c._id === nextColumnId)?.cardOrderIds
    })
  }
  useEffect(() => {

    setOrderedColumns( board.columns)
  }, [board])
  const findColumnByCardId = (cardId) => {
    const column = orderedColumns.find(column => column?.cards?.map(card => card?._id).includes(cardId))
    return column
  }

  const moveCardBetweenDifferentColumns = (overColumn, overCardId, active, over, activeColumn, activeDraggingCardId, activeDraggingCardData, triggerFrom) => {
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
        //update temp empty card when column empty card
        if (isEmpty(nextActiveColumn.cards)) {
          nextActiveColumn.cards = [generatePlaceholderCard(nextActiveColumn)]
        }
        //update cardOrderIds
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
        console.log('nextActiveColumn', nextActiveColumn)
      }
      //new column
      if (nextOverColumn) {
        //check if card already in new column then delete it
        nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)

        //if column has a card need to remove card empty
        nextOverColumn.cards = nextOverColumn.cards.filter(card => !card?.FE_PlaceholderCard)
        //add card to correct index in new column
        const rebuild_ActiveDraggingCardData = {
          ...activeDraggingCardData,
          columnId:nextOverColumn._id
        }
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, rebuild_ActiveDraggingCardData)

      }
      if (triggerFrom==='handleDragEnd') {
        moveCardToDifferentColumn(activeDraggingCardId, oldColumnWhenDraggingCard._id, nextOverColumn._id, nextColumns)

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
      moveCardBetweenDifferentColumns(overColumn, overCardId, active, over, activeColumn, activeDraggingCardId, activeDraggingCardData, 'handleDragOver')
    }
    // console.log('eventDragOver', event)

  }
  const handleDragEnd = async(event) => {

    const { active, over } = event
    if (!active || !over) return
    if (activeDragItemType===ACTIVE_DRAG_ITEM_TYPE.CARD) {

      const { id:activeDraggingCardId, data:{ current:activeDraggingCardData } } = active
      const { id:overCardId } = over
      //find 2 columns follow CardId
      const activeColumn = findColumnByCardId(activeDraggingCardId)
      const overColumn = findColumnByCardId(overCardId)

      if ( !activeColumn || !overColumn) return

      if (oldColumnWhenDraggingCard._id!== overColumn._id) {
        moveCardBetweenDifferentColumns(overColumn, overCardId, active, over, activeColumn, activeDraggingCardId, activeDraggingCardData, 'handleDragEnd')
      } else {
        // get old index from active from orderedColumns
        const oldCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex(c => c?._id === activeDragItemId)
        // get new index from active from orderedColumns
        const newCardIndex = overColumn?.cards?.findIndex(c => c?._id === overCardId)
        const dndOrderedCards = arrayMove(oldColumnWhenDraggingCard.cards, oldCardIndex, newCardIndex)
        const dndOrderedCardIds = dndOrderedCards.map(c => c?._id)
        setOrderedColumns(prevColumn => {
          //clone new column and new card array to avoid mutate state
          const nextColumns = cloneDeep(prevColumn)
          const targetColumn = nextColumns.find(column => column._id === overColumn._id)

          if (targetColumn) {
            targetColumn.cards = dndOrderedCards
            targetColumn.cardOrderIds = dndOrderedCardIds
          }

          return nextColumns
        })
        // call api to update cardOrderIds when drag card in same column
        const newBoard = { ...board }
        const columnToUpdate = newBoard.columns.find(c => c._id === oldColumnWhenDraggingCard._id)
        if (columnToUpdate) {
          columnToUpdate.cardOrderIds = dndOrderedCardIds
          columnToUpdate.cards = dndOrderedCards
        }

        setBoard(newBoard)

        updateColumnDetailApi(oldColumnWhenDraggingCard._id, { cardOrderIds:dndOrderedCardIds })
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
        const dndOrderedColumnIds = dndOrderedColumns.map(c => c?._id)
        const newBoard = { ...board }
        newBoard.columns = dndOrderedColumns
        newBoard.columnOrderIds = dndOrderedColumnIds
        setBoard(newBoard)

        setOrderedColumns(dndOrderedColumns)
        await updateBoardDetailApi(newBoard._id, { columnOrderIds:dndOrderedColumnIds })
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
    sideEffects:defaultDropAnimationSideEffects({
      styles:{
        active:{
          opacity:0.5
        }
      }
    })
  }
  const collisionDetectionStrategy = useCallback((args) => {
    if (activeDragItemType===ACTIVE_DRAG_ITEM_TYPE.COLUMN) return closestCorners({ ...args })
    const pointerIntersections = pointerWithin(args)
    if (!pointerIntersections?.length) return

    // const intersections = pointerIntersections?.length > 0 ? pointerIntersections : rectIntersection(args)

    let overId = getFirstCollision(pointerIntersections, 'id')
    if (overId) {
      let checkColumn = orderedColumns.find(column => column?._id === overId)
      if (checkColumn) {
        overId = closestCorners({ ...args,
          droppableContainers:args.droppableContainers.filter(container => {return (container?.id!==overId) && (checkColumn?.cardOrderIds?.includes(container.id))})
        })[0]?.id
      }
      lastOverId.current = overId
      return [{ id:overId }]

    }
    return lastOverId.current?[{ id:lastOverId.current }]:[]
  }, [activeDragItemType])
  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      sensors={sensors}
      //bug flickering and data will be fail when drag card
      // collisionDetection={closestCorners}
      collisionDetection={collisionDetectionStrategy}
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

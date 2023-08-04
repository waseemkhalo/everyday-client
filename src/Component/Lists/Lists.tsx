import { FormEvent, useEffect, useState } from 'react'
import { BeforeCapture, DragDropContext, Droppable, OnBeforeCaptureResponder, OnDragEndResponder } from 'react-beautiful-dnd'
import { List as DBList, addList, listenToLists } from '../../services/listService'
import { getListOrder, updateListOrder } from '../../services/userService'
import List from "../List/List"
import PriorityList from '../List/PriorityList'

/**today's lists */
export default function Lists() {
  const [lists, setLists] = useState<DBList[]>()
  const [listOrder, setListOrder] = useState<DBList['title'][]>()
  const [currentDragging, setCurrentDragging] = useState<String>()

  //set up snapshot listener for today's lists, destroy listener on unmount
  useEffect(() => {
    const unsubscribe = listenToLists(setLists)
    if (unsubscribe) return () => unsubscribe()
  }, [])

  useEffect(() => {
    if (!listOrder) {
      getListOrder().then(result => {
        if (result) {
          setListOrder(result)
          return
        }
        //if no result, create list order based on order field
        const newListOrder = lists?.filter(list => list.title !== 'priority').sort((a, b) => a.order - b.order).map(list => list.title)
        setListOrder(newListOrder)
        updateListOrder(newListOrder)
      })
    }
  })

  const handleNewList = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const target = e.target as HTMLFormElement & { list: { value: string } }
    if (listOrder) {
      const newOrder = [...listOrder]
      newOrder.push(target.list.value)
      setListOrder(newOrder)
    }
    await addList(target.list.value)
    target.reset()
  }

  const handleListDrop: OnDragEndResponder = async (result) => {
    // code to update BE 
    setCurrentDragging(undefined)

    const type = result.type;

    if (type === 'todo') {



    } else if (type === 'list') {

      if (result.destination && listOrder) {
        const newOrder = [...listOrder]
        const movedItem = newOrder.splice(listOrder.indexOf(result.draggableId), 1)[0]
        newOrder.splice(result.destination.index, 0, movedItem)
        setListOrder(newOrder)
        await updateListOrder(newOrder)
      }
    }


  }

  const removeFromListState = (list: string) => {
    if (listOrder) {
      const newOrder = [...listOrder]
      newOrder.splice(newOrder.indexOf(list), 1)
      setListOrder(newOrder)
    }
  }

  const handleDragStart: OnBeforeCaptureResponder = (start: BeforeCapture) => {
    setCurrentDragging(start.draggableId)


  }

  return (
    <section className='sm:py-4 sm:ml-4 md:ml-16 lg:ml-32'>
      <form onSubmit={handleNewList} className='px-4 sm:py-2 md:py-4'>
        <label>
          <span className='md:mr-4'>New List: </span>
          <input name='list' placeholder='Title' className="bg-transparent border-b-2 border-black focus:outline-none" />
          <button className='trigger-time'>+</button>
        </label>
      </form>

      {lists && listOrder &&
        <DragDropContext onBeforeCapture={handleDragStart} onDragEnd={handleListDrop}>
          <Droppable droppableId='lists' direction='horizontal' type='list' >
            {(provided) => (
              // overflow-x-auto
              <ul className="flex py-4 overflow-x-auto lists-section px-4"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {/* remove priority list from list array from bd, sort the rest by order */}
                {lists.filter(list => list.title !== 'priority').sort((a, b) => listOrder.indexOf(a.title) - listOrder.indexOf(b.title)).map((list, index) =>
                  <List list={list} key={list.title} index={index} removeFromListState={removeFromListState} dropDisabled={list.title === currentDragging?.split('-')[1] ? false : true} />
                )}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
          <PriorityList list={lists.find(list => list.title === 'priority')} />
        </DragDropContext>}

    </section>
  )
}
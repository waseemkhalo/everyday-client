import { FormEvent, useEffect, useState } from 'react'
import { DragDropContext, Droppable, OnDragEndResponder } from 'react-beautiful-dnd'
import { List as DBList, addList, listenToLists } from '../../services/listService'
import { getListOrder, updateListOrder } from '../../services/userService'
import List from "../List/List"
import PriorityList from '../List/PriorityList'

/**today's lists */
export default function Lists() {
  const [lists, setLists] = useState<DBList[]>()
  const [listOrder, setListOrder] = useState<DBList['title'][]>()

  //set up snapshot listener for today's lists, destroy listener on unmount
  useEffect(() => {
    const unsubscribe = listenToLists(setLists)
    if (unsubscribe) return () => unsubscribe()
  }, [])

  useEffect(() => {
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
  }, [lists, listOrder])

  const handleNewList = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const target = e.target as HTMLFormElement & { list: { value: string } }
    await addList(target.list.value)
    target.reset()
  }

  const handleListDrop: OnDragEndResponder = async (result) => {
    // code to update BE 
    if (result.destination && listOrder) {
      const newOrder = [...listOrder]
      const movedItem = newOrder.splice(listOrder.indexOf(result.draggableId), 1)[0]
      newOrder.splice(result.destination.index, 0, movedItem)
      setListOrder(newOrder)
      await updateListOrder(newOrder)
    }
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
        <DragDropContext onDragEnd={handleListDrop}>
          <Droppable droppableId='lists' direction='horizontal' >
            {(provided, snapshot) => (
              <ul className="flex overflow-x-auto py-4 lists-section px-4"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {/* remove priority list from list array from bd, sort the rest by order */}
                {lists.filter(list => list.title !== 'priority').sort((a, b) => listOrder.indexOf(a.title) - listOrder.indexOf(b.title)).map((list, index) =>
                  <List list={list} key={list.title} index={index} />
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
import { FormEvent, useEffect, useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { List as DBList, addList, listenToLists } from '../../services/listService'
import List from "../List/List"
import PriorityList from '../List/PriorityList'

/**today's lists */
export default function Lists() {
  const [lists, setLists] = useState<DBList[]>()

  //set up snapshot listener for today's lists, destroy listener on unmount
  useEffect(() => {
    const unsubscribe = listenToLists(setLists)
    if (unsubscribe) return () => unsubscribe()
  }, [])

  const handleNewList = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const target = e.target as HTMLFormElement & { list: { value: string } }
    await addList(target.list.value)
    target.reset()
  }

  const handleListDrop = () => {
    // todo
    // code to update BE 
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
      {lists &&
        <DragDropContext onDragEnd={handleListDrop}>
          <ul className="flex gap-4 overflow-x-auto py-4 lists-section px-4">
            {/* remove priority list from list array from bd, sort the rest by order */}
            {lists.filter(list => list.title !== 'priority').sort((a, b) => a.order - b.order).map((list) =>
              <List list={list} key={list.title} />
            )}
          </ul>
          <PriorityList list={lists.find(list => list.title === 'priority')} />
        </DragDropContext>}
    </section>
  )
}
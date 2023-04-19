import { FormEvent, useEffect, useState } from 'react'
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

  return (
    <section className='py-4'>
      <form onSubmit={handleNewList} className='px-4'>
        <label>
          <span>new list: </span>
          <input name='list' placeholder='title' className="bg-transparent border-b-2 border-black focus:outline-none" />
          <button className='trigger-time'>+</button>
        </label>
      </form>
      {lists &&
        <>
          <ul className="flex gap-4 overflow-x-auto py-4 lists-section px-4">
            {/* remove priority list from list array from bd, sort the rest by order */}
            {lists.filter(list => list.title !== 'priority').sort((a, b) => a.order - b.order).map((list) =>
              <List list={list} key={list.title} />
            )}
          </ul>
          <PriorityList list={lists.find(list => list.title === 'priority')} />
        </>}
    </section>
  )
}
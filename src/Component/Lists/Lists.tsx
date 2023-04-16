import { FormEvent, useEffect, useState } from 'react'
import { List as DBList, addList, listenToLists } from '../../services/listService'
import List from "../List/List"
import PriorityList from '../List/PriorityList'

export default function Lists() {
  const [lists, setLists] = useState<DBList[]>()

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
    <section className='p-4'>
      <form onSubmit={handleNewList} className='p-0'>
        <label>
          <span>new list: </span>
          <input name='list' placeholder='title' className="bg-transparent border-b-2 border-black focus:outline-none" />
          <button className='trigger-time'>+</button>
        </label>
      </form>
      {lists &&
        <>
          <ul className="flex gap-4 overflow-x-scroll py-4">
            {lists.filter(list => list.title !== 'priority').sort((a, b) => a.order - b.order).map((list) =>
              <List list={list} key={list.title} />
            )}
          </ul>
          <PriorityList list={lists.find(list => list.title === 'priority')} />
        </>}
    </section>
  )
}
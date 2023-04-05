import { FormEvent, useEffect, useState } from 'react'
import { List as DBList, addList, listenToLists } from '../../services/listService'
import List from "../List/List"

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
    <>
      <form onSubmit={handleNewList}>
        <label>
          <span>new list: </span>
          <input name='list' placeholder='title' className="bg-transparent border-b-2 border-black focus:outline-none" />
          <button>+</button>
        </label>
      </form>
      <ul className="flex flex-wrap gap-2 ">
        {lists?.sort((a, b) => a.order - b.order).map((list) =>
          <List list={list} key={list.title} />
        )}
      </ul>
    </>
  )
}
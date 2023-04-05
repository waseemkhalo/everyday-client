import { useEffect, useState } from 'react'
import { List as DBList, listenToLists } from '../../services/listService'
import List from "../List/List"

export default function Lists() {
  const [lists, setLists] = useState<DBList[]>()

  useEffect(() => {
    const unsubscribe = listenToLists(setLists)
    if (unsubscribe) return () => unsubscribe()
  }, [])

  return (
    <ul className="flex flex-wrap gap-2 ">
      {lists?.sort((a, b) => a.order - b.order).map((list) =>
        <List list={list} key={list.title} />
      )}
    </ul>
  )
}
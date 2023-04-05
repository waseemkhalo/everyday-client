import { useState } from 'react'
import { List as DBList } from '../../services/listService'
import List from "../List/List"

export default function Lists() {
  const [lists, setLists] = useState<DBList[]>()
  return (
    <ul className="flex flex-wrap gap-2 ">
      {lists?.sort((a, b) => a.order - b.order).map((list) =>
        <List list={list} key={list.title} />
      )}
    </ul>
  )
}
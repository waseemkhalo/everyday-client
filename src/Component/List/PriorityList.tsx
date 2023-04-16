import { FormEvent, useState } from 'react'
import { List } from '../../services/listService'
import { addTodo } from '../../services/todoService'
import EditTodo from './EditTodo'
import TodoItem from './TodoItem'

export default function PriorityList({ list }: { list: List | undefined }) {
  const [edit, setEdit] = useState<number>()

  const handleNewTodo = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (list) {
      const target = e.target as HTMLFormElement & { todo: { value: string } }
      await addTodo(list.title, target.todo.value)
      target.reset()
    }
  }

  return (
    <div >
      <p className="my-2 capitalize">Priority list</p>
      <div className="bg-red rounded-md justify-center align-middle px-4 py-2">
        {list &&
          <>
            <ul>
              {list.todos.map((todo, index) =>
                edit === index ? (
                  <EditTodo key={index} list={list} setEdit={setEdit} todo={todo} edit={edit} />
                ) : (
                  <TodoItem key={index} index={index} list={list} setEdit={setEdit} todo={todo} />
                )
              )}
            </ul>
          </>
        }
        <form onSubmit={handleNewTodo} className="p-0" >
          <label>
            <input
              className="bg-transparent border-b-2 border-black w-5/6 max-w-[10rem] focus:outline-none" placeholder="Add Item" name="todo" />
            <button className="justify-self-end trigger-time">+</button>
          </label>
        </form>
      </div>
    </div>
  )
}
import { FormEvent, useState } from 'react'
import { List } from '../../services/listService'
import { addTodo } from '../../services/todoService'
import EditTodo from './EditTodo'
import TodoItem from './TodoItem'

// basically the same as List component, just styled a bit differently, and no delete button
export default function PriorityList({ list }: { list: List | undefined }) {
  //array index for todo selected for editing
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
    <div className='sm:pr-4 md:pr-16 lg:pr-32 sm:py-6 lg:py-10'>
      <p className="my-2 capitalize md:font-bold">Priority list</p>
      <div className=" shadow-lg bg-red rounded-md justify-center align-middle px-4 py-2">
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
              className="mt-2 bg-transparent border-b-2 border-black w-5/6 max-w-[10rem] focus:outline-none placeholder-black placeholder-opacity-50" placeholder="Add Item" name="todo" />
            <button className="justify-self-end trigger-time">+</button>
          </label>
        </form>
      </div>
    </div>
  )
}
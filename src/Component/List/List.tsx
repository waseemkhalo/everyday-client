import { FormEvent, useState } from "react";
import { List as DBList, deleteList } from '../../services/listService';
import { addTodo } from "../../services/todoService";
import EditTodo from "./EditTodo";
import TodoItem from "./TodoItem";

function List({ list }: { list: DBList }) {

  const [edit, setEdit] = useState<number>()

  const handleNewTodo = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const target = e.target as HTMLFormElement & { todo: { value: string } }
    await addTodo(list.title, target.todo.value)
    target.reset()
  }

  return (
    <li className="w-1/2 max-w-md min-w-[200px]">
      <div className="bg-smoke rounded-md justify-center align-middle px-4 py-2">
        <p className="text-center my-4 capitalize">{list.title}</p>
        {/* This button is for test purposes */}
        {list.title !== 'daily' && list.title !== 'priority' &&
          <button className='trigger-time mb-4' onClick={() => deleteList(list.title)}>Delete List</button>
        }
        <ul>
          {list.todos.map((todo, index) =>
            edit === index ? (
              <EditTodo key={index} list={list} setEdit={setEdit} todo={todo} edit={edit} />
            ) : (
              <TodoItem key={index} index={index} list={list} setEdit={setEdit} todo={todo} />
            )
          )}
        </ul>
        <form onSubmit={handleNewTodo} className="p-0" >
          <label>
            <input
              className="bg-transparent border-b-2 border-black w-5/6 max-w-[10rem] focus:outline-none" placeholder="Add Item" name="todo" />
            <button className="justify-self-end trigger-time">+</button>
          </label>
        </form>
      </div>
    </li>
  )
}
export default List;

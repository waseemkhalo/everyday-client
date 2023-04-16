import { FormEvent, useState } from "react";
import deleteIcon from '../../assets/icons/trash-light.svg';
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
      <div className="flex flex-col h-full bg-smoke rounded-md px-4 py-2 shadow-lg">
        <h2 className="text-center my-4 capitalize relative">
          {list.title}
          {list.title !== 'daily' &&
            <button className='trigger-time mb-4 absolute top-0 right-0' onClick={() => deleteList(list.title)}>
              <img src={deleteIcon} alt="delete list" className="w-6" />
            </button>
          }
        </h2>

        <ul className="max-h-[50vh] overflow-y-auto list">
          {list.todos.map((todo, index) =>
            edit === index ? (
              <EditTodo key={index} list={list} setEdit={setEdit} todo={todo} edit={edit} />
            ) : (
              <TodoItem key={index} index={index} list={list} setEdit={setEdit} todo={todo} />
            )
          )}
        </ul>
        <form onSubmit={handleNewTodo} className="p-0 mt-auto" >
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

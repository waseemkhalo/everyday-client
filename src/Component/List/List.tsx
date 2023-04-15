import { FormEvent, useEffect, useRef, useState } from "react";
import editIcon from "../../assets/icons/pencil-light.svg";
import trashIcon from "../../assets/icons/trash-light.svg";
import { List as DBList, deleteList } from '../../services/listService';
import { addTodo, checkTodo, deleteTodo, editTodo } from "../../services/todoService";

// todo: split todo and editable todo into their own components

function List({ list }: { list: DBList }) {

  const [edit, setEdit] = useState<number>()
  const editRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (editRef.current) {
      editRef.current.select()
    }
  }, [edit])

  const handleNewTodo = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const target = e.target as HTMLFormElement & { todo: { value: string } }
    await addTodo(list.title, target.todo.value)
    target.reset()
  }

  const handleConfirmEdit = async () => {
    if (editRef.current && editRef.current.value && edit !== undefined) {
      await editTodo(list, list.todos[edit], editRef.current.value);
      setEdit(undefined);
    } else console.log("edited todo cannot be blank");
  };

  return (
    <li className="m-8">
      <div className="bg-smoke rounded-md justify-center align-middle px-6 py-2">
        <p className="text-center my-4 capitalize">{list.title}</p>
        {/* This button is for test purposes */}
        <button className='trigger-time' onClick={() => deleteList(list.title)}>Delete List</button>
        <ul>
          {list.todos.map((todo, index) =>
            edit === index ? (
              <li key={index} >
                <input
                  ref={editRef}
                  defaultValue={todo.content}
                  autoFocus
                />
                <div className="flex gap-4">
                  <button onClick={handleConfirmEdit} className='trigger-time' >
                    Confirm
                  </button>
                  <button onClick={() => setEdit(undefined)} >Cancel</button>
                </div>
              </li>
            ) : (
              <li key={index} className="flex max-w-full p-2 rounded-md group/edit hover:bg-white">
                <input
                  type="checkbox"
                  className="form-checkbox accent-pink-500 mr-2 trigger-time"
                  checked={todo.completed}
                  onChange={() => checkTodo(list, todo)}
                />
                <div className="flex justify-between w-full">
                  <span>{todo.content}</span>

                  <div className="group/edit invisable hover:bg-white group-hover/edit:visable flex gap-2">
                    <button className="invisible group-hover/edit:visible"
                      onClick={() => setEdit(index)} >
                      <img src={editIcon} className="w-5" alt="edit" />
                    </button>
                    <button className="invisible group-hover/edit:visible trigger-time"
                      onClick={() => deleteTodo(list.title, todo)} >
                      <img src={trashIcon} className="w-5" alt='delete' />
                    </button>
                  </div>
                </div>
              </li>
            )
          )}
        </ul>
        <form onSubmit={handleNewTodo} >
          <label>
            <input
              className="bg-transparent border-b-2 border-black focus:outline-none" placeholder="Add Item" name="todo" />
            <button className="justify-self-end trigger-time">+</button>
          </label>
        </form>
      </div>
    </li>
  )
}
export default List;

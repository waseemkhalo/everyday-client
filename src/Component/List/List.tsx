import editIcon from "../../assets/icons/pencil-light.svg";
import trashIcon from "../../assets/icons/trash-light.svg";
import { List as DBList, deleteList } from '../../services/listService';
import { FormEvent, useEffect, useRef, useState } from "react";
import { addTodo } from "../../services/todoService";

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
    if (editRef.current && editRef.current.value && edit) {
      // await editTodo(edit, editRef.current.value);
      setEdit(undefined);
    } else console.log("edited todo cannot be blank");
  };

  // const handleCheck = async (id: Todo["id"]) => {
  //   if (todos.find((todo) => todo.id === id)?.completed) {
  //     await uncheckTodo(id);
  //   } else {
  //     await checkTodo(id);
  //   }
  //   updateTodos();
  // };

  // const handleDelete = async (id: Todo["id"]) => {
  //   await removeTodo(id);
  //   updateTodos();
  // };

  // delete a list 
  const handleDeleteList = async () => {
    await deleteList(list.title);

  }

  return (
    <li className="m-8">
      <div className="bg-smoke rounded-md justify-center align-middle px-6 py-2">
        <p className="text-center my-4 capitalize">{list.title}</p>
        <button onClick={handleDeleteList}>Delete List</button>
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
                  <button onClick={handleConfirmEdit} >
                    Confirm
                  </button>
                  <button onClick={() => setEdit(undefined)} >Cancel</button>
                </div>
              </li>
            ) : (
              <li key={index} className="flex max-w-full p-2 rounded-md group/edit hover:bg-white">
                <input
                  type="checkbox"
                  className="form-checkbox accent-pink-500 mr-2 "
                // checked={todo.completed}
                /*onChange={() => handleCheck(todo.id)}*/
                />
                <div className="flex">
                  <span>{todo.content}</span>

                  <div className="group/edit invisable hover:bg-white group-hover/edit:visable flex gap-2">
                    <button className="invisible group-hover/edit:visible"
                      onClick={() => setEdit(index)} >
                      <img src={editIcon} className="w-5" alt="edit" />
                    </button>
                    <button className="invisible group-hover/edit:visible"
                    /*onClick={() => handleDelete(index)}*/ >
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
            <button className="justify-self-end">+</button>
          </label>
        </form>
      </div>
    </li>
  )
}
export default List;

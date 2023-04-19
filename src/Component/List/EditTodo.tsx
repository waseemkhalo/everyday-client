import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { List } from "../../services/listService";
import { Todo, editTodo } from "../../services/todoService";

/** todo item as editable input */
export default function EditTodo({ list, todo, edit, setEdit }: { list: List, todo: Todo, edit: number, setEdit: React.Dispatch<React.SetStateAction<number | undefined>> }) {

  const editRef = useRef<HTMLInputElement>(null)

  // auto select input text when editing a todo
  useEffect(() => {
    if (editRef.current) {
      editRef.current.select()
    }
  }, [edit])

  const handleConfirmEdit = async () => {
    if (editRef.current && editRef.current.value && edit !== undefined) {
      await editTodo(list, list.todos[edit], editRef.current.value);
      setEdit(undefined);
    } else toast.warning("edited todo cannot be blank");
  };

  return (
    <li >
      <input
        className='w-full bg-opacity-50 bg-white outline-none border border-black border-opacity-25 rounded-xl px-4'
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
  )
}
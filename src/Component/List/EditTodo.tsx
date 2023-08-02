import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { List } from "../../services/listService";
import { Todo, editTodo } from "../../services/todoService";
import { DraggableProvided } from "react-beautiful-dnd";



type TodoItemProps = {
  todo: Todo;
  list: List;
  edit: number;
  setEdit: React.Dispatch<React.SetStateAction<number | undefined>>;
  provided: DraggableProvided;
};

/** todo item as editable input */
export default function EditTodo({
  todo,
  list,
  edit,
  setEdit,
  provided }: TodoItemProps) {

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
    } else toast.warning("Cannot be blank");
  };

  return (
    <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
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
    </div>
  )
}
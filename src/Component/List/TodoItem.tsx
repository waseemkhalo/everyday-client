import { DraggableProvided } from "react-beautiful-dnd";
import { toast } from "react-toastify";
import editIcon from "../../assets/icons/pencil-light.svg";
import trashIcon from "../../assets/icons/trash-light.svg";
import { List } from "../../services/listService";
import { Todo, checkTodo, deleteTodo } from "../../services/todoService";
import "./TodoItem.scss";


type TodoItemProps = {
  todo: Todo;
  list: List;
  index: number;
  setEdit: React.Dispatch<React.SetStateAction<number | undefined>>;
  provided: DraggableProvided;
};


/** regular todo item */
export default function TodoItem({
  todo,
  list,
  index,
  setEdit,
  provided }: TodoItemProps) {

  const handleDelete = async (listTitle: List['title'], todo: Todo) => {
    await deleteTodo(listTitle, todo)
    toast.success(`deleted "${todo.content}" from "${listTitle}" list`)
  }


  return (
    <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>

      <li className={`flex max-w-full p-2 rounded-md group/edit hover:bg-opacity-${list.title !== 'daily' && list.title !== 'priority' ? '75' : '25'} hover:bg-white`}>
        <input
          type="checkbox"
          className="form-checkbox custom-checkbox accent-pink-500 mr-2 trigger-time"
          checked={todo.completed}
          onChange={() => checkTodo(list, todo)}
        />
        <div className="flex justify-between w-full" >
          <span className="break-all">{todo.content} </span>

          <div className="group/edit hidden group-hover/edit:flex gap-2 min-w-fit" >
            <button className="invisible group-hover/edit:visible hover:bg-white hover:bg-opacity-50"
              onClick={() => setEdit(index)} >
              <img src={editIcon} className="w-5" alt="edit" />
            </button>
            <button className="invisible group-hover/edit:visible hover:bg-white hover:bg-opacity-50 trigger-time"
              onClick={() => handleDelete(list.title, todo)} >
              <img src={trashIcon} className="w-5" alt='delete' />
            </button>
          </div>
        </div>
      </li>
    </div>
  )
}
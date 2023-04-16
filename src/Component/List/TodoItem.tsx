import editIcon from "../../assets/icons/pencil-light.svg";
import trashIcon from "../../assets/icons/trash-light.svg";
import { List } from "../../services/listService";
import { Todo, checkTodo, deleteTodo } from "../../services/todoService";

export default function TodoItem({ todo, list, index, setEdit }: { todo: Todo, list: List, index: number, setEdit: React.Dispatch<React.SetStateAction<number | undefined>> }) {
  return (
    <li className="flex max-w-full p-2 rounded-md group/edit hover:bg-white">
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
}
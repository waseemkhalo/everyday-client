import { FormEvent, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { toast } from "react-toastify";
import dragIcon from '../../assets/icons/drag-horizontal-fill.svg';
import deleteIcon from "../../assets/icons/trash-light.svg";
import { List as DBList, deleteList } from "../../services/listService";
import { addTodo } from "../../services/todoService";
import EditTodo from "./EditTodo";
import TodoItem from "./TodoItem";

function List({ list, index, removeFromListState, dropDisabled }: { removeFromListState: (list: string) => void, list: DBList, index: number, dropDisabled: boolean }) {
  // array index of the todo selecting for editing
  const [edit, setEdit] = useState<number>();


  const handleNewTodo = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement & { todo: { value: string } };
    await addTodo(list.title, target.todo.value);
    target.reset();
  };

  const handleDelete = async (title: string) => {
    await deleteList(title);
    removeFromListState(list.title)
    toast.success(`Deleted List "${title}"`);
  };



  return (
    <Draggable draggableId={list.title} index={index} >
      {(provided) => (
        <li className="w-1/2 max-w-md min-w-[200px] mx-2"
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div
            className={`flex flex-col h-full ${list.title === "daily" ? "bg-lightOrange" : "bg-smoke"
              } rounded-md px-4 py-2 shadow-lg`}
          >
            <h2 className="text-center my-4 capitalize relative">
              <img src={dragIcon} alt="drag"
                className="absolute top-0 left-0"
                {...provided.dragHandleProps}
              />
              {list.title}
              {/* no delete button for daily list */}
              {list.title !== "daily" && (
                <button
                  className="trigger-time mb-4 absolute top-0 right-0       "
                  onClick={() => handleDelete(list.title)}
                >
                  <img src={deleteIcon} alt="delete list" className="w-6" />
                </button>
              )}
            </h2>

            <Droppable droppableId={list.title} type='todo' isDropDisabled={dropDisabled}>

              {(provided) => (
                <ul className="max-h-[50vh] overflow-y-auto list"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {list.todos.map((todo, todoIndex) => (

                    <Draggable draggableId={todo.content} index={todoIndex} key={todo.content}>
                      {(provided) => (
                        edit === todoIndex ? (
                          <EditTodo
                            list={list}
                            setEdit={setEdit}
                            todo={todo}
                            edit={edit}
                          />
                        ) : (
                          <TodoItem
                            provided={provided}
                            // key={todo.id}
                            index={todoIndex}
                            list={list}
                            setEdit={setEdit}
                            todo={todo}
                          />
                        )
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
            <form onSubmit={handleNewTodo} className="p-0 mt-auto">
              <label>
                <input
                  className="bg-transparent border-b-2 border-black w-5/6 max-w-[10rem] focus:outline-none placeholder-black placeholder-opacity-50"
                  placeholder="Add Item"
                  name="todo"
                />
                <button className="justify-self-end trigger-time">+</button>
              </label>
            </form>
          </div>
        </li>
      )}
    </Draggable>
  );
}
export default List;

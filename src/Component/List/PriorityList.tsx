import { FormEvent, useState } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
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
      <div className=" shadow-lg bg-red rounded-md justify-center align-middle px-4 py-2 lg:py-6">
        {list &&
          <>
            <Droppable droppableId="priority" type='todo'>
              {(provided) => (
                <ul
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {list.todos.map((todo, index) => (


                    edit === index ? (
                      <EditTodo
                        key={todo.content}
                        list={list}
                        setEdit={setEdit}
                        todo={todo}
                        edit={edit}
                      />
                    ) : (
                      <Draggable key={todo.content} draggableId={`${list.title}-${todo.content}`} index={index} isDragDisabled={edit === undefined ? false : true}>
                        {(provided) =>
                          <TodoItem
                            index={index}
                            list={list}
                            setEdit={setEdit}
                            todo={todo}
                            provided={provided}
                          />
                        }
                      </Draggable>
                    )
                  ))}

                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </>
        }
        <form onSubmit={handleNewTodo} className="p-0" >
          <label className="p-2">
            <input
              className="bg-transparent w-5/6 max-w-[6rem] focus:outline-none placeholder-black placeholder-opacity-50"
              placeholder="Add Item"
              name="todo"
            />
            <button className="group-hover/edit:visible"> + </button>

          </label>
        </form>
      </div>
    </div>
  )
}
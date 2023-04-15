import { List } from "../../services/listService";

export default function StaticLists({ lists }: { lists: List[] }) {
  return (
    <ul className="flex flex-wrap gap-2 ">
      {lists?.sort((a, b) => a.order - b.order).map((list) =>
        <li className="m-8" key={list.title}>
          <div className="bg-smoke rounded-md justify-center align-middle px-6 py-2">
            <p className="text-center my-4 capitalize">{list.title}</p>
            <ul>
              {list.todos.map((todo, index) =>
                <li key={index} className="flex max-w-full p-2 rounded-md group/edit hover:bg-white">
                  <input
                    type="checkbox"
                    className="form-checkbox accent-pink-500 mr-2 trigger-time"
                    checked={todo.completed}
                    onChange={() => { }}
                  />
                  <div className="flex justify-between w-full">
                    <span>{todo.content}</span>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </li>
      )}
    </ul>
  )
}
import { List } from "../../services/listService";

/**similar to Lists component but with all the buttons stripped out */
export default function StaticLists({ lists }: { lists: List[] }) {
  return (
    <section className="py-4">
      <ul className="flex gap-4 overflow-x-auto py-4 lists-section px-4">
        {lists.filter(list => list.title !== 'priority').sort((a, b) => a.order - b.order).map((list) =>
          <li key={list.title} className="w-1/2 max-w-md min-w-[200px]">
            <div className={`flex flex-col h-full ${list.title === 'daily' ? 'bg-lightOrange' : 'bg-smoke'} rounded-md px-4 py-2 shadow-lg`}>
              <h2 className="text-center my-4 capitalize">{list.title}</h2>
              <ul className="max-h-[50vh] overflow-y-auto list">
                {list.todos.map((todo, index) =>
                  <li key={index} className={`flex max-w-full p-2 rounded-md group/edit hover:bg-opacity-${list.title !== 'daily' && list.title !== 'priority' ? '75' : '25'} hover:bg-white`}>
                    <input
                      type="checkbox"
                      className="form-checkbox accent-pink-500 mr-2 trigger-time"
                      checked={todo.completed}
                      onChange={() => { }}
                    />
                    <div className="flex justify-between w-full">
                      <span className="break-all">{todo.content}</span>
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </li>
        )}
      </ul>
      <div className='px-4'>
        <p className="my-2 capitalize">Priority list</p>
        <div className=" shadow-lg bg-red rounded-md justify-center align-middle px-4 py-2">
          <ul>
            {lists.find(list => list.title === 'priority')?.todos.map((todo, index) =>
              <li key={index} className={`flex max-w-full p-2 rounded-md group/edit hover:bg-opacity-75 hover:bg-white`}>
                <input
                  type="checkbox"
                  className="form-checkbox accent-pink-500 mr-2 trigger-time"
                  checked={todo.completed}
                  onChange={() => { }}
                />
                <div className="flex justify-between w-full">
                  <span className="break-all">{todo.content}</span>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
    </section>
  )
}
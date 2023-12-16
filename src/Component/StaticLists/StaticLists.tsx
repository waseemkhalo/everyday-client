import { List } from "../../services/listService";

/**similar to Lists component but with all the buttons stripped out */
export default function StaticLists({ lists, listOrder }: { lists: List[], listOrder: string[] }) {
  return (
    <section className="sm:py-4 sm:ml-4 md:ml-16 lg:ml-32">
      <ul className="flex gap-4 py-4 lists-section px-4">
        {lists.filter(list => list.title !== 'priority').sort((a, b) => (
          listOrder ? (listOrder.indexOf(a.title) - listOrder.indexOf(b.title))
            : a.order - b.order
        )).map((list) =>
          <li key={list.title} className="w-1/2 max-w-md min-w-[200px]">
            <div className='list-box'>
              <h2 className="text-center my-4 capitalize">{list.title}</h2>
              <ul className="max-h-[50vh] overflow-y-auto list">
                {list.todos.map((todo, index) =>
                  <li key={index} className={`flex max-w-full p-2 rounded-md group/edit hover:bg-opacity-${list.title !== 'daily' && list.title !== 'priority' ? '75' : '25'} hover:bg-white`}>
                    <input
                      type="checkbox"
                      className="form-checkbox custom-checkbox mr-2 trigger-time"
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
      <div className='sm:pr-4 md:pr-16 lg:pr-32 sm:py-6 lg:py-10'>
        <p className="my-2 capitalize md:font-bold text-white">Priority list</p>
        <div className="priority-box">
          <ul>
            {lists.find(list => list.title === 'priority')?.todos.map((todo, index) =>
              <li key={index} className={`flex max-w-full p-2 rounded-md group/edit hover:bg-opacity-75 hover:bg-white`}>
                <input
                  type="checkbox"
                  className="form-checkbox custom-checkbox mr-2 trigger-time"
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
    </section >
  )
}
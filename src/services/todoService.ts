import { auth } from "../firebase/firebase";

//* TODO object constructor/type definition
export class Todo {
  constructor(content: Todo['content']) {
    this.content = content;
  }
  content: string
  completed: boolean = false;
}

/**
 * @param list title of list to add to
 * @param todo content for new todo
 */
export const addTodo = async (listIndex: number, todo: Todo['content']) => {
  const currentUser = auth.currentUser?.uid
  const newTodo = new Todo(todo)
  if (currentUser) {
    try {

    } catch (e) {
      console.error('error adding new todo: ', e);
    }
  }
}

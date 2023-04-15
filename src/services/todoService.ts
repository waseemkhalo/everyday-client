import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { List } from "./listService";

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
export const addTodo = async (list: List['title'], todo: Todo['content']) => {
  const currentUser = auth.currentUser?.uid
  const newTodo = new Todo(todo)
  if (currentUser && todo) {
    try {
      await updateDoc(doc(db, 'users', currentUser, 'lists', list), {
        todos: arrayUnion({ ...newTodo })
      })
    } catch (e) {
      console.error('error adding new todo: ', e);
    }
  }
}

/**
 * @param list title of list to add to
 * @param todo full todo object to be deleted
 */
export const deleteTodo = async (list: List['title'], todo: Todo) => {
  const currentUser = auth.currentUser?.uid
  if (currentUser) {
    try {
      await updateDoc(doc(db, 'users', currentUser, 'lists', list), {
        todos: arrayRemove(todo)
      })
    } catch (e) {
      console.error('error adding deleting todo: ', e);
    }
  }
}
/**
 * @param list object that the todo is from
 * @param oldTodo object to be edited
 * @param newContent updated todo content
 */
export const editTodo = async (list: List, oldTodo: Todo, newContent: Todo['content']) => {
  const currentUser = auth.currentUser?.uid
  const newTodos = list.todos.map(todo => (todo === oldTodo ? { ...todo, content: newContent } : todo))
  if (currentUser) {
    try {
      await updateDoc(doc(db, 'users', currentUser, 'lists', list.title), {
        todos: newTodos
      })
    } catch (e) {
      console.error('error modifying todo: ', e);
    }
  }
}

/**
 * @param list object that the todo is from
 * @param Oldtodo object to be edited
 */
export const checkTodo = async (list: List, oldTodo: Todo) => {
  const currentUser = auth.currentUser?.uid
  const newTodos = list.todos.map(todo => (todo === oldTodo ? { ...todo, completed: !todo.completed } : todo))
  if (currentUser) {
    try {
      await updateDoc(doc(db, 'users', currentUser, 'lists', list.title), {
        todos: newTodos
      })
    } catch (e) {
      console.error('error modifying todo: ', e);
    }
  }
}
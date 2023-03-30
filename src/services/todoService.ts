import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

//* TODO object constructor/type definition
export class Todo {
  constructor(content: Todo['content']) {
    this.content = content;
  }
  content: string
  completed: boolean = false;
  id: string = ''
}

//* returns a promise of array of all Todo objects
export const getTodos = async (): Promise<Todo[]> => {
  const snapshot = await getDocs(collection(db, "todos"))
  //return snapshot array, mapped as Todo objects
  return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Todo))
}

//* adds a new Todo object to the database.
export const addTodo = async (todo: Todo['content']) => {
  try {
    const col = collection(db, "todos")
    const newTodo = new Todo(todo)
    await addDoc(col,
      (({ id, ...rest }) => rest)(newTodo) //copy newTodo without id
    )
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

//* edit the content of a todo
export const editTodo = async (id: Todo['id'], content: Todo['content']) => {
  try {
    await updateDoc(doc(db, "todos", id), {
      content: content
    });
  } catch (e) {
    console.error("Error updating document: ", e);
  }
}

//* marks todo as complete
export const checkTodo = async (id: Todo['id']) => {
  try {
    await updateDoc(doc(db, "todos", id), {
      completed: true
    });
  } catch (e) {
    console.error("Error updating document: ", e);
  }
}

//* marks todo as incomplete
export const uncheckTodo = async (id: Todo['id']) => {
  try {
    await updateDoc(doc(db, "todos", id), {
      completed: false
    });
  } catch (e) {
    console.error("Error updating document: ", e);
  }
}

//* deletes a todo
export const removeTodo = async (id: Todo['id']) => {
  try {
    await deleteDoc(doc(db, "todos", id));
  } catch (e) {
    console.error("Error deleting document: ", e);
  }
}

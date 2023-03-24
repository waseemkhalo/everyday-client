import { addDoc, collection, doc, getDocs, Timestamp, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

//* TODO object constructor/type definition
export class Todo {
  constructor(content: Todo['content']) {
    this.content = content;
  }
  content: string
  completed: boolean = false;
  timestamp: Timestamp = Timestamp.now()
  id: string = ''
}

//* returns a promise of array of all Todo objects
export const getTodos = async () => {
  const snapshot = await getDocs(collection(firestore, "todos"))
  //return snapshot array, mapped as Todo objects
  return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Todo))
}

//* adds a new Todo object to the database.
export const addTodo = async (todo: Todo['content']) => {
  const newTodo = new Todo(todo)
  try {
    await addDoc(collection(firestore, "todos"),
      (({ id, ...rest }) => rest)(newTodo) //copy newTodo without id
    )
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

//* edit the content of a todo
export const editTodo = async (id: Todo['id'], content: Todo['content']) => {
  try {
    await updateDoc(doc(firestore, "todos", id), {
      content: content
    });
  } catch (e) {
    console.error("Error updating document: ", e);
  }
}

export const removeTodo = (id: Todo['id']) => {

}

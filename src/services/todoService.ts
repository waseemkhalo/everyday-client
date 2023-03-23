import { addDoc, collection, getDocs, Timestamp } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

//* TODO object constructor/type definition
export class Todo {
  constructor(content: string) {
    this.content = content;
  }
  content: string
  completed: boolean = false;
  timestamp: Timestamp = Timestamp.now()
  id?: string
}

//* returns a promise of array of all Todo objects
export const getTodos = async () => {
  const snapshot = await getDocs(collection(firestore, "todos"))
  //return snapshot array, mapped as Todo objects
  return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Todo))
}

//* adds a new Todo object to the database. returns the document reference data from the db
export const addTodo = async (todo: string) => {
  const newTodo = new Todo(todo)
  try {
    const docRef = await addDoc(collection(firestore, "todos"),
      (({ id, ...rest }) => rest)(newTodo) //copy newTodo without id
    )
    return docRef

  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export const editTodo = (id: string) => {

}

export const removeTodo = (id: string) => {

}

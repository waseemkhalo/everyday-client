import { addDoc, collection, getDocs, Timestamp } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

export class Todo {
  constructor(content: string) {
    this.content = content;
  }
  content: string
  completed: boolean = false;
  timestamp: Timestamp = Timestamp.now()
  id?: string
}

export const getTodos = async () => {
  const snapshot = await getDocs(collection(firestore, "todos"))
  return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Todo))
}

export const addTodo = async (todo: string) => {
  const newTodo = new Todo(todo)
  try {
    const docRef = await addDoc(collection(firestore, "todos"),
      (({ id, ...rest }) => rest)(newTodo)
    )
    console.log("new doc added: ", docRef);
    return docRef

  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export const editTodo = (id: string) => {

}

export const removeTodo = (id: string) => {

}

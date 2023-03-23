import { addDoc, collection, getDocs, Timestamp } from "firebase/firestore";
import { firestore } from "../firebase/firebase";


export const getTodos = async () => {
  const snapshot = await getDocs(collection(firestore, "todos"))
  return snapshot.docs.map(doc => doc.data().content)
}

export const addTodo = async (todo: string) => {
  try {
    const docRef = await addDoc(collection(firestore, "todos"), {
      content: todo,
      completed: false,
      timestamp: Timestamp.now()
    });
    console.log("new doc added: ", docRef);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export const editTodo = (id: string) => {

}

export const removeTodo = (id: string) => {

}

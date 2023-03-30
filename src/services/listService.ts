import { arrayUnion, doc, updateDoc } from "@firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { Todo } from "./todoService";

export class List {
  constructor(title: List['title']) {
    this.title = title
  }
  title: string
  todos: Todo[] = []
}

export const addList = async (title: List['title']) => {
  const currentUser = auth.currentUser?.uid
  if (currentUser) {
    try {
      await updateDoc(doc(db, 'users', currentUser), {
        lists: arrayUnion(new List(title))
      })
    } catch (e) {
      console.error('error adding new todo: ', e);
    }
  }
}
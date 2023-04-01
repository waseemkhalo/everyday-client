import { User } from "@firebase/auth";
import { collection, doc, FirestoreDataConverter, getCountFromServer, setDoc, writeBatch } from "@firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { Todo } from "./todoService";

export class List {
  constructor(order: List['order']) {
    this.order = order
  }
  order: number
  todos: Todo[] = []
}

// Firestore data converter for DbUser objects
const listConverter: FirestoreDataConverter<List> = {
  toFirestore: ({ order, todos }) => {
    return {
      order,
      todos
    }
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options)
    return new List(data.order)
  }
}

export const addDefaultLists = async (userId: User['uid']) => {
  const dailyDoc = doc(db, 'users', userId, 'lists', 'daily').withConverter(listConverter)
  const priorityDoc = doc(db, 'users', userId, 'lists', 'priority').withConverter(listConverter)
  try {
    await writeBatch(db)
      .set(dailyDoc, new List(0))
      .set(priorityDoc, new List(0))
      .commit()
  } catch (e) {
    console.error('error adding adding default lists: ', e);
  }
}

export const addList = async (title: string) => {
  const currentUser = auth.currentUser?.uid
  if (currentUser) {
    try {
      const snapshot = await getCountFromServer(collection(db, 'users', currentUser, 'lists'))
      const order = snapshot.data().count
      const listDoc = doc(db, 'users', currentUser, 'lists', title).withConverter(listConverter)
      await setDoc(listDoc, new List(order))
    }

    catch (e) {
      console.error('error adding new todo: ', e);
    }
  }
}

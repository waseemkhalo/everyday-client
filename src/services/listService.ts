import { User } from "@firebase/auth";
import { FirestoreDataConverter, collection, doc, getCountFromServer, getDocs, setDoc, writeBatch } from "@firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { Todo } from "./todoService";

export class List {
  constructor(title: List['title'], order: List['order']) {
    this.title = title
    this.order = order
  }
  title: string
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
    return new List(snapshot.id, data.order)
  }
}

export const addDefaultLists = async (userId: User['uid']) => {
  const dailyDoc = doc(db, 'users', userId, 'lists', 'daily').withConverter(listConverter)
  const priorityDoc = doc(db, 'users', userId, 'lists', 'priority').withConverter(listConverter)
  try {
    await writeBatch(db)
      .set(dailyDoc, new List('daily', 0))
      .set(priorityDoc, new List('priority', 0))
      .commit()
  } catch (e) {
    console.error('error adding adding default lists: ', e);
  }
}

/** @param title title for new list */
export const addList = async (title: List['title']) => {
  const currentUser = auth.currentUser?.uid
  if (currentUser) {
    try {
      const snapshot = await getCountFromServer(collection(db, 'users', currentUser, 'lists'))
      const order = snapshot.data().count - 1
      const listDoc = doc(db, 'users', currentUser, 'lists', title).withConverter(listConverter)
      await setDoc(listDoc, new List(title, order))
    } catch (e) {
      console.error('error adding new todo: ', e);
    }
  }
}

export const getLists = async (): Promise<List[] | undefined> => {
  const currentUser = auth.currentUser?.uid
  if (currentUser) {
    try {
      const snapshot = await getDocs(collection(db, 'users', currentUser, 'lists'))
      return snapshot.docs.map(doc => {
        return { title: doc.id, ...doc.data() }
      }) as List[];
    } catch (e) {
      console.error('error retrieving lists: ', e);
    }
  }
}

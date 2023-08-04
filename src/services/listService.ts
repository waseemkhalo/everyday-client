import { User } from "@firebase/auth";
import { FirestoreDataConverter, arrayRemove, arrayUnion, collection, deleteDoc, doc, getCountFromServer, getDocs, onSnapshot, setDoc, updateDoc, writeBatch } from "@firebase/firestore";
import { Dispatch, SetStateAction } from 'react';
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

/** add write the default lists for a new user. 'daily' and 'priority'
 * @param userId new user's uid
 */
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
  if (currentUser && title) {
    try {
      const snapshot = await getCountFromServer(collection(db, 'users', currentUser, 'lists'))
      //assign order to new list based on number of current lists
      const order = snapshot.data().count - 1
      const listDoc = doc(db, 'users', currentUser, 'lists', title).withConverter(listConverter)
      await setDoc(listDoc, new List(title, order))
      await updateDoc(doc(db, 'users', currentUser), {
        listOrder: arrayUnion(title)
      })
    } catch (e) {
      console.error('error adding new todo: ', e);
    }
  }
}
/**
 * subscribes to the users' lists collection, storing current array in state
 * @param setState setState function to store lists from DB
 */
export const listenToLists = (setState: Dispatch<SetStateAction<List[] | undefined>>) => {
  const currentUser = auth.currentUser?.uid
  if (currentUser) {
    return onSnapshot(collection(db, 'users', currentUser, 'lists'), (snapshot) => {
      setState(snapshot.docs.map(doc => ({ title: doc.id, ...doc.data() } as List)))
    }, e => console.error('error getting lists:', e))
  }
}

/** get lists from db */
export const getLists = async () => {
  const currentUser = auth.currentUser?.uid
  if (currentUser) {
    try {
      const snap = await getDocs(collection(db, 'users', currentUser, 'lists'))
      return snap.docs.map(doc => ({ title: doc.id, ...doc.data() } as List))
    } catch (e) {
      console.error('error deleting list: ', e);
    }
  }
}

/** delete list
 * @param title title of list to be deleted
 */
export const deleteList = async (title: List['title']) => {
  const currentUser = auth.currentUser?.uid
  if (currentUser) {
    try {
      const listDoc = doc(db, 'users', currentUser, 'lists', title)
      await deleteDoc(listDoc)
      await updateDoc(doc(db, 'users', currentUser), {
        listOrder: arrayRemove(title)
      })
    } catch (e) {
      console.error('error deleting list: ', e);
    }
  }
}

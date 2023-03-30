import { User } from "firebase/auth";
import { doc, FirestoreDataConverter, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { Todo } from "./todoService";

export class List {
  constructor(title: List['title']) {
    this.title = title
  }
  title: string
  todos: Todo[] = []
}

export class DbUser {
  preferences: {} = { colors: 'default' }
  lists: List[] = [
    {
      title: 'daily',
      todos: []
    },
    {
      title: 'priority',
      todos: []
    }
  ]
}

// Firestore data converter for DbUser objects
const userConverter: FirestoreDataConverter<DbUser> = {
  toFirestore: ({ preferences, lists }) => {
    return {
      preferences,
      lists
    }
  },
  fromFirestore: (_snapshot) => {
    return new DbUser()
  }
}

/** @param userId User.uid from auth */
export const addUser = async (userId: User['uid']) => {
  try {
    const userDoc = doc(db, "users", userId).withConverter(userConverter)
    await setDoc(userDoc, new DbUser())
  } catch (e) {
    console.log('error adding user: ', e);
  }
}

export const getCurrentUser = async (): Promise<DbUser | undefined> => {
  const currentUser = auth.currentUser?.uid
  if (currentUser) {
    try {
      return (await getDoc(doc(db, 'users', currentUser))).data() as DbUser
    } catch (e) {
      console.log('error retrieving user data: ', e);
    }
  }
}



import { User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { Todo } from "./todoService";

export class List {
  constructor(title: List['title']) {
    this.title = title
  }
  title: string
  todos: Todo[] = []
  order?: number
}

export class DbUser {
  constructor(id: User['uid']) {
    this.id = id
  }
  id: User['uid']
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


/** @param userId User.uid from auth */
export const addUser = async (userId: User['uid']) => {
  const newUser = new DbUser(userId)
  try {
    await setDoc(doc(db, "users", userId),
      (({ id, ...rest }) => rest)(newUser) //copy newUser without id
    )
  } catch (e) {
    console.log('error adding user: ', e);
  }
}



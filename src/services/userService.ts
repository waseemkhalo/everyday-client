import { User } from "firebase/auth";
import { doc, FirestoreDataConverter, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { addDefaultLists } from "./listService";


export class DbUser {
  preferences: {} = { colors: 'default' }
}

// Firestore data converter for DbUser objects
const userConverter: FirestoreDataConverter<DbUser> = {
  toFirestore: ({ preferences }) => {
    return {
      preferences,
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
    await addDefaultLists(userId)
  } catch (e) {
    console.error('error adding user: ', e);
  }
}

export const getCurrentUser = async (): Promise<DbUser | undefined> => {
  const currentUser = auth.currentUser?.uid
  if (currentUser) {
    try {
      return (await getDoc(doc(db, 'users', currentUser))).data() as DbUser
    } catch (e) {
      console.error('error retrieving user data: ', e);
    }
  }
}



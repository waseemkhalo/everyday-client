import { User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { addDefaultLists } from "./listService";

/** @param userId User.uid from auth */
export const addUser = async (userId: User['uid']) => {
  try {
    await addDefaultLists(userId)
    await setDoc(doc(db, 'users', userId), {
      date: new Date().toDateString(),
      number: 1,
      time: new Date().toLocaleTimeString('en-US', { timeStyle: 'short' })
    })

  } catch (e) {
    console.error('error adding user: ', e);
  }
}

import { User } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { addDefaultLists } from "./listService";

/** @param userId User.uid from auth */
export const addUser = async (userId: User['uid']) => {
  try {
    await addDefaultLists(userId)
    await updateDoc(doc(db, 'users', userId), {
      date: new Date().toString(),
      number: 1,
      time: new Date().toLocaleTimeString('en-US', { timeStyle: 'short' })
    })
  } catch (e) {
    console.error('error adding user: ', e);
  }
}

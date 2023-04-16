import { User } from "firebase/auth";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
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

export const updateNotes = async (notes: string | undefined) => {
  const currentUser = auth.currentUser?.uid
  if (currentUser) {
    try {
      updateDoc(doc(db, 'users', currentUser), { notes })
    } catch (e) {
      console.error('error updating notes: ', e);
    }
  }
}

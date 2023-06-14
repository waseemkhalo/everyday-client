import { User } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { List, addDefaultLists } from "./listService";

/** @param userId User.uid from auth */
export const addUser = async (userId: User['uid']) => {
  try {
    await addDefaultLists(userId)
    await setDoc(doc(db, 'users', userId), {
      date: new Date().toDateString(),
      number: 1,
      time: new Date().toLocaleTimeString('en-US', { timeStyle: 'short' }),
      listOrder: ['daily']
    })

  } catch (e) {
    console.error('error adding user: ', e);
  }
}

/** update today's notes on db */
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

/** update today's notes on db */
export const updateListOrder = async (listOrder: List['title'][]) => {
  const currentUser = auth.currentUser?.uid
  if (currentUser) {
    try {
      updateDoc(doc(db, 'users', currentUser), { listOrder })
    } catch (e) {
      console.error('error updating notes: ', e);
    }
  }
}

/**gets list order from db */
export const getListOrder = async () => {
  const currentUser = auth.currentUser?.uid
  if (currentUser) {
    try {
      const snap = await getDoc(doc(db, 'users', currentUser))
      return snap.data()?.listOrder
    } catch (e) {
      console.error('error getting details: ', e);
    }
  }
}
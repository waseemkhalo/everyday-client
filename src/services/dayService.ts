import { addDoc, collection, doc, getDoc, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { GetLists, List } from "./listService";
import { Quote } from "./quoteService";

export class Day {
  constructor(number: Day['number'], date: Day['date'], time: Day['time'], quote: Day['quote'], lists: Day['lists'], notes: Day['notes']) {
    this.number = number;
    this.date = date;
    this.time = time;
    this.quote = quote;
    this.lists = lists;
    this.notes = notes
  }
  number: number
  date: string
  time: string
  quote: Quote
  lists: List[]
  notes: string
}

export interface Today {
  date: string,
  time: string,
  number: number
}

export const addDay = async () => {
  const currentUser = auth.currentUser?.uid
  if (currentUser) {
    try {
      const dayDetails = await getToday()
      const lists = await GetLists()
      await addDoc(collection(db, 'users', currentUser, 'days'), {
        ...dayDetails,
        lists
      })
      return dayDetails
    } catch (e) {
      console.error('error adding day: ', e);
    }
  }
}

export const checkDay = async () => {
  const currentUser = auth.currentUser?.uid
  if (currentUser) {
    try {
      const today = await getDoc(doc(db, 'users', currentUser))
      if (today.data()?.date !== new Date().toDateString()) {
        return true
      }
      return false
    } catch (e) {
      console.error('error checking day: ', e);
    }
  }
}


export const getPreviousDay = async (number: Day['number'] | undefined): Promise<Day | undefined> => {
  const currentUser = auth.currentUser?.uid
  if (currentUser) {
    try {
      if (number) {
        //find the first day whose number is less than the provided number
        const q = query(collection(db, 'users', currentUser, 'days'), where('number', '<', number), orderBy('number', "desc"), limit(1))
        const { docs } = await getDocs(q)
        return docs[0].data() as Day
      }
      const q = query(collection(db, 'users', currentUser, 'days'), orderBy('number', "desc"), limit(1))
      const { docs } = await getDocs(q)
      return docs[0].data() as Day
    } catch (e) {
      console.error('error getting day: ', e);
    }
  }
}
export const getNextDay = async (number: Day['number']): Promise<Day | undefined> => {
  const currentUser = auth.currentUser?.uid
  if (currentUser) {
    try {
      //find the first day whose number is greater than the provided number
      const q = query(collection(db, 'users', currentUser, 'days'), where('number', '>', number), orderBy('number'), limit(1))
      const { docs } = await getDocs(q)
      return docs[0].data() as Day
    } catch (e) {
      console.error('error getting day: ', e);
    }
  }
}

export const getToday = async () => {
  const currentUser = auth.currentUser?.uid
  if (currentUser) {
    try {
      const snap = await getDoc(doc(db, 'users', currentUser))
      return snap.data() as Today
    } catch (e) {
      console.error('error getting details: ', e);
    }
  }
}

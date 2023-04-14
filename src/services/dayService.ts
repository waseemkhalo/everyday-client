import { addDoc, collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { List } from "./listService";
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

export const addDay = async (day: Day) => {
  const currentUser = auth.currentUser?.uid
  if (currentUser) {
    try {
      await addDoc(collection(db, 'users', currentUser, 'days'), {
        ...day
      })
    } catch (e) {
      console.error('error adding day: ', e);
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


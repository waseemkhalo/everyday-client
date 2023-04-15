import { addDoc, collection, doc, getDoc, getDocs, limit, orderBy, query, setDoc, updateDoc, where } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { List, getLists } from "./listService";
import { Quote } from "./quoteService";

export interface Day {
  number: number
  date: string
  time: string
  quote: Quote
  lists: List[]
  notes: string
}

export interface Today {
  date: string
  time: string
  number: number
  notes: string
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

export const updateToday = async (oldDay: Today) => {
  const currentUser = auth.currentUser?.uid
  if (currentUser) {
    try {
      const todayDate = new Date().toDateString()
      const newNumber = Math.round(
        (new Date(todayDate).getTime() - new Date(oldDay.date).getTime())
        / (1000 * 60 * 60 * 24)
      ) + oldDay.number
      await setDoc(doc(db, 'users', currentUser), {
        date: new Date().toDateString(),
        time: '',
        number: newNumber,
        notes: ''
      })
      const lists = await getLists()
      lists?.forEach(list => {
        if (list.title === 'daily') {
          const newTodos = list.todos.map(todo => ({ ...todo, completed: false }))
          updateDoc(doc(db, 'users', currentUser, 'lists', 'daily'), {
            todos: newTodos
          })
        } else {
          const newTodos = list.todos.filter(todo => !todo.completed)
          updateDoc(doc(db, 'users', currentUser, 'lists', list.title), {
            todos: newTodos
          })
        }
      })
    } catch (e) {
      console.error('error updating day: ', e);
    }
  }
}

export const updateTime = async () => {
  const currentUser = auth.currentUser?.uid
  if (currentUser) {
    const newTime = new Date().toLocaleTimeString('en-US', { timeStyle: 'short' })
    try {
      await updateDoc(doc(db, 'users', currentUser), {
        time: newTime
      })
      document.querySelectorAll('[class*="trigger-time"]').forEach(el =>
        el.removeEventListener('click', updateTime)
      )
      return newTime
    } catch (e) {
      console.error('error adding day: ', e);
    }
  }
}

export const addDay = async () => {
  const currentUser = auth.currentUser?.uid
  if (currentUser) {
    try {
      const dayDetails = await getToday()
      if (dayDetails?.time) {
        const lists = await getLists()
        await addDoc(collection(db, 'users', currentUser, 'days'), {
          ...dayDetails,
          lists
        })
      }
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
      if (docs[0])
        return docs[0].data() as Day
    } catch (e) {
      console.error('error getting day: ', e);
    }
  }
}

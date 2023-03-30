import { addDoc, collection, getDocs, query, where } from "@firebase/firestore";
import axios from "axios";
import { db } from "../firebase/firebase";

// todo: if same were to exist twice in db, add new date to date collection

//* quote object type declaration
export interface Quote {
  text: string
  author: string | null
}

/** @param dateString Date().toDateString() */
export const getQuote = async (dateString: string): Promise<Quote | undefined> => {
  try {
    //grab the specified day's quote from db
    const q = query(collection(db, 'quotes'), where("date", "==", dateString))
    const { docs } = await getDocs(q)
    if (docs[0]) {
      const { date, text, author } = docs[0].data()
      if (date && date === new Date().toDateString()) {
        return { text, author }
      }
    }

    //if dates dont match, fetch a new quote and store on db
    const { data: quotes } = await axios.get<Quote[]>("https://type.fit/api/quotes")
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const newQuote = quotes[randomIndex];

    await addDoc(collection(db, "quotes"), {
      text: newQuote.text,
      author: newQuote.author,
      date: new Date().toDateString()
    })
    return newQuote
  } catch (err) {
    console.error(err);
  };
}
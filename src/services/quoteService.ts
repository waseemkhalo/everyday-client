import { addDoc, arrayUnion, collection, doc, getDocs, limit, query, updateDoc, where } from "@firebase/firestore";
import axios from "axios";
import { db } from "../firebase/firebase";

//* quote object type declaration
export interface Quote {
  text: string
  author: string | null
}

/** @param dateString Date().toDateString() */
export const getQuote = async (dateString: string): Promise<Quote | undefined> => {
  try {
    //grab the specified day's quote from db
    const q = query(collection(db, 'quotes'), where("date", "array-contains", dateString), limit(1))
    const { docs } = await getDocs(q)
    if (docs[0]) {
      const { text, author } = docs[0].data()
      return { text, author }
    }

    //if dates don't match, fetch a new quote
    const { data: quotes } = await axios.get<Quote[]>("https://type.fit/api/quotes")
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const newQuote = quotes[randomIndex];
    //check if generated quote already exists in db
    const q2 = query(collection(db, 'quotes'), where("text", "==", newQuote.text), limit(1))
    const data = await getDocs(q2)
    if (data.docs[0]) {
      //if so, add the specified date to its date array
      await updateDoc(doc(db, 'quotes', data.docs[0].id), {
        date: arrayUnion(dateString)
      })
    } else {
      //otherwise, write new quote to db 
      await addDoc(collection(db, "quotes"), {
        text: newQuote.text,
        author: newQuote.author,
        date: arrayUnion(dateString)
      })
    }
    return newQuote
  } catch (err) {
    console.error(err);
  };
}
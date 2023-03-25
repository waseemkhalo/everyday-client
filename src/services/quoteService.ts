import { doc, getDoc, setDoc, Timestamp } from "@firebase/firestore";
import axios from "axios";
import { firestore } from "../firebase/firebase";

//* quote object type declaration
export interface Quote {
  text: string
  author: string | null
}

//* returns a promise of todays quote
export const getQuote = async () => {
  try {
    //grab todays quote from db
    const docSnap = await getDoc(doc(firestore, 'quotes', 'dailyQuote'))
    if (docSnap.exists()) {
      const { text, author, timestamp } = docSnap.data()
      //compare timestamp to local date
      if (timestamp.toDate().getDate() === new Date().getDate()) {
        return { text, author } as Quote
      }
    }

    //if dates dont match, fetch a new quote and store on db
    const { data: quotes } = await axios.get<Quote[]>("https://type.fit/api/quotes")
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const newQuote = quotes[randomIndex];
    console.log(newQuote);

    await setDoc(doc(firestore, "quotes", "dailyQuote"), {
      text: newQuote.text,
      author: newQuote.author,
      timestamp: Timestamp.now()
    })
    return newQuote
  } catch (err) {
    console.error(err);
  };
}
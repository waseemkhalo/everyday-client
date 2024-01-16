import { doc, getDoc} from "firebase/firestore";
import { db } from "../firebase/firebase";


export interface News {
  content: string;
  author: string | null;
  date_created: Date;
  title: string;
  type: string;
}

//get current newsroom details (first two documents in newsroom collection)
/** @param newsId get the news Id */
export const getAllNews = async () => {
  try {
    const snap = await getDoc(doc(db, "newsroom"));
    return snap.data();
  } catch (e) {
    console.error("error getting details: ", e);
  }
};


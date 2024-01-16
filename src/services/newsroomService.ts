import { collection, getDocs } from "firebase/firestore";
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
    const snap = await getDocs(collection(db, "newsroom"));
    const articles: News[] = []; // Initialize an array to store the data

    snap.forEach((doc) => {
      articles.push(doc.data() as News); // Push each document's data into the array
    });

    return articles; // Return the array of articles
  } catch (e) {
    console.error("error getting details: ", e);
    return []; // Return an empty array in case of an error
  }
};

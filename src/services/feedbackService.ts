import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

//class for feedback
export class Feedback {
  constructor(feedback: Feedback["feedback"], survey: Feedback["survey"]) {
    this.survey = survey;
    this.feedback = feedback;
  }
  feedback: string;
  survey: string;
  date: string = new Date().toDateString()
}

//store feedback in firestore

export const addFeedback = async (feedback: Feedback) => {

  try {
    await addDoc(collection(db, "feedback"), {
      ...feedback,
      user: auth.currentUser?.displayName
    });
  } catch (e) {
    console.error("error storing feedback: ", e);
  }
};

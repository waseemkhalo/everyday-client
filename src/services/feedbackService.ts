import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";


//class for feedback
export class Feedback {
    constructor(feedback: Feedback['feedback']) {
        this.survey = false
        this.feedback = feedback
    }
    feedback: string
    survey: boolean
}

//store feedback in firestore 

export const addFeedback = async (feedback: Feedback) => {

    const currentUser = auth.currentUser?.uid

    if (currentUser) {
        try {
        const feedbackDoc = doc(db, 'Feedback')
        await setDoc(feedbackDoc, feedback)
        } catch (e) {
        console.error('error storing feedback: ', e);
        }
    }

}
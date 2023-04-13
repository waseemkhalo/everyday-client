import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";


//class for feedback
export class Feedback {
    constructor(id: Feedback['id'], feedback: Feedback['feedback']) {
        this.id = id
        this.feedback = feedback
    }
    id: string
    feedback: string
}

//store feedback in firestore 

export const storeFeedback = async (feedback: Feedback) => {
    const currentUser = auth.currentUser?.uid
    if (currentUser) {
        try {
        const feedbackDoc = doc(db, 'users', currentUser, 'feedback', feedback.id).withConverter(feedbackConverter)
        await setDoc(feedbackDoc, feedback)
        } catch (e) {
        console.error('error storing feedback: ', e);
        }
    }

}
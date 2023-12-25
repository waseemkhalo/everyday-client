import { setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

export class Reminder {
  constructor(email: Reminder["email"], optIn: Reminder["optIn"]) {
    this.email = email;
    this.optIn = optIn;
  }

  email: string;
  optIn: string;
  date: string = new Date().toDateString();
  time: string = new Date().toTimeString();

  toObject(): Record<string, any> {
    return {
      email: this.email,
      optIn: this.optIn,
      date: this.date,
      time: this.time,
    };
  }
}

/** writes reminder to database with users set settings
 * @param reminder object containing user's reminder settings
 */

export const addReminder = async (reminder: Reminder) => {
  const userId = auth.currentUser?.uid;

  try {
    const reminderRef = db.collection("reminder").doc(userId);

    await setDoc(reminderRef, reminder.toObject(), {
      merge: true,
    });

    // add email to user collection in database - this is for potential future use when creating the profile page/settings
    const userRef = db.collection("users").doc(userId);

    await setDoc(userRef, { email: reminder.email }, { merge: true });


  } catch (e) {
    console.error("error storing reminder: ", e);
  }
};

// remove reminder from database
export const removeReminder = async () => {
  const userId = auth.currentUser?.uid;

  try {
    const reminderRef = db.collection("reminder").doc(userId);

    await reminderRef.delete();
  } catch (e) {
    console.error("error removing reminder: ", e);
  }
};

import { setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

export class Reminder {
  constructor(
    email: Reminder["email"],
    reminderTime: Reminder["reminderTime"]
  ) {
    this.email = email;
    this.reminderTime = reminderTime;
  }

  email: string;
  reminderTime: string;
  date: string = new Date().toDateString();

  toObject(): Record<string, any> {
    return {
      email: this.email,
      reminderTime: this.reminderTime,
      date: this.date,
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
    
  } catch (e) {
    console.error("error storing reminder: ", e);
  }
};

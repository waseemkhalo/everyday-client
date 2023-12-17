import { addDoc, collection } from "firebase/firestore";
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
}

/** writes reminder to database with users set settings
 * @param reminder object containing user's reminder settings
 */

export const addReminder = async (reminder: Reminder) => {
  try {
    const userId = auth.currentUser?.uid;

    await addDoc(collection(db, "reminder"), {
      ...reminder,
      user: userId,
    });

    console.log(addReminder);
    console.log("reminder added");
  } catch (e) {
    console.error("error storing reminder: ", e);
  }
};

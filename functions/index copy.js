const functions = require("firebase-functions");
const admin = require("firebase-admin");
const sgMail = require("@sendgrid/mail");
require("dotenv").config();

// Initialize the Firebase Admin SDK
admin.initializeApp();

// sendgrid config
const sendgridConfig = functions.config().sendgrid;
const API_KEY = sendgridConfig.key;
// const TEMPLATE_ID = sendgridConfig.template;

if (sendgridConfig && API_KEY) {
  sgMail.setApiKey(API_KEY);
} else {
  console.error("SendGrid API key is undefined. Check your Firebase config.");
}

// sendgrid email template

exports.sendR = functions.pubsub.schedule("every 1 hour").onRun(async () => {
  // const getCurrentTime = () => {
  //   const now = new Date(); // Get the current date
  //   return now.getHours() + ":" + now.getMinutes();
  // };

  const testTime = "5:00";


  // const currentTime = getCurrentTime();
  const remindersSnap = await admin.firestore().collection("reminder").get();

  remindersSnap.forEach((doc) => {
    const reminder = doc.data();
    if (reminder.reminderTime === testTime) {
      const msg = {
        to: reminder.email,
        from: "waseemkhalo@gmail.com",
        subject: "Reminder",
        text: "Reminder",
        // templateId: TEMPLATE_ID,
      };
      sgMail.send(msg).then(() => {
        console.log("Reminder email sent");
      }).catch((error) => {
        console.error("Error sending email:", error);
      });
    }
  });
});

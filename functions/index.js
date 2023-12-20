const functions = require("firebase-functions");
const admin = require("firebase-admin");
const sgMail = require("@sendgrid/mail");
require("dotenv").config();

// Initialize the Firebase Admin SDK
admin.initializeApp();

// sendgrid config
const sendgrid = functions.config().sendgrid;
const API_KEY = sendgrid.key;
const TEMPLATE_ID = sendgrid.template;

if (API_KEY) {
  sgMail.setApiKey(API_KEY);
} else {
  console.error("API_KEY is undefined");
}

// sendgrid email template

exports.sendR = functions.pubsub.schedule("every 1 minutes").onRun(async () => {
  const getCurrentTime = () => {
    const now = new Date(); // Get the current date
    return now.getHours() + ":" + now.getMinutes();
  };

  const currentTime = getCurrentTime();
  const remindersSnap = await admin.firestore().collection("reminder").get();

  remindersSnap.forEach((doc) => {
    const reminder = doc.data();
    if (reminder.time === currentTime) {
      const msg = {
        to: reminder.email,
        from: "waseemkhalo@gmail.com",
        templateId: TEMPLATE_ID,
      };
      sgMail.send(msg).then(() => {
        console.log("Reminder email sent");
      }).catch((error) => {
        console.error("Error sending email:", error);
      });
    }
  });
});

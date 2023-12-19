require("dotenv").config();
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const sgMail = require("@sendgrid/mail");

// Initialize the Firebase Admin SDK
admin.initializeApp();

const sgAPIKEY = process.env.SENDGRID_API_KEY;

// Initialize SendGrid with your API key
sgMail.setApiKey(sgAPIKEY);

exports.sendReminderEmail = functions.firestore
    .document("reminder/{reminderId}")
    .onCreate((snapshot, context) => {
    // Retrieve the reminder data from the snapshot
      const reminder = snapshot.data();

      // Create an email message
      const msg = {
        to: reminder.email,
        from: "waseemkhalo@gmail.com",
        subject: "Reminder",
        text: `Don't forget: ${reminder.reminderTime}`,
      };

      // Send the email using SendGrid
      return sgMail
          .send(msg)
          .then(() => console.log("Reminder email sent"))
          .catch((error) => console.error("Error sending email:", error));
    });

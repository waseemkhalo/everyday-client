// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const functions = require("firebase-functions");

const sendgridConfig = functions.config().sendgrid;
const API_KEY = sendgridConfig.key;

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(API_KEY);

// if (!API_KEY) {
//   console.error("SendGrid API key is not configured");
//   throw new Error("SendGrid API key not found in function config");
// }


exports.sendEmail = functions.https.onRequest((req, res) => {
  const msg = {
    to: "waseemkhalo@gmail.com", // Change to your recipient
    from: "waseemkhalo@gmail.com", // Change to your verified sender
    subject: "Sending with SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  };
  sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        console.error(error);
      });
});


// test function to add numbers together
exports.addNumbers = functions.https.onRequest((req, res) => {
  const num1 = req.body.num1;
  const num2 = req.body.num2;
  const total = num1 + num2;
  res.send(total.toString());
});


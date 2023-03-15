const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const port = 3000;

// Using the Twilio credentials
const client = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

app.post("/send-lyrics", (req, res) => {
  const lyrics = req.body.lyrics;
  const toNumber = req.body.toNumber;

  client.messages
    .create({
      body: lyrics,
      to: toNumber,
      from: process.env.TWILIO_PHONE_NUMBER,
    })
    .then((message) => {
      console.log("SMS sent successfully:", message.sid);
      res.send("Lyrics shared successfully!");
    })
    .catch((err) => {
      console.error("Error sending SMS:", err);
      res.status(500).send("Error sharing lyrics!");
    });
});

app.use(bodyParser.urlencoded({ extended: false }));

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

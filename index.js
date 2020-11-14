// secret stuff
require("dotenv").config();

const twilio = require("twilio");
const schedule = require("node-schedule");

// twilio credentials
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

// phone numbers
const tedsNumber = process.env.TEDS_NUMBER;
const myTwillioNumber = process.env.MY_NUMBER;

// create twilio object
const client = new twilio(accountSid, authToken);

// create message
const message = (message) => {
    client.messages
        .create({
            body: message,
            to: tedsNumber,
            from: myTwillioNumber,
        })
        .then((message) => console.log(message.body));
};

// set chase date
const chaseDate = new schedule.RecurrenceRule();
chaseDate.date = 20;

// schedule cahse
const chaseBill = schedule.scheduleJob(chaseDate, function () {
    message("Your chase bill is up tonight!");
});

// set citi date
const citiDate = new schedule.RecurrenceRule();
citiDate.date = 14;

// schedule cahse
const citiBill = schedule.scheduleJob(citiDate, function () {
    message("Your citi bill is up tonight!");
});

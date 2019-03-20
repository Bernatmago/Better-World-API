//const cred = require('./credentials');
// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'BetterWorld: Your verification code is XXXXX',
     from: process.env.FROM_PHONE,
     to: process.env.TEST_PHONE
   })
  .then(message => console.log(message.sid));
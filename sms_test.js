const cred = require('./credentials');
// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure
const accountSid = cred.twilio.accountSid;
const authToken = cred.twilio.authToken;
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'BetterWorld: Your verification code is XXXXX',
     from: cred.twilio.fromPhone,
     to: cred.twilio.testPhone
   })
  .then(message => console.log(message.sid));
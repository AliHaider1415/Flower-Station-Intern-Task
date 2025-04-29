const fs = require('fs');
const path = require('path');
const cron = require('node-cron');
const nodemailer = require('nodemailer');
require('dotenv').config();

const DATA_FILE = path.join(__dirname, 'reminders.json');

// Email setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Run daily at 9 AM
cron.schedule('0 9 * * *', () => {
  console.log('Running daily reminder check...');

  if (!fs.existsSync(DATA_FILE)) return;

  const data = JSON.parse(fs.readFileSync(DATA_FILE));
  const today = new Date().toISOString().split('T')[0];

  data.forEach((reminder) => {
    if (reminder.eventDate === today) {
      const mailOptions = {
        from: process.env.EMAIL,
        to: reminder.customerEmail,
        subject: `Reminder: ${reminder.eventName} is Today!`,
        text: `Hi there! This is a reminder for your ${reminder.eventType || reminder.otherType} event: "${reminder.eventName}".`,
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error(`Failed to send email to ${reminder.customerEmail}:`, err);
        } else {
          console.log(`Email sent to ${reminder.customerEmail}:`, info.response);
        }
      });
    }
  });
});

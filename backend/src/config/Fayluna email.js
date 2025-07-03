// config/email.js

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,           // e.g., 'smtp.gmail.com'
  port: process.env.EMAIL_PORT,           // e.g., 587
  secure: process.env.EMAIL_SECURE === 'true',  // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,         // your email address
    pass: process.env.EMAIL_PASSWORD,     // your email password or app password
  },
});

// Verify connection configuration (optional)
transporter.verify(function (error, success) {
  if (error) {
    console.error('Email transporter verification failed:', error);
  } else {
    console.log('Email transporter is ready');
  }
});

module.exports = transporter;

// services/emailService.js

import nodemailer from 'nodemailer';

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_PORT === '465', // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Send email function
export const sendEmail = async ({ to, subject, html, text }) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'noreply@fayluna.com',
      to,
      subject,
      html,
      text: text || html.replace(/<[^>]*>/g, ''), // Strip HTML tags for text version
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: %s', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email sending failed:', error);
    throw new Error('Failed to send email');
  }
};

// Specific email functions
export const sendVerificationEmail = async (email, verificationToken) => {
  const verificationUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/verify-email?token=${verificationToken}`;
  
  return sendEmail({
    to: email,
    subject: 'Verify Your Email - Fayluna Platform',
    html: `
      <h1>Welcome to Fayluna Platform!</h1>
      <p>Please verify your email address by clicking the link below:</p>
      <a href="${verificationUrl}">Verify Email</a>
      <p>If you didn't create an account, please ignore this email.</p>
    `
  });
};

export const sendPasswordResetEmail = async (email, resetToken) => {
  const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;
  
  return sendEmail({
    to: email,
    subject: 'Password Reset Request - Fayluna Platform',
    html: `
      <h1>Password Reset Request</h1>
      <p>You requested a password reset. Click the link below to reset your password:</p>
      <a href="${resetUrl}">Reset Password</a>
      <p>This link will expire in 1 hour.</p>
      <p>If you didn't request this, please ignore this email.</p>
    `
  });
};

export const sendNotificationEmail = async (email, subject, message) => {
  return sendEmail({
    to: email,
    subject,
    html: `
      <h1>${subject}</h1>
      <p>${message}</p>
    `
  });
};

export default {
  sendEmail,
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendNotificationEmail,
};

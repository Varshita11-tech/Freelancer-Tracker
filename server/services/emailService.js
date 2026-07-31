const nodemailer = require('nodemailer');

/**
 * Creates a reusable Nodemailer transporter using SMTP credentials
 * defined in the environment variables.
 */
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: Number(process.env.EMAIL_PORT) === 465,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

/**
 * Generic send mail wrapper.
 */
const sendEmail = async ({ to, subject, html, text }) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: process.env.EMAIL_FROM || `Freelancer Tracker <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
    text,
  };

  return transporter.sendMail(mailOptions);
};

/**
 * Welcome email sent right after successful signup.
 */
const sendWelcomeEmail = async (user) => {
  const subject = 'Welcome to Freelancer Tracker!';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
      <h2>Welcome, ${user.fullName}!</h2>
      <p>Thanks for signing up for Freelancer Tracker. You can now start managing your
      clients, projects, and payments all in one place.</p>
      <p>Happy tracking!</p>
      <p>— The Freelancer Tracker Team</p>
    </div>
  `;
  return sendEmail({ to: user.email, subject, html });
};

/**
 * Password reset email containing a time-limited reset link.
 */
const sendPasswordResetEmail = async (user, resetToken) => {
  const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
  const subject = 'Password Reset Request - Freelancer Tracker';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
      <h2>Password Reset</h2>
      <p>Hi ${user.fullName},</p>
      <p>You requested a password reset. Click the link below to set a new password.
      This link will expire in 10 minutes.</p>
      <p><a href="${resetUrl}" target="_blank">${resetUrl}</a></p>
      <p>If you did not request this, please ignore this email.</p>
    </div>
  `;
  return sendEmail({ to: user.email, subject, html });
};

module.exports = { sendEmail, sendWelcomeEmail, sendPasswordResetEmail };

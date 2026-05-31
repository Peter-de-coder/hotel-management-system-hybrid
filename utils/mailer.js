import axios from "axios";
import nodemailer from "nodemailer";
import { Room } from "../models/room.model.js";
import { config } from "./config.js";

// Keep a fallback transporter for Gmail SMTP
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendBookingEmail = async (booking, paymentData = null) => {
  try {
    // 1. Fetch Room Code / Type
    let roomCode = "N/A";
    let roomType = "N/A";
    let room = null;

    if (booking.roomId) {
      if (typeof booking.roomId === "object" && booking.roomId.roomCode) {
        roomCode = booking.roomId.roomCode;
        roomType = booking.roomId.roomType || "N/A";
      } else {
        const roomId = booking.roomId._id || booking.roomId;
        room = await Room.findById(roomId);
        if (room) {
          roomCode = room.roomCode;
          roomType = room.roomType;
        }
      }
    }

    // 2. Format dates using UTC to prevent timezone shifts
    const dateOptions = { weekday: "short", year: "numeric", month: "short", day: "numeric", timeZone: "UTC" };
    const checkInDate = new Date(booking.checkIn).toLocaleDateString("en-US", dateOptions);
    const checkOutDate = new Date(booking.checkOut).toLocaleDateString("en-US", dateOptions);

    // Fetch fresh booking status from DB to prevent race conditions and double-sending
    const { Booking } = await import("../models/booking.model.js");
    const freshBooking = await Booking.findById(booking._id);
    if (!freshBooking) {
      console.log(`ℹ️ Booking ${booking._id} not found in DB. Skipping email.`);
      return;
    }
    if (freshBooking.isEmailSent) {
      console.log(`ℹ️ Booking ${booking._id} email has already been sent. Skipping duplicate email.`);
      return;
    }

    // 3. Check if booking is confirmed
    const isConfirmed = freshBooking.bookingStatus === "Confirmed";

    // The email should be sent ONLY after the booking status has been confirmed
    if (!isConfirmed) {
      console.log(`ℹ️ Booking ${booking._id} is not yet confirmed. Skipping email sending.`);
      return;
    }

    // Paid/Confirmed Email
    const ref = paymentData?.reference || `MAN-${booking._id.toString().slice(-8).toUpperCase()}`;
    const channel = paymentData?.channel || "Manual Admin Confirmation";
    const bank = paymentData?.authorization?.bank || paymentData?.authorization?.card_type || "N/A";
    const last4 = paymentData?.authorization?.last4 ? `**** **** **** ${paymentData.authorization.last4}` : "N/A";
    const paidAt = paymentData?.paid_at ? new Date(paymentData.paid_at).toLocaleString() : new Date().toLocaleString();

    const receiptHtml = `
      <div style="margin-top: 25px; padding: 20px; border: 2px dashed #464a7c; background-color: #fcfcfc; border-radius: 8px; font-family: monospace;">
        <h3 style="color: #464a7c; border-bottom: 1px solid #eee; padding-bottom: 8px; margin-top: 0;">PAYMENT DEBIT RECEIPT</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
          <tr>
            <td style="padding: 4px 0; color: #666;">Transaction Ref:</td>
            <td style="padding: 4px 0; font-weight: bold; text-align: right;">${ref}</td>
          </tr>
          <tr>
            <td style="padding: 4px 0; color: #666;">Payment Channel:</td>
            <td style="padding: 4px 0; font-weight: bold; text-align: right; text-transform: capitalize;">${channel}</td>
          </tr>
          <tr>
            <td style="padding: 4px 0; color: #666;">Bank / Card Type:</td>
            <td style="padding: 4px 0; font-weight: bold; text-align: right;">${bank}</td>
          </tr>
          ${paymentData?.authorization?.last4 ? `
          <tr>
            <td style="padding: 4px 0; color: #666;">Card Number:</td>
            <td style="padding: 4px 0; font-weight: bold; text-align: right;">${last4}</td>
          </tr>
          ` : ""}
          <tr>
            <td style="padding: 4px 0; color: #666;">Status:</td>
            <td style="padding: 4px 0; font-weight: bold; text-align: right; color: green;">SUCCESSFUL</td>
          </tr>
          <tr>
            <td style="padding: 4px 0; color: #666;">Paid At:</td>
            <td style="padding: 4px 0; font-weight: bold; text-align: right;">${paidAt}</td>
          </tr>
          <tr>
            <td style="padding: 4px 0; color: #666;">Room Name:</td>
            <td style="padding: 4px 0; font-weight: bold; text-align: right;">${roomCode} (${roomType})</td>
          </tr>
          <tr>
            <td style="padding: 4px 0; color: #666;">Room Number:</td>
            <td style="padding: 4px 0; font-weight: bold; text-align: right;">${booking.roomNumber || roomCode}</td>
          </tr>
          <tr style="border-top: 1px solid #ddd;">
            <td style="padding: 8px 0 0 0; font-weight: bold; color: #333; font-size: 14px;">Total Charged:</td>
            <td style="padding: 8px 0 0 0; font-weight: bold; text-align: right; color: #464a7c; font-size: 16px;">₦${booking.totalAmount.toLocaleString()}</td>
          </tr>
        </table>
      </div>
    `;

    const emailSubject = `Booking Confirmed for Room ${booking.roomNumber || roomCode} ✅`;
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
        <div style="background-color: #464a7c; padding: 25px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 24px;">Booking Confirmed</h1>
          <p style="margin: 5px 0 0 0; font-size: 14px; opacity: 0.9;">Thank you for choosing Hybrid Hotel & Suites</p>
        </div>
        
        <div style="padding: 25px; background-color: #ffffff;">
          <p>Hello <strong>${booking.guestName}</strong>,</p>
          <p>Your reservation is successfully processed and confirmed. Here are your booking details:</p>
 
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0; background-color: #f9f9f9; border-radius: 6px; overflow: hidden;">
            <tr style="border-bottom: 1px solid #eeeeee;">
              <td style="padding: 12px; font-weight: bold; color: #555;">Booking ID:</td>
              <td style="padding: 12px;">${booking._id}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eeeeee;">
              <td style="padding: 12px; font-weight: bold; color: #555;">Room Number:</td>
              <td style="padding: 12px; font-weight: bold; color: #464a7c;">${booking.roomNumber || roomCode} (${roomType})</td>
            </tr>
            <tr style="border-bottom: 1px solid #eeeeee;">
              <td style="padding: 12px; font-weight: bold; color: #555;">Check-in:</td>
              <td style="padding: 12px;">${checkInDate} (after 2:00 PM)</td>
            </tr>
            <tr style="border-bottom: 1px solid #eeeeee;">
              <td style="padding: 12px; font-weight: bold; color: #555;">Check-out:</td>
              <td style="padding: 12px;">${checkOutDate} (before 12:00 PM)</td>
            </tr>
            <tr>
              <td style="padding: 12px; font-weight: bold; color: #555;">Guest Contacts:</td>
              <td style="padding: 12px;">${booking.guestPhone} | ${booking.guestEmail}</td>
            </tr>
          </table>

          ${receiptHtml}

          <div style="margin-top: 30px; text-align: center; font-size: 13px; color: #888;">
            <p>For any changes or inquiries, please contact our support at <a href="mailto:support@hybridhotel.com" style="color: #464a7c; text-decoration: none;">support@hybridhotel.com</a></p>
            <p style="margin-top: 15px;">© 2026 Hybrid Hotel & Suites. All rights reserved.</p>
          </div>
        </div>
      </div>
    `;

    // 1. Try Brevo Transactional Email API first
    if (config.BREVO_SMTP_KEY) {
      try {
        const senderEmail = config.BREVO_SENDER || config.BREVO_SMTP_USER || "hotelmanagementsystem73@gmail.com";
        const endpoint = "https://api.brevo.com/v3/smtp/email";
        const data = {
          sender: { name: "Hybrid Hotel & Suites", email: senderEmail },
          to: [{ email: booking.guestEmail, name: booking.guestName }],
          subject: emailSubject,
          htmlContent: emailHtml,
        };

        const response = await axios.post(endpoint, data, {
          headers: {
            "api-key": config.BREVO_SMTP_KEY,
            "content-type": "application/json",
            "accept": "application/json",
          },
          timeout: 10000,
        });

        console.log("📨 Booking email sent successfully via Brevo API:", response.data.messageId || response.data);
        await Booking.findByIdAndUpdate(booking._id, { isEmailSent: true });
        return;
      } catch (brevoErr) {
        const errMsg = brevoErr.response ? JSON.stringify(brevoErr.response.data) : brevoErr.message;
        console.warn("⚠️ Brevo API delivery failed, falling back to Gmail SMTP:", errMsg);
      }
    }

    // 2. Fallback to Gmail SMTP
    const gmailConfigured = process.env.EMAIL_USER && process.env.EMAIL_PASS;
    if (gmailConfigured) {
      const mailOptions = {
        from: `"Hybrid Hotel & Suites" <${process.env.EMAIL_USER}>`,
        to: booking.guestEmail,
        subject: emailSubject,
        html: emailHtml,
      };

      const info = await transporter.sendMail(mailOptions);
      console.log("📨 Booking email sent successfully via Gmail SMTP:", info.messageId || info);
      await Booking.findByIdAndUpdate(booking._id, { isEmailSent: true });
      return;
    }

    // 3. Fallback to dry-run console-logging
    console.warn("⚠️ Neither Brevo nor Gmail SMTP configurations are defined. Logging email details to console (dry-run):");
    console.log(`========================================`);
    console.log(`To:      ${booking.guestEmail}`);
    console.log(`Subject: ${emailSubject}`);
    console.log(`----------------------------------------`);
    console.log(`Summary of Booking Details:`);
    console.log(`- Guest:   ${booking.guestName}`);
    console.log(`- Phone:   ${booking.guestPhone}`);
    console.log(`- Room No: ${booking.roomNumber || roomCode}`);
    console.log(`- Dates:   ${checkInDate} to ${checkOutDate}`);
    console.log(`- Total:   ₦${booking.totalAmount.toLocaleString()}`);
    console.log(`- Status:  CONFIRMED & PAID ✅`);
    console.log(`========================================`);
    await Booking.findByIdAndUpdate(booking._id, { isEmailSent: true });

  } catch (err) {
    console.error("❌ Failed to send booking email:", err.message);
  }
};

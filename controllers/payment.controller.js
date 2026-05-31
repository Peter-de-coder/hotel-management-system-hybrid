import axios from "axios";
import crypto from "crypto";
import { Booking } from "../models/booking.model.js";
import { Room } from "../models/room.model.js";
import { config } from "../utils/config.js";
import { sendBookingEmail } from "../utils/mailer.js";

export const PaymentController = {
  initializePayment: async (req, res, next) => {
    try {
      const { bookingId } = req.body;

      const booking = await Booking.findById(bookingId);

      if (!booking) {
        return res.status(404).json({
          success: false,
          message: "Booking not found",
        });
      }

      const room = await Room.findById(booking.roomId);
      const roomName = room ? `${room.roomCode} (${room.roomType})` : "N/A";
      const roomNumber = booking.roomNumber || (room ? room.roomCode : "N/A");

      const response = await axios.post(
        "https://api.paystack.co/transaction/initialize",
        {
          email: booking.guestEmail,
          amount: booking.totalAmount * 100, // kobo
          metadata: {
            bookingId: booking._id.toString(),
            custom_fields: [
              {
                display_name: "Room Name",
                variable_name: "room_name",
                value: roomName,
              },
              {
                display_name: "Room Number",
                variable_name: "room_number",
                value: roomNumber,
              },
            ],
          },
        },
        {
          headers: {
            Authorization: `Bearer ${config.PAYSTACK_SECRET_KEY}`,
            "Content-Type": "application/json",
          },
        },
      );

      return res.json({
        success: true,
        message: "Payment initialized",
        authorization_url: response.data.data.authorization_url,
        reference: response.data.data.reference,
      });
    } catch (err) {
      next(err);
    }
  },
  verifyPayment: async (req, res, next) => {
    try {
      const { reference } = req.body;

      const response = await axios.get(
        `https://api.paystack.co/transaction/verify/${reference}`,
        {
          headers: {
            Authorization: `Bearer ${config.PAYSTACK_SECRET_KEY}`,
          },
        },
      );

      const data = response.data.data;

      if (data.status !== "success") {
        return res.status(400).json({
          success: false,
          message: "Payment failed",
        });
      }

      const bookingId = data.metadata.bookingId;

      const booking = await Booking.findById(bookingId);

      if (!booking) {
        return res.status(404).json({
          message: "Booking not found",
        });
      }

      // prevent double update
      if (booking.paymentStatus === "Paid") {
        return res.json({
          success: true,
          message: "Already verified",
        });
      }

      const room = await Room.findById(booking.roomId);
      booking.roomNumber = room ? room.roomCode : "N/A";
      booking.paymentStatus = "Paid";
      booking.bookingStatus = "Confirmed";

      await booking.save();
      await sendBookingEmail(booking, data);
      return res.json({
        success: true,
        message: "Payment verified",
        data: booking,
      });
    } catch (err) {
      next(err);
    }
  },
  paystackWebhook: async (req, res) => {
    try {
      const hash = crypto
        .createHmac("sha512", config.PAYSTACK_SECRET_KEY)
        .update(req.body) // req.body is the raw buffer
        .digest("hex");

      const signature = req.headers["x-paystack-signature"];

      if (hash !== signature) {
        console.error("❌ Paystack webhook signature verification failed");
        return res.sendStatus(400);
      }

      // Parse raw buffer to JSON object
      const event = JSON.parse(req.body.toString("utf8"));

      if (event.event === "charge.success") {
        const data = event.data;

        const bookingId = data.metadata.bookingId;

        const booking = await Booking.findById(bookingId);

        if (!booking) {
          console.error(`❌ Webhook: Booking not found for ID: ${bookingId}`);
          return res.sendStatus(404);
        }

        if (booking.paymentStatus === "Paid") {
          return res.sendStatus(200);
        }

        const room = await Room.findById(booking.roomId);
        booking.roomNumber = room ? room.roomCode : "N/A";
        booking.paymentStatus = "Paid";
        booking.bookingStatus = "Confirmed";

        await booking.save();
        console.log(`✅ Webhook: Booking ${bookingId} marked as Paid/Confirmed for room ${booking.roomNumber}`);

        await sendBookingEmail(booking, data);
      }

      res.sendStatus(200);
    } catch (err) {
      console.error("❌ Error in Paystack Webhook handler:", err);
      res.sendStatus(500);
    }
  },
};

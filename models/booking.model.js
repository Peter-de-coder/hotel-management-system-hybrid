import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    guestName: {
      type: String,
      required: true,
    },
    guestEmail: {
      type: String,
      required: true,
    },
    guestPhone: {
      type: String,
      required: true,
    },
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    hotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    checkIn: {
      type: Date,
      required: true,
    },
    checkOut: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return value > this.checkIn;
        },
        message: "Check-out must be after check-in",
      },
    },
    guests: {
      adult: {
        type: Number,
        default: 2,
        min: 1,
        max: [3, "Not More than 3 individuals"],
      },
      children: {
        type: Number,
        default: 2,
        min: 0,
      },
    },

    bookingStatus: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled", "CheckedOut"],
      default: "Pending",
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed", "Cancelled"],
      default: "Pending",
    },

    roomNumber: {
      type: String,
    },

    isEmailSent: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);
export const Booking = mongoose.model("Booking", BookingSchema);

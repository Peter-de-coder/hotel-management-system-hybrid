import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    hotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: [true, "The hotel id is required"],
    },
    roomCode: {
      type: String,
      unique: true,
      uppercase: true,
      required: [true, "The room code is required"],
    },
    roomType: {
      type: String,
      enum: ["Single", "Double", "Suite"],
      required: [true, "The room type is required"],
    },

    basePrice: {
      type: Number,
      required: [true, "The base price is required"],
      min: 0,
    },
    capacity: {
      adult: {
        type: Number,
        default: 2,
        min: 1,
      },
      children: {
        type: Number,
        default: 2,
        min: 0,
      },
      maxOccupancy: {
        type: Number,
        required: [true, "The Max occupancy field is required"],
      },
    },
    bedSetup: {
      type: [String],
    },
    images: {
      type: [String],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    desc: {
      type: String,
      required: [true, "Description is required"],
    },
  },
  { timestamps: true },
);

export const Room = mongoose.model("Room", roomSchema);

import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "The Name of the hotel is required"],
    },
    desc: {
      type: String,
      required: [true, "The Description of the hotel is required"],
    },
    images: {
      type: [String],
    },
    amenities: {
      type: [String],
      required: [true, "The Amenities field is required"],
    },
  },
  {
    timestamps: true,
  },
);
export const Hotel = mongoose.model("Hotel", hotelSchema);

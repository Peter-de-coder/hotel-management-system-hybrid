import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    subject: {
      type: String,
    },
    message: {
      type: String,
      required: [true, "Message is required"],
    },
    category: {
      type: String,
      enum: ["General", "Suggestion", "Complaint", "Support"],
      default: "General",
    },
    rating: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["Pending", "Reviewed", "Resolved"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

export const Feedback = mongoose.model("Feedback", feedbackSchema);

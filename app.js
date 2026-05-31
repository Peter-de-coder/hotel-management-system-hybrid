import express from "express";
import { errorMiddleware } from "./utils/middlewares/error.middleware.js";
import hotelRoute from "./routes/hotel.route.js";
import bookRoute from "./routes/booking.route.js";
import roomRoute from "./routes/room.route.js";
import cors from "cors";
import authRoute from "./routes/auth.route.js";
import paymentRoute from "./routes/payment.route.js";
import feedbackRoute from "./routes/feedback.route.js";

export const app = express();
const corsOptions = {
  origin: "*",
  credentials: true,
};

app.use(cors(corsOptions));
app.use("/payment/webhook", express.raw({ type: "application/json" }));

app.use(express.json());

app.get("/health-check", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is live",
  });
});

app.use("/hotel", hotelRoute);
app.use("/rooms", roomRoute);
app.use("/booking", bookRoute);
app.use("/auth", authRoute);
app.use("/payment", paymentRoute);
app.use("/feedback", feedbackRoute);

app.use((_req, res) => {
  res.status(404).json({
    statusCode: 404,
    success: false,
    message: "No route found",
  });
});

app.use(errorMiddleware);

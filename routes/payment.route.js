import express from "express";
import { PaymentController } from "../controllers/payment.controller.js";

const route = express.Router();

route.post("/initialize", PaymentController.initializePayment);
route.post("/verify", PaymentController.verifyPayment);
route.post("/webhook", PaymentController.paystackWebhook);
export default route;

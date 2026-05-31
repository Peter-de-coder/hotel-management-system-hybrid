import express from "express";
import { BookingController } from "../controllers/booking.controller.js";

const route = express.Router();

route.get("/", BookingController.findAll);
route.post("/room-available", BookingController.getAvailableRooms);
route.post("/", BookingController.createBooking);
route.get("/:id", BookingController.findById);
route.delete("/:id", BookingController.deleteById);
route.patch("/:id", BookingController.updateById);

export default route;

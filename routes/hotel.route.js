import express from "express";
import { HotelControllers } from "../controllers/hotel.controller.js";

const route = express.Router();

route.get("/", HotelControllers.getAllHotels);
route.post("/", HotelControllers.createHotel);
route.get("/:id", HotelControllers.getHotelById);
route.put("/:id", HotelControllers.updateHotelById);
route.delete("/:id", HotelControllers.deleteHotelById);

export default route;

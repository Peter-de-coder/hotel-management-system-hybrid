import express from "express";
import {RoomController} from "../controllers/room.controller.js";

const route = express.Router();

route.get("/", RoomController.findAll);
route.post("/", RoomController.create);
route.get("/:id", RoomController.findById);
route.put("/:id", RoomController.findByIdAndUpdate);
route.delete("/:id", RoomController.findByIdAndDelete);

export default route;

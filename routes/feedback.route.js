import express from "express";
import { FeedbackControllers } from "../controllers/feedback.controller.js";

const route = express.Router();

route.get("/", FeedbackControllers.getAllFeedbacks);
route.post("/", FeedbackControllers.createFeedback);
route.put("/:id", FeedbackControllers.updateFeedbackById);
route.delete("/:id", FeedbackControllers.deleteFeedbackById);

export default route;

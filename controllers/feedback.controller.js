import { feedbackServices } from "../services/feedback.service.js";

export const FeedbackControllers = {
  getAllFeedbacks: async (_req, res, next) => {
    try {
      const feedbacks = await feedbackServices.findAll();
      return res.status(200).json({
        success: true,
        total: feedbacks.length,
        data: feedbacks,
      });
    } catch (error) {
      next(error);
    }
  },

  createFeedback: async (req, res, next) => {
    try {
      const { name, email, subject, message, category, rating } = req.body;
      const feedback = await feedbackServices.create({ name, email, subject, message, category, rating });
      return res.status(201).json({
        success: true,
        data: feedback,
      });
    } catch (error) {
      next(error);
    }
  },

  updateFeedbackById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const feedback = await feedbackServices.update(id, req.body);
      return res.status(200).json({
        success: true,
        message: "Updated successfully",
        data: feedback,
      });
    } catch (error) {
      next(error);
    }
  },

  deleteFeedbackById: async (req, res, next) => {
    try {
      const { id } = req.params;
      await feedbackServices.delete(id);
      return res.status(200).json({
        success: true,
        message: "Deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  },
};

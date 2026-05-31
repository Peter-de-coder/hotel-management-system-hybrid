import { FeedbackRepository } from "../repositories/feedback.repository.js";

export const feedbackServices = {
  findAll: async () => {
    return await FeedbackRepository.findAll();
  },

  create: async (data) => {
    if (!data.name || !data.email || !data.message) {
      throw new Error("Name, email, and message are required fields");
    }
    return await FeedbackRepository.create(data);
  },

  update: async (id, data) => {
    if (!id) {
      throw new Error("Feedback ID is required");
    }
    return await FeedbackRepository.updateById(id, data);
  },

  delete: async (id) => {
    if (!id) {
      throw new Error("Feedback ID is required");
    }
    return await FeedbackRepository.deleteById(id);
  },
};

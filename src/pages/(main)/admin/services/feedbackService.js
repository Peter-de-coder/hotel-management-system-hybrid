import { Axios } from "@/lib/axios";

export const FeedbackService = {
  getFeedbacks: async () => {
    try {
      const response = await Axios.get("/feedback");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  deleteFeedback: async (id) => {
    try {
      const response = await Axios.delete(`/feedback/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  updateFeedback: async (id, data) => {
    try {
      const response = await Axios.put(`/feedback/${id}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  createFeedback: async (data) => {
    try {
      const response = await Axios.post("/feedback", data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

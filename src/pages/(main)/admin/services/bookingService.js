import { Axios } from "@/lib/axios";

export const BookingService = {
  getBookings: async () => {
    try {
      const response = await Axios.get("/booking");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  deleteBooking: async (id) => {
    try {
      const response = await Axios.delete(`/booking/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  updateBooking: async (id, data) => {
    try {
      const response = await Axios.patch(`/booking/${id}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

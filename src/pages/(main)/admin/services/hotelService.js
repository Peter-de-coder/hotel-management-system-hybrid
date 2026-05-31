import { Axios } from "@/lib/axios";

export const HotelService = {
  getHotel: async () => {
    try {
      const res = await Axios.get("/hotel");
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  create: async (data) => {
    try {
      const res = await Axios.post("/hotel", data);
      return res.data;
    } catch (error) {
      throw error;
    }
  },  
};

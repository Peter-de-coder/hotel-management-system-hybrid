import { Axios } from "@/lib/axios";

export const RoomService = {
  getRooms: async () => {
    try {
      const data = await Axios.get("/rooms");
      return data.data;
    } catch (error) {
      throw error;
    }
  },
  getAvailableRooms: async (date) => {
    try {
      const response = await Axios.post("/booking/room-available", date);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  createRoom: async (data) => {
    try {
      const res = await Axios.post("/rooms", data);
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  getRoomById: async (id) => {
    try {
      const res = await Axios.get(`/rooms/${id}`);
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  updateRoom: async (id, data) => {
    try {
      const res = await Axios.put(`/rooms/${id}`, data);
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  deleteRoom: async (id) => {
    try {
      const res = await Axios.delete(`/rooms/${id}`);
      return res.data;
    } catch (error) {
      throw error;
    }
  },
};

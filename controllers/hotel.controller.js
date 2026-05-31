import { hotelServices } from "../services/hotel.service.js";

export const HotelControllers = {
  getAllHotels: async (_req, res, next) => {
    try {
      const hotels = await hotelServices.findAll();
      return res.status(200).json({
        success: true,
        total: hotels.length,
        data: hotels,
      });
    } catch (error) {
      next(error);
    }
  },
  getHotelById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const hotel = await hotelServices.findByid(id);
      console.log(hotel);

      return res.status(200).json({
        success: true,
        data: hotel,
      });
    } catch (error) {
      next(error);
    }
  },
  updateHotelById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const hotel = await hotelServices.findByIdAndUpdate(id, req.body);
      return res.status(200).json({
        success: true,
        message: "Updated successfully",
        data: hotel,
      });
    } catch (error) {
      next(error);
    }
  },
  createHotel: async (req, res, next) => {
    try {
      const { name, desc, amenities } = req.body;

      const hotel = await hotelServices.create({ name, desc, amenities });
      return res.status(201).json({
        success: true,
        data: hotel,
      });
    } catch (error) {
      next(error);
    }
  },

  deleteHotelById: async (req, res, next) => {
    try {
      const { id } = req.params;
      await hotelServices.findByIdAndDelete(id);
      return res.status(200).json({
        success: true,
        message: "Deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  },
};

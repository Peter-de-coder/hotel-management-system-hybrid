import { BookingServices } from "../services/booking.service.js";

export const BookingController = {
  findAll: async (_req, res, next) => {
    try {
      let data = await BookingServices.findAll();
      res.status(200).json({
        success: true,
        total: data.length,
        data,
      });
    } catch (error) {
      next(error);
    }
  },

  createBooking: async (req, res, next) => {
    try {
      const data = req.body;

      const booking = await BookingServices.create(data);

      return res.status(201).json({
        success: true,
        message: "Booking created",
        data: booking,
      });
    } catch (err) {
      next(err);
    }
  },

  getAvailableRooms: async (req, res, next) => {
    try {
      const { checkIn, checkOut } = req.body;

      if (!checkIn || !checkOut) {
        return res.status(400).json({
          success: false,
          message: "checkIn and checkOut are required",
        });
      }
      if (new Date(checkOut) <= new Date(checkIn)) {
        return res.status(400).json({
          success: false,
          message: "Check-out date must be at least one day after Check-in",
        });
      }

      const rooms = await BookingServices.getAvailableRooms(checkIn, checkOut);

      return res.status(200).json({
        success: true,
        total: rooms.length,
        data: rooms,
      });
    } catch (err) {
      next(err);
    }
  },
  findById: async (req, res, next) => {
    try {
      const query = await BookingServices.findById(req.params.id);
      return res.status(200).json({
        success: true,
        data: query,
      });
    } catch (error) {
      next(error);
    }
  },

  deleteById: async (req, res, next) => {
    try {
      const query = await BookingServices.deleteById(req.params.id);
      return res.status(200).json({
        success: true,
        message: "Booking deleted successfully",
        data: query,
      });
    } catch (error) {
      next(error);
    }
  },

  updateById: async (req, res, next) => {
    try {
      const data = await BookingServices.updateById(req.params.id, req.body);
      return res.status(200).json({
        success: true,
        message: "Booking updated successfully",
        data,
      });
    } catch (error) {
      next(error);
    }
  },
};

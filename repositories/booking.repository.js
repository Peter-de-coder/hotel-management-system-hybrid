import { Booking } from "../models/booking.model.js";
export const BookingRepository = {
  findConflictBookings: async (checkin, checkOut, roomId = null) => {
    const query = {
      bookingStatus: { $nin: ["Cancelled", "CheckedOut"] },
      checkIn: { $lt: new Date(checkOut) },
      checkOut: { $gt: new Date(checkin) },
    };

    if (roomId) {
      query.roomId = roomId;
    }
    return Booking.find(query, {}, null).select("roomId");
  },
  create: async (data) => {
    return await new Booking(data).save();
  },
  getAll: async () => {
    return await Booking.find({}, {}, null)
      .populate("roomId")
      .populate("hotelId")
      .exec();
  },
  findById: async (id) => {
    return await Booking.findById(id, {}, null)
      .populate("roomId")
      .populate("hotelId")
      .exec();
  },

  deleteById: async (id) => {
    return await Booking.findByIdAndDelete(id, null);
  },

  updateById: async (id, data) => {
    return await Booking.findByIdAndUpdate(id, data, { new: true })
      .populate("roomId")
      .populate("hotelId")
      .exec();
  },
};

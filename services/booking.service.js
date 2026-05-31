import { Room } from "../models/room.model.js";
import { BookingRepository } from "../repositories/booking.repository.js";
import { RoomRepository } from "../repositories/room.repository.js";
import { sendBookingEmail } from "../utils/mailer.js";

export const BookingServices = {
  findAll: async () => {
    return await BookingRepository.getAll();
  },
  create: async (data) => {
    const { checkIn, checkOut, roomId, guests } = data;

    const conflict = await BookingRepository.findConflictBookings(
      checkIn,
      checkOut,
      roomId,
    );
    const room = await Room.findById(roomId);

    if (!room) {
      throw new Error("The requested room does not exist.");
    }
    const totalGuests = guests.adult;
    if (totalGuests > room.capacity.maxOccupancy) {
      throw new Error(
        `This room only allows ${room.capacity.maxOccupancy} guests total.`,
      );
    }
    const nights = Math.ceil(
      (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24),
    );
    if (nights <= 0)
      throw new Error("Check-out must be at least one day after check-in");

    const finalAmount = room.basePrice * nights;

    if (!room) {
      throw new Error("The requested room does not exist.");
      return;
    }

    if (conflict.length > 0) {
      throw new Error("This room is already booked for the selected dates. Please select another room.");
    }

    const booking = await BookingRepository.create({
      ...data,
      totalAmount: finalAmount,
      bookingStatus: "Pending",
      paymentStatus: "Pending",
    });

    // Send confirmation email (non-blocking — won't fail the booking if email fails)
    sendBookingEmail(booking).catch((err) =>
      console.error("Failed to send booking email:", err.message),
    );

    return booking;
  },
  getAvailableRooms: async (checkIn, checkOut) => {
    // 1. find conflicting bookings
    const conflicts = await BookingRepository.findConflictBookings(
      checkIn,
      checkOut,
    );

    // 2. extract roomIds
    const bookedRoomIds = conflicts.map((b) => b.roomId);

    // 3. get available rooms
    return RoomRepository.findAvailableRooms(bookedRoomIds);
  },

  deleteById: async (id) => {
    if (!id) {
      throw new Error("Id is needed");
    }
    const query = await BookingRepository.deleteById(id);

    if (!query) {
      throw new Error("Booking id is invalid");
    }

    return query;
  },

  findById: async (id) => {
    if (!id) {
      throw new Error("Id is needed");
    }
    return await BookingRepository.findById(id);
  },

  updateById: async (id, data) => {
    if (!id) {
      throw new Error("Id is needed");
    }

    const booking = await BookingRepository.findById(id);
    if (!booking) {
      throw new Error("Booking not found");
    }

    if (
      (data.bookingStatus === "Confirmed" && booking.bookingStatus !== "Confirmed") ||
      (data.paymentStatus === "Paid" && !booking.roomNumber)
    ) {
      if (!booking.roomNumber) {
        const room = await Room.findById(booking.roomId);
        data.roomNumber = room ? room.roomCode : "N/A";
      }
    }

    const updatedBooking = await BookingRepository.updateById(id, data);

    const bookingConfirmed = data.bookingStatus === "Confirmed" && booking.bookingStatus !== "Confirmed";

    if (bookingConfirmed) {
      sendBookingEmail(updatedBooking).catch((err) =>
        console.error("Failed to send booking email:", err.message)
      );
    }

    return updatedBooking;
  },
};

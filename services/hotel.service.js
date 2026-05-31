import { Hotel } from "../models/hotel.model.js";
import { HotelRepository } from "../repositories/hotel.repository.js";

export const hotelServices = {
  findAll: async () => {
    return await HotelRepository.findAll();
  },

  findByid: async (id) => {
    const hotel = HotelRepository.findById(id);
    if (!hotel) {
      throw new Error("Hotel not found");
    }
    return hotel;
  },

  create: async (data) => {
    if (!data) {
      throw new Error("All fields are expected");
    }
    const existingHotel = await Hotel.findOne({ name: data.name });
    if (existingHotel) {
      throw new Error("An Hotel with that name already exists!!!");
    }
      return HotelRepository.create(data);

  },

  findByIdAndUpdate: async (id, data) => {
    if (!id) {
      throw new Error("Id is needed");
    }
    const hotelAvail = await Hotel.findById(id);
    if (!hotelAvail) {
      throw new Error("No hotel with the ID found");
    }

    return HotelRepository.updateById(id, data);
  },

  findByIdAndDelete: async (id) => {
    if (!id) {
      throw new Error("Id is needed");
    }
    const hotelAvail = await Hotel.findById(id).exec();
    if (!hotelAvail) {
      throw new Error("No hotel with the ID found");
    }
      return HotelRepository.deleteById(id);

  },
};

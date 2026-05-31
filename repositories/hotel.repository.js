import { Hotel } from "../models/hotel.model.js";

export const HotelRepository = {
  findAll: () => {
    return Hotel.find({}, {}, null).exec();
  },
  findById: (id) => {
    return Hotel.findById(id, {}, null).exec();
  },
  create: (data) => {
    return new Hotel(data).save();
  },
  updateById: (id, data) => {
    return Hotel.findByIdAndUpdate(id, data, null ).exec();
  },
  deleteById: (id) => {
    return Hotel.findByIdAndDelete(id, null);
  },
};

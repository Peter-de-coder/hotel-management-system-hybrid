import { Room } from "../models/room.model.js";

// room.repository.js
export const RoomRepository = {
  findAvailableRooms: async (excludedRoomIds) => {
    return Room.find({ _id: { $nin: excludedRoomIds } }, {}, null);
  },

  findAll: async () => {
    return Room.find({}, {}, null);
  },

  findById: async (id) => {
    return Room.findById(id, {}, null);
  },

  create: async (data) => {
    return new Room(data).save();
  },
  findByIdAndUpdate: async (id, data) => {
    return Room.findByIdAndUpdate(id, data, null).exec();
  },

  findByIdAndDelete: async (id) => {
    return Room.findByIdAndDelete(id, null);
  },
};

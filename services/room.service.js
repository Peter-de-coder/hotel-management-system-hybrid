import {RoomRepository} from "../repositories/room.repository.js";

export const RoomService = {
    createRoom: async (data) => {
        const { adult, children, maxOccupancy } = data.capacity || {};
        const {hotelId, roomCode, roomType, basePrice, bedSetup, desc} = data

        if (!hotelId || !roomCode || !roomType || !basePrice || !maxOccupancy || !desc) {
            throw new Error("Missing required fields: Please check hotelId, roomCode, price, occupancy, and description.");
        }

        if (!bedSetup || bedSetup.length === 0) {
            throw new Error("At least one bed setup must be provided.");
        }
        if ((adult || 0) + (children || 0) > maxOccupancy) {
            throw new Error("The number of adults and children exceeds max occupancy.");
        }
        if (maxOccupancy <= 0) {
            throw new Error("Max Occupancy must be greater than 0");
        }
        return await RoomRepository.create(data)
    },

    
    /**
     * @returns {Promise<Array>}
     */
    findAll: async () => {
        return await RoomRepository.findAll()
    },
    findById: async (id) => {
        const room = await RoomRepository.findById(id);
        if (!room) {
            throw new Error("Room not found with the provided ID");
        }
        return room;
    },
    findByIdAndUpdate: async (id, data) => {
        const room = await RoomRepository.findById(id);
        if (!room) {
            throw new Error("Cannot update: Room not found");
        }
        return await RoomRepository.findByIdAndUpdate(id, data);

    },
    findByIdAndDelete: async (id) => {
        const room = await RoomRepository.findById(id);
        if (!room) {
            throw new Error("Cannot delete: Room not found");
        }
        return await RoomRepository.findByIdAndDelete(id);

    }
}
import {RoomService} from "../services/room.service.js";

export const RoomController = {
    findAll: async (req, res, next) => {
        try {
            const rooms = await RoomService.findAll();
            return res.status(200).json({
                success: true,
                total: rooms.length,
                data: rooms,
            });
        } catch (error) {
            next(error);
        }
    },
    create: async (req, res, next) => {
        try {
            const room = await RoomService.createRoom(req.body);
            return res.status(201).json({
                success: true,
                data: room,
            });
        } catch (error) {
            next(error);
        }
    },
    findById: async (req, res, next) => {
        try {
            const {id} = req.params
            const room = await RoomService.findById(id);
            return res.status(200).json({
                success: true,
                data: room,
            })
        } catch (error) {
            next(error)
        }
    },
    findByIdAndUpdate: async (req, res, next) => {
        try {
            const {id} = req.params
            await RoomService.findByIdAndUpdate(id, req.body, {})
            return res.status(200).json({
                success: true,
                message: "Updated room successfully!!",
            })

        } catch (error) {
            next(error);
        }
    },
    findByIdAndDelete: async (req, res, next) => {
        try {
            const {id} = req.params
            await RoomService.findByIdAndDelete(id)
            return res.status(200).json({
                success: true,
                message: "Deleted room successfully!!",
            })

        } catch (error) {
            next(error);
        }
    }

}
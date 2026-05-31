import mongoose from "mongoose";
import {config} from "./config.js";
import {errorAuditEmitter} from "./loggers/error.js";
import {auditEmitter} from "./loggers/message.js";
import {Hotel} from "../models/hotel.model.js";
import {Room} from "../models/room.model.js";

export const configureDb = async () => {
  try {
    await mongoose.connect(config.DB_URI);
    auditEmitter.emit("log", {
      type: "INFO",
      message: "Database connected Successfully ",
    });

    // Seed default hotel and rooms if empty
    const hotelCount = await Hotel.countDocuments();
    let hotelId;
    if (hotelCount === 0) {
      const defaultHotel = await Hotel.create({
        name: "Hybrid Hotel & Suites",
        desc: "Experience unparalleled comfort and first-class services at Hybrid Hotel & Suites.",
        amenities: ["WiFi", "Pool", "Gym", "Lounge"],
        images: ["/logo.png"]
      });
      hotelId = defaultHotel._id;
      console.log("Seeded default hotel:", defaultHotel.name);
    } else {
      const hotel = await Hotel.findOne();
      hotelId = hotel._id;
    }

    const roomCount = await Room.countDocuments();
    if (roomCount === 0) {
      await Room.create([
        {
          hotelId,
          roomCode: "HARMONY DELUXE",
          roomType: "Suite",
          basePrice: 45000,
          capacity: { adult: 2, children: 2, maxOccupancy: 4 },
          bedSetup: ["1 King Bed"],
          images: ["/room1.webp"],
          desc: "Harmony Deluxe Room - Elegant suite featuring a spacious seating area, high-end comfort, and curated amenities."
        },
        {
          hotelId,
          roomCode: "HARMONY HOMELAND",
          roomType: "Suite",
          basePrice: 35000,
          capacity: { adult: 2, children: 1, maxOccupancy: 3 },
          bedSetup: ["1 Queen Bed"],
          images: ["/room2.webp"],
          desc: "Harmony Homeland Room - A cozy home-away-from-home ambiance with modern conveniences and local flair."
        },
        {
          hotelId,
          roomCode: "HARMONY EXECUTIVE",
          roomType: "Suite",
          basePrice: 55000,
          capacity: { adult: 2, children: 2, maxOccupancy: 5 },
          bedSetup: ["1 King Bed", "1 Sofa Bed"],
          images: ["/room3.webp"],
          desc: "Harmony Executive Room - Premium suite tailored for business and high-end travelers with working desk and panoramic views."
        }
      ]);
      console.log("Seeded rooms: Harmony Deluxe, Harmony Homeland, Harmony Executive");
    }
  } catch (error) {
    await errorAuditEmitter.emit("error", {
      type: "ERROR",
      message: error instanceof Error ? error.message : String(error),
    });
  }
};

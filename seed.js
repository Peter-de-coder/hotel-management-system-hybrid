import mongoose from "mongoose";
import { config } from "./utils/config.js";
import { Hotel } from "./models/hotel.model.js";
import { Room } from "./models/room.model.js";

const seed = async () => {
  try {
    await mongoose.connect(config.DB_URI);
    console.log("Connected to database for seeding...");

    // Clear existing
    await Hotel.deleteMany({});
    await Room.deleteMany({});
    console.log("Cleared existing hotels and rooms.");

    const hotel = await Hotel.create({
      name: "Hybrid Hotel & Suites",
      desc: "Experience unparalleled comfort and first-class services at Hybrid Hotel & Suites.",
      amenities: ["WiFi", "Pool", "Gym", "Lounge"],
      images: ["/logo.png"]
    });
    console.log("Created hotel:", hotel.name);

    const rooms = await Room.create([
      {
        hotelId: hotel._id,
        roomCode: "HARMONY DELUXE",
        roomType: "Suite",
        basePrice: 45000,
        capacity: { adult: 2, children: 2, maxOccupancy: 4 },
        bedSetup: ["1 King Bed"],
        images: ["/room1.webp"],
        desc: "Harmony Deluxe Room - Elegant suite featuring a spacious seating area, high-end comfort, and curated amenities."
      },
      {
        hotelId: hotel._id,
        roomCode: "HARMONY HOMELAND",
        roomType: "Suite",
        basePrice: 35000,
        capacity: { adult: 2, children: 1, maxOccupancy: 3 },
        bedSetup: ["1 Queen Bed"],
        images: ["/room2.webp"],
        desc: "Harmony Homeland Room - A cozy home-away-from-home ambiance with modern conveniences and local flair."
      },
      {
        hotelId: hotel._id,
        roomCode: "HARMONY EXECUTIVE",
        roomType: "Suite",
        basePrice: 55000,
        capacity: { adult: 2, children: 2, maxOccupancy: 5 },
        bedSetup: ["1 King Bed", "1 Sofa Bed"],
        images: ["/room3.webp"],
        desc: "Harmony Executive Room - Premium suite tailored for business and high-end travelers with working desk and panoramic views."
      }
    ]);
    console.log(`Seeded ${rooms.length} rooms successfully!`);
    process.exit(0);
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
};

seed();

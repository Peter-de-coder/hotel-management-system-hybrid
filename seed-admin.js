import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const seedAdmin = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/hotel");
    console.log("Connected to MongoDB for admin seeding...");

    // Check if admin already exists
    const existingAdmin = await mongoose.connection.db.collection("auths").findOne({ email: "admin@hotel.com" });
    if (existingAdmin) {
      console.log("Admin account (admin@hotel.com) already exists!");
      process.exit(0);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("adminpassword", salt);

    await mongoose.connection.db.collection("auths").insertOne({
      name: "Admin User",
      email: "admin@hotel.com",
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    console.log("Default admin account seeded successfully!");
    console.log("Email: admin@hotel.com");
    console.log("Password: adminpassword");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding admin:", error);
    process.exit(1);
  }
};

seedAdmin();

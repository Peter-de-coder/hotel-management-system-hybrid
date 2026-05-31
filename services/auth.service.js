import { authRepository } from "../repositories/auth.repository.js";
import { Auth } from "../models/auth.model.js";
import bcrypt from "bcryptjs";
import { config } from "dotenv";
import { authMiddleware } from "../utils/middlewares/auth.middleware.js";

export const AuthServices = {
  create: async (data) => {
    const { email, name, password } = data;
    if (!email || !name || !password) {
      throw new Error("Please input all fields");
    }
    //check if user exists
    const exists = await Auth.findOne({ email });
    if (exists) {
      throw new Error("User already Exists");
    }

    return authRepository.create({
      name,
      email,
      password: await authMiddleware.hashPassword(password),
    });
  },
  getUser: async (data) => {
    const { email, password } = data;
    if (!email || !password) throw new Error("Please input all fields");

    const user = await authRepository.getUser(email);
    if (!user) throw new Error("Incorrect Credentials");

    const match = await bcrypt.compare(password, user.password); 
    if (!match) throw new Error("Incorrect Credentials");

    const token = await authMiddleware.payload(user); // generates JWT
    return token;
  },
};

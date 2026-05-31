import { Auth } from "../../models/auth.model.js";
import bcrypt from "bcryptjs";
import { authRepository } from "../../repositories/auth.repository.js";
import jwt from "jsonwebtoken";
import { config } from "../config.js";

export const authMiddleware = {
  hashPassword: async (password) => {
    //hash password
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  },
  payload: async (user) => {
    const token = jwt.sign(
      { email: user.email, name: user.name },
      config.JWT_SECRET,
      { expiresIn: "2d" },
    );
    return token;
  },
};

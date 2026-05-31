import express from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { authMiddleware } from "../utils/middlewares/auth.middleware.js";

const authRoute = express.Router();

authRoute.post("/signup", AuthController.signUp);
authRoute.post("/signin", AuthController.signIn);

export default authRoute;

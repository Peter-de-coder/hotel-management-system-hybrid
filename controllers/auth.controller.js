import { AuthServices } from "../services/auth.service.js";

export const AuthController = {
  signUp: async (req, res, next) => {
    try {
      const data = req.body;

      const auth = await AuthServices.create(data);

      return res.status(201).json({
        success: true,
        message: "User created Successfully",
        data: auth,
      });
    } catch (error) {
      next(error);
    }
  },
  signIn: async (req, res, next) => {
    try {
      const data = req.body;

      const token = await AuthServices.getUser(data);
      if (token) {
        res.status(200).json({
          success: true,
          data: token,
        });
      }
    } catch (error) {
      next(error);
    }
  },
};

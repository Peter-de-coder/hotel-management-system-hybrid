import { Auth } from "../models/auth.model.js";

export const authRepository = {
  create: async (data) => {
    return await new Auth(data).save();
  },
  getUser: async (email) => {
    return await Auth.findOne({ email });
  },
};

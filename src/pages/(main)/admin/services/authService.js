import { Axios } from "@/lib/axios";
import { toast } from "react-toastify";

export const AuthService = {
  loginUser: async (dispatch, credentials) => {
    dispatch({ type: "LOGIN_START" });

    try {
      const res = await Axios.post("/auth/signin", credentials);
      const data = res.data.data;

      localStorage.setItem("token", data);
      toast.success("Login Success");
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { token: data },
      });
      window.location.replace("/admin/dashboard");
    } catch (err) {
      const message = err.response?.data?.message || "Something went wrong";

      dispatch({
        type: "LOGIN_ERROR",
        payload: message,
      });

      toast.error(message);
    }
  },
  logoutUser: (dispatch) => {
    localStorage.removeItem("token");
    toast.success("Logout Success");
    dispatch({
      type: "LOGOUT",
    });
    window.location.replace("/admin/auth/signin");
  },
  registerUser: async (userData) => {
    try {
      const res = await Axios.post("/auth/signup", userData);
      return res.data;
    } catch (err) {
      throw err;
    }
  },
};

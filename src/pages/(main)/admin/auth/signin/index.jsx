import React, { useContext, useState } from "react";
import Logo from "@/components/header/Logo";
import { images } from "@/utils/images";
import MainBtn from "@/components/buttons/MainBtn";
import { AuthContext } from "@/hooks/AuthContext";
import { AuthService } from "../../services/authService";

const Signin = () => {
  const { dispatch, loading } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      alert("Please fill in both email and password.");
      return;
    }
    AuthService.loginUser(dispatch, form);
  };

  return (
    <section className="flex not-md:flex-col w-full justify-center md:justify-between h-screen bg-gray-50">
      <div className="md:w-[50%] w-full flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="flex items-center flex-col justify-center gap-6">
            <div className="flex items-center justify-center gap-4">
              <Logo src={images.Logo} />
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold uppercase text-black/80 font-poppins">
                Welcome Back, Admin
              </h2>
              <p className="text-sm text-gray-500 mt-2">
                Please enter your credentials to access the dashboard.
              </p>
            </div>
            <form
              className="flex flex-col w-full mt-4 space-y-4"
              onSubmit={handleSubmit}
            >
              <div className="w-full flex flex-col">
                <label htmlFor="email" className="text-xs font-semibold text-gray-600 uppercase mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(event) =>
                    setForm({ ...form, email: event.target.value })
                  }
                  placeholder="admin@example.com"
                  className="w-full bg-white border border-gray-200 focus:border-main focus:outline-none rounded-xl h-14 px-4 text-sm text-black transition-all"
                />
              </div>

              <div className="w-full flex flex-col">
                <label htmlFor="password" className="text-xs font-semibold text-gray-600 uppercase mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={form.password}
                  onChange={(event) =>
                    setForm({ ...form, password: event.target.value })
                  }
                  placeholder="••••••••"
                  className="w-full bg-white border border-gray-200 focus:border-main focus:outline-none rounded-xl h-14 px-4 text-sm text-black transition-all"
                />
              </div>
              
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-14 bg-main hover:bg-main/90 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all text-sm cursor-pointer flex items-center justify-center"
                >
                  {loading ? "Signing in..." : "Sign In"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="not-md:block hidden signin w-[50%] h-full"></div>
    </section>
  );
};

export default Signin;

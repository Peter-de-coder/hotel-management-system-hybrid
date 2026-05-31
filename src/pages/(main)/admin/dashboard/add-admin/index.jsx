import React, { useState } from "react";
import TopNav from "../_component/TopNav";
import { AuthService } from "../../services/authService";
import { LuLoaderCircle } from "react-icons/lu";

const AddAdmin = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      await AuthService.registerUser(form);
      alert("Admin added successfully!");
      setForm({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.error("Error creating admin:", error);
      alert(error?.response?.data?.message || "Failed to create admin account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <TopNav />
      <section className="rooms px-7 my-7">
        <h2 className="font-semibold uppercase text-main">Add an Admin</h2>

        <form onSubmit={handleSubmit} className="my-7 text-sm max-w-xl">
          <div className="flex flex-col w-full mb-4">
            <label htmlFor="name" className="font-semibold text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="px-3 py-4 border border-gray-200 rounded-md shadow focus:outline-0 bg-white text-black"
              placeholder="e.g. John Doe"
              required
            />
          </div>

          <div className="flex flex-col w-full mb-4">
            <label htmlFor="email" className="font-semibold text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="px-3 py-4 border border-gray-200 rounded-md shadow focus:outline-0 bg-white text-black"
              placeholder="e.g. admin2@gmail.com"
              required
            />
          </div>

          <div className="flex flex-col w-full mb-6">
            <label htmlFor="password" className="font-semibold text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="px-3 py-4 border border-gray-200 rounded-md shadow focus:outline-0 bg-white text-black"
              placeholder="••••••••"
              required
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`bg-main w-38.25 md:w-41.25 h-10.75 text-center flex justify-center items-center text-sm text-white hover:text-main hover:bg-background hover:border-main hover:border rounded-md font-semibold transition-all ease-in-out duration-1000 cursor-pointer`}
            >
              {loading ? (
                <LuLoaderCircle className="animate-spin text-lg" />
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      </section>
    </section>
  );
};

export default AddAdmin;

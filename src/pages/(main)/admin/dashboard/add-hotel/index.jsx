import React, { useState } from "react";
import TopNav from "../_component/TopNav";
import { HotelService } from "../../services/hotelService";

const AddHotel = () => {
  const [form, setForm] = useState({
    name: "",
    desc: "",
    amenities: "",
    images: [],
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: form.name,
      desc: form.desc,
      amenities: form.amenities
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== ""),
      image: "", // Handle files later once JSON works
    };

    try {
      setLoading(true);
      const res = await HotelService.create(payload);
      console.log("Success:", res);
      setLoading(false);
      alert("Hotel created successfully!");
      setForm({
        name: "",
        desc: "",
        amenities: "",
        images: [],
      });
    } catch (error) {
      console.error(error);
      setLoading(false);
      alert(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      const files = e.target.files;
      if (files) {
        setForm((prev) => ({ ...prev, images: Array.from(files) }));
      }
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <section>
      <TopNav />
      <section className="rooms px-7 my-7">
        <h2 className="font-semibold uppercase text-main">Add Hotel</h2>

        <form className="my-7 text-sm" onSubmit={handleSubmit}>
          <div className="flex not-md:flex-col w-full items-center gap-4 my-3">
            <div className="flex flex-col w-full">
              <label htmlFor="name">Name</label>
              <input
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                className=" px-3 py-4 my-4 rounded-md shadow focus:outline-0 bg-white"
                placeholder="Name of the hotel"
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="images">Image</label>
              <input
                name="images"
                type="file"
                multiple
                onChange={handleChange}
                className=" px-3 py-4 my-4 rounded-md shadow focus:outline-0 bg-white"
              />
            </div>
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="amenities">Amenities</label>
            <input
              name="amenities"
              type="text"
              value={form.amenities}
              onChange={handleChange}
              className=" px-3 py-4 my-4 rounded-md shadow focus:outline-0 bg-white"
              placeholder="Amenities (eg Swimming Pool, Roof)"
            />
          </div>

          <div className="w-full">
            <label htmlFor="desc">Description</label>
            <textarea
              name="desc"
              value={form.desc}
              className="w-full px-3 py-4 my-4 rounded-md shadow focus:outline-0 bg-white"
              rows={10}
              onChange={handleChange}
            ></textarea>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`bg-main w-38.25 md:w-41.25 h-10.75 text-center flex justify-center items-center text-sm text-white hover:text-main hover:bg-background hover:border-main hover:border rounded-md font-semibold transition-all ease-in-out duration-1000 cursor-pointer`}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </section>
    </section>
  );
};

export default AddHotel;

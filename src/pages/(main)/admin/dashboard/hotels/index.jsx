import React, { useEffect, useState } from "react";
import TopNav from "../_component/TopNav";
import { Link } from "react-router-dom";
import { HotelService } from "../../services/hotelService";
import { LuLoaderCircle } from "react-icons/lu";

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        setLoading(true);
        const res = await HotelService.getHotel();
        setHotels(res.data || []);
      } catch (err) {
        console.error("API Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHotel();
  }, []);

  return (
    <section>
      <TopNav />
      <section className="rooms px-7 my-7">
        <div className="flex my-7 justify-between items-center">
          <h2 className="font-semibold uppercase text-main">All Hotels</h2>
          <div className="justify-self-end">
            <Link to="/admin/dashboard/add-hotel">
              <button
                className={`bg-main w-38.25 md:w-35.25 h-10.75 text-sm text-white hover:text-main hover:bg-background hover:border-main hover:border rounded-md font-semibold transition-all ease-in-out duration-1000 cursor-pointer`}
              >
                Add Hotel
              </button>
            </Link>
          </div>
        </div>
        <div className="relative overflow-x-auto mb-10 px-3 rounded-xl border border-gray-100 shadow-sm bg-white">
          <div
            className="overflow-y-auto w-full border-collapse"
            style={{ maxHeight: "80vh" }}
          >
            <table className="w-full my-7">
              <thead>
                <tr className="text-left my-2 font-medium border-b border-gray-100">
                  <th className="p-4">Name</th>
                  <th className="p-4">Description</th>
                  <th className="p-4">Amenities</th>
                </tr>
              </thead>
              <tbody className="py-7">
                {loading ? (
                  <tr>
                    <td colSpan={3} className="py-10">
                      <div className="flex justify-center items-center flex-col gap-2">
                        <LuLoaderCircle className="animate-spin text-3xl text-main" />
                        <p className="text-sm text-gray-500">
                          Fetching hotels...
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : hotels.length > 0 ? (
                  hotels.map((hotel) => (
                    <tr
                      key={hotel._id}
                      className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                    >
                      <td className="p-5 font-semibold text-black/80">{hotel.name}</td>
                      <td className="p-5 text-gray-500 text-xs max-w-sm truncate">{hotel.desc || "-"}</td>
                      <td className="p-5">
                        {hotel.amenities?.join(", ") || "-"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="py-10 text-center text-gray-400 italic">
                      No hotels added yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Hotels;

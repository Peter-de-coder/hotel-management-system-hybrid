import { RoomService } from "@/pages/(main)/admin/services/roomService";
import MainBtn from "@/components/buttons/MainBtn";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { LuLoaderCircle } from "react-icons/lu";

const Form = () => {
  const [availableRooms, setAvailableRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [roomCount, setRoomCount] = useState(0);
  const [checkIn, setCheckIn] = useState("2026-05-30");
  const [checkOut, setCheckOut] = useState("2026-05-31");
  const [page, setPage] = useState(1);
  const limit = 8;

  const fetchRooms = async (newPage = 1) => {
    try {
      setLoading(true);
      const rooms = await RoomService.getAvailableRooms({
        checkIn,
        checkOut,
      });

      setAvailableRooms(rooms.data || []);
      setRoomCount(rooms.total || 0);
      setPage(newPage);
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleCheck = async (e) => {
    e.preventDefault();
    if (!checkIn || !checkOut) {
      alert("Please select both check-in and check-out dates");
      return;
    }
    fetchRooms(1);
  };

  const totalPages = Math.ceil(roomCount / limit);
  const paginatedRooms = availableRooms.slice((page - 1) * limit, page * limit);

  return (
    <>
      <section className="flex flex-col items-center my-7">
        <div className="py-8 xl:w-[30%] lg:w-[70%] not-lg:px-5 w-full flex flex-col items-center justify-center gap-3 text-center">
          <h2 className="text-black text-[20px] text-center md:text-[30px] font-bold capitalize font-poppins">
            Check for available rooms
          </h2>
        </div>
        <form className="w-full lg:px-20 md:px-8 px-5 not-md:py-7" onSubmit={handleCheck}>
          <div className="flex not-md:flex-col justify-center gap-8">
            <div className="w-full">
              <label className="text-black/70 text-sm font-semibold" htmlFor="checkIn">
                Check In
              </label>
              <input
                type="date"
                required
                className="w-full shadow-sm h-16 my-3 md:px-7 px-3 text-sm focus:outline-0 bg-white border border-gray-200 rounded-md"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </div>
            <div className="w-full">
              <label className="text-black/70 text-sm font-semibold" htmlFor="checkOut">
                Check Out
              </label>
              <input
                type="date"
                required
                className="w-full shadow-sm h-16 my-3 md:px-7 px-3 text-sm focus:outline-0 bg-white border border-gray-200 rounded-md"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-main w-full h-14 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all text-sm cursor-pointer flex items-center justify-center"
            >
              {loading ? (
                <LuLoaderCircle className="animate-spin flex items-center justify-center" size={24} />
              ) : (
                "Search Available Rooms"
              )}
            </button>
          </div>
        </form>
      </section>

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {paginatedRooms.map((room, key) => (
          <div
            key={key}
            className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col justify-between"
          >
            <div>
              <div className="h-48 overflow-hidden relative bg-main">
                <img
                  src={room.images?.[0] || "/room1.webp"}
                  alt={room.roomCode}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-lg text-black/80 font-poppins">
                    Room {room.roomCode}
                  </h4>
                  <span className="text-xs uppercase font-semibold tracking-wider text-main bg-primary50 px-2.5 py-1 rounded-full">
                    {room.roomType}
                  </span>
                </div>
                <p className="text-gray-500 text-xs mt-3 leading-relaxed">
                  {room.desc || "A beautifully styled room offering maximum comfort, functionality and upscale amenities for your pleasant stay."}
                </p>
                <div className="flex justify-between items-center text-xs text-black/60 mt-4 pt-4 border-t border-gray-50">
                  <p><strong>Beds:</strong> {Array.isArray(room.bedSetup) ? room.bedSetup.join(', ') : room.bedSetup}</p>
                  <p><strong>Capacity:</strong> Max {room.capacity?.maxOccupancy || 3}</p>
                </div>
              </div>
            </div>
            
            <div className="p-6 pt-0 flex justify-between items-center mt-auto">
              <div>
                <p className="text-xs text-gray-400">Price / Night</p>
                <p className="font-extrabold text-main text-lg">₦{room.basePrice.toLocaleString()}</p>
              </div>
              <Link
                to={`/room/${room._id}?checkIn=${checkIn}&checkOut=${checkOut}`}
                className="bg-main text-white px-5 py-2.5 rounded-lg text-xs font-semibold hover:bg-main/90 transition-colors shadow-sm"
              >
                Book Now
              </Link>
            </div>
          </div>
        ))}
      </div>

      {availableRooms.length > 0 && (
        <div className="flex justify-center gap-2 my-10">
          <button
            disabled={page <= 1}
            onClick={() => fetchRooms(page - 1)}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 text-xs font-semibold cursor-pointer"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => fetchRooms(i + 1)}
              className={`px-4 py-2 rounded text-xs font-semibold cursor-pointer ${
                page === i + 1 ? "bg-main text-white" : "bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={page >= totalPages}
            onClick={() => fetchRooms(page + 1)}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 text-xs font-semibold cursor-pointer"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default Form;

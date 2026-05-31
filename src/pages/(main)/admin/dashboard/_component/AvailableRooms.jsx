import React, { useState } from "react";
import { FaRegCalendarCheck } from "react-icons/fa";
import { RoomService } from "../../services/roomService";
import { LuLoaderCircle } from "react-icons/lu";

const AvailableRooms = () => {
  const [availableRooms, setAvailableRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [roomCount, setRoomCount] = useState(0);
  const [checkIn, setCheckIn] = useState("2026-05-30");
  const [checkOut, setCheckOut] = useState("2026-05-31");

  const handleCheck = async (e) => {
    e.preventDefault();
    if (!checkIn || !checkOut) {
      alert("Please select check-in and check-out dates");
      return;
    }
    try {
      setLoading(true);
      const rooms = await RoomService.getAvailableRooms({ checkIn, checkOut });
      setLoading(false);
      setAvailableRooms(rooms.data || []);
      setRoomCount(rooms.total ?? 0);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Something went wrong";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white mx-3 py-3 px-5 rounded-md my-5 text-sm">
      <h3 className={"text-lg font-semibold text-main"}>
        Check Available rooms
      </h3>
      <div className="my-5">
        <form
          className=" flex not-md:flex-col gap-5 items-end justify-between"
          onSubmit={handleCheck}
        >
          <div className="w-full">
            <h2 className={"py-3 text-small"}>Check-in</h2>
            <div className=" px-5 py-5 rounded-md w-full lg:w-[80%] bg-bgDashboard flex items-center gap-3">
              <FaRegCalendarCheck className="text-xl font-light text-aid" />
              <input
                type="date"
                required
                className={"w-full focus:outline-0 bg-transparent"}
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </div>
          </div>

          <div className="w-full">
            <h2 className={"py-3 text-small"}>Check-out</h2>
            <div className=" px-5 py-5 rounded-md w-full lg:w-[80%] bg-bgDashboard flex items-center gap-3">
              <FaRegCalendarCheck className="text-xl Bookingfont-light text-aid" />
              <input
                type="date"
                required
                className={"w-full focus:outline-0 bg-transparent"}
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </div>
          </div>
          <div className="">
            <button
              type="submit"
              disabled={loading}
              className={`bg-main w-38.25 md:w-41.25 h-10.75 text-center flex justify-center items-center text-sm text-white hover:text-main hover:bg-background hover:border-main hover:border rounded-md font-semibold transition-all ease-in-out duration-1000 cursor-pointer`}
            >
              {loading ? (
                <LuLoaderCircle className="animate-spin flex items-center justify-center" />
              ) : (
                "Check Availability"
              )}
            </button>
          </div>
        </form>
      </div>

      <div className="">
        <h2 className={"font-semibold"}>Available Rooms</h2>
        <p className={"py-3"}>Total Available rooms are {roomCount}</p>

        <div className="relative overflow-x-auto border-0 border-transparent mb-10 px-3 shadow-md rounded-xl bg-white">
          <div
            className="overflow-y-auto w-full border-collapse"
            style={{ maxHeight: "80vh" }}
          >
            <table className="w-full my-7 border-collapse text-left">
              <thead>
                <tr className={"text-left my-2"}>
                  <th className="p-4">Room Code</th>
                  <th className="p-4">Description</th>
                  <th className="p-4">Room Type</th>
                  <th className="p-4">Max Occupancy</th>
                  <th className="p-4">Base Price</th>
                  <th className="p-4">Bed Setup</th>
                  <th className="p-4">Active</th>
                </tr>
              </thead>
              <tbody className="py-7 ">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="py-10">
                      <div className="flex justify-center items-center flex-col gap-2">
                        <LuLoaderCircle className="animate-spin text-3xl text-main" />
                        <p className="text-sm text-gray-500">
                          Fetching rooms...
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : availableRooms.length > 0 ? (
                  availableRooms.map((room) => (
                    <tr
                      key={room._id}
                      className="shadow-[0_2px_2px_rgba(0,0,0,0.05)] last:shadow-none hover:bg-gray-50 transition-colors "
                    >
                      <td className="p-5 font-semibold text-black/80">{room.roomCode}</td>
                      <td className="p-5 text-gray-500 text-xs max-w-xs truncate">{room.desc || "-"}</td>
                      <td className="p-5">{room.roomType}</td>
                      <td className="p-5">
                        {room.capacity?.maxOccupancy || 3} Persons
                      </td>
                      <td className="p-5 font-semibold text-main">
                        ₦{room.basePrice?.toLocaleString()}
                      </td>
                      <td className="p-5">
                        {Array.isArray(room.bedSetup) ? room.bedSetup.join(", ") : room.bedSetup || "-"}
                      </td>
                      <td className="p-5">
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                          Active
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-10 text-center text-gray-400 italic">
                      No rooms available for these dates.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AvailableRooms;

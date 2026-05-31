import React, { useEffect, useState } from "react";
import TopNav from "../_component/TopNav";
import { Link } from "react-router-dom";
import { RoomService } from "@/pages/(main)/admin/services/roomService";
import { LuLoaderCircle, LuTrash2, LuPencil } from "react-icons/lu";

const Room = () => {
  const [roomCount, setRoomCount] = useState(0);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [loading, setLoading] = useState(false);

  // Edit Modal States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const response = await RoomService.getRooms();
      setRoomCount(response.total ?? 0);
      setAvailableRooms(response.data || []);
    } catch (err) {
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDeleteClick = async (roomId) => {
    if (!window.confirm("Are you sure you want to delete this room? This action cannot be undone.")) return;
    try {
      setLoading(true);
      await RoomService.deleteRoom(roomId);
      alert("Room deleted successfully!");
      loadData();
    } catch (error) {
      console.error("Error deleting room:", error);
      alert("Failed to delete room.");
      setLoading(false);
    }
  };

  const handleEditClick = (room) => {
    setEditingRoom({
      _id: room._id,
      roomCode: room.roomCode,
      roomType: room.roomType,
      basePrice: room.basePrice,
      maxOccupancy: room.capacity?.maxOccupancy || 2,
      bedSetup: Array.isArray(room.bedSetup) ? room.bedSetup.join(", ") : room.bedSetup || "",
      desc: room.desc || "",
    });
    setIsEditModalOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingRoom((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // Format payload to match DB schema
      const payload = {
        roomCode: editingRoom.roomCode,
        roomType: editingRoom.roomType,
        basePrice: Number(editingRoom.basePrice),
        capacity: {
          adult: 2,
          children: 0,
          maxOccupancy: Number(editingRoom.maxOccupancy),
        },
        bedSetup: editingRoom.bedSetup.split(",").map((s) => s.trim()).filter(Boolean),
        desc: editingRoom.desc,
      };

      await RoomService.updateRoom(editingRoom._id, payload);
      alert("Room updated successfully!");
      setIsEditModalOpen(false);
      loadData();
    } catch (error) {
      console.error("Error updating room:", error);
      alert("Failed to update room details.");
      setLoading(false);
    }
  };

  return (
    <section>
      <TopNav />
      <section className="rooms px-7 my-7">
        <h2 className="text-sm uppercase font-semibold text-main">Rooms</h2>
        <div className="flex my-7 justify-between items-center">
          <div className="border-main border py-2 px-7 text-center text-sm bg-primary50 rounded-full">
            <p>
              All Rooms <span className="font-bold">{roomCount}</span>
            </p>
          </div>
          <div className="justify-self-end">
            <Link to="/admin/dashboard/add-room">
              <button
                className={`bg-main w-38.25 md:w-35.25 h-10.75 text-sm text-white hover:text-main hover:bg-background hover:border-main hover:border rounded-md font-semibold transition-all ease-in-out duration-1000 cursor-pointer`}
              >
                Add Room
              </button>
            </Link>
          </div>
        </div>
        <div className="relative overflow-x-auto mb-10 px-3 rounded-xl bg-white shadow-sm border border-gray-100">
          <div
            className="overflow-y-auto w-full border-collapse"
            style={{ maxHeight: "80vh" }}
          >
            <table className="w-full my-7">
              <thead>
                <tr className="text-left my-2 font-medium border-b border-gray-100 text-gray-500 text-sm">
                  <th className="p-4">Room Code</th>
                  <th className="p-4">Description</th>
                  <th className="p-4">Room Type</th>
                  <th className="p-4">Max Occupancy</th>
                  <th className="p-4">Base Price</th>
                  <th className="p-4">Bed Setup</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="py-7">
                {loading && !isEditModalOpen ? (
                  <tr>
                    <td colSpan={8} className="py-10">
                      <div className="flex justify-center items-center flex-col gap-2">
                        <LuLoaderCircle className="animate-spin text-3xl text-main" />
                        <p className="text-sm text-gray-500">
                          Loading rooms...
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : availableRooms.length > 0 ? (
                  availableRooms.map((room) => (
                    <tr
                      key={room._id}
                      className="border-b border-gray-50 hover:bg-gray-50 transition-colors text-sm"
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
                        <span className="bg-green-50 text-green-700 border border-green-200/50 px-2.5 py-1 rounded-full text-xs font-medium">
                          Active
                        </span>
                      </td>
                      <td className="p-5">
                        <div className="flex justify-center items-center gap-2">
                          <button
                            onClick={() => handleEditClick(room)}
                            className="text-blue-600 hover:text-blue-800 p-1.5 hover:bg-blue-50 rounded transition cursor-pointer"
                            title="Edit Room"
                          >
                            <LuPencil size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(room._id)}
                            className="text-red-600 hover:text-red-800 p-1.5 hover:bg-red-50 rounded transition cursor-pointer"
                            title="Delete Room"
                          >
                            <LuTrash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="py-10 text-center text-gray-400 italic">
                      No rooms added yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* EDIT ROOM MODAL */}
      {isEditModalOpen && editingRoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl border border-gray-100 overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-bold text-gray-800 text-lg">Edit Room Information</h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold cursor-pointer"
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="p-6 space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="font-semibold text-gray-700 mb-1">Room Code</label>
                  <input
                    type="text"
                    name="roomCode"
                    value={editingRoom.roomCode || ""}
                    onChange={handleEditChange}
                    className="px-3 py-2 border border-gray-200 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-main"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-semibold text-gray-700 mb-1">Room Type</label>
                  <select
                    name="roomType"
                    value={editingRoom.roomType || ""}
                    onChange={handleEditChange}
                    className="px-3 py-2 border border-gray-200 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-main"
                    required
                  >
                    <option value="Single">Single</option>
                    <option value="Double">Double</option>
                    <option value="Suite">Suite</option>
                    <option value="Executive">Executive</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="font-semibold text-gray-700 mb-1">Base Price (₦)</label>
                  <input
                    type="number"
                    name="basePrice"
                    value={editingRoom.basePrice || ""}
                    onChange={handleEditChange}
                    className="px-3 py-2 border border-gray-200 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-main"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-semibold text-gray-700 mb-1">Max Occupancy</label>
                  <input
                    type="number"
                    name="maxOccupancy"
                    value={editingRoom.maxOccupancy || ""}
                    onChange={handleEditChange}
                    className="px-3 py-2 border border-gray-200 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-main"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="font-semibold text-gray-700 mb-1">Bed Setup</label>
                <input
                  type="text"
                  name="bedSetup"
                  value={editingRoom.bedSetup || ""}
                  onChange={handleEditChange}
                  className="px-3 py-2 border border-gray-200 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-main"
                  placeholder="e.g. 1 King Bed, 2 Single Beds"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold text-gray-700 mb-1">Description</label>
                <textarea
                  name="desc"
                  value={editingRoom.desc || ""}
                  onChange={handleEditChange}
                  className="px-3 py-2 border border-gray-200 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-main h-20 resize-none"
                  placeholder="Description details..."
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-5 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 rounded-lg bg-main hover:bg-main/90 text-white font-semibold flex items-center gap-2 cursor-pointer"
                >
                  {loading ? <LuLoaderCircle className="animate-spin text-sm" /> : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Room;

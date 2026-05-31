import { RoomService } from "@/pages/(main)/admin/services/roomService";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Room = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkIn = searchParams.get("checkIn") || "";
  const checkOut = searchParams.get("checkOut") || "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await RoomService.getRoomById(params.id);
        setRoom(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  const handleBook = () => {
    // validation
    if (!checkIn || !checkOut) {
      alert("Missing check-in or check-out");
      return;
    }

    if (new Date(checkOut) <= new Date(checkIn)) {
      alert("Invalid date range");
      return;
    }

    navigate(
      `/booking?roomId=${params.id}&checkIn=${checkIn}&checkOut=${checkOut}&hotelId=${room?.hotelId}`
    );
  };

  if (loading) return <p className="text-center py-20">Loading...</p>;
  if (!room) return <p className="text-center py-20">Room not found</p>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-24">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden md:flex">
        <div className="md:w-1/2 h-[350px] md:h-auto bg-main relative">
          <img
            src={room.images?.[0] || "/room1.webp"}
            alt={room.roomCode}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="md:w-1/2 p-8 flex flex-col justify-between">
          <div>
            <span className="text-xs uppercase font-semibold tracking-wider text-main bg-primary50 px-3 py-1 rounded-full">
              {room.roomType} Suite
            </span>
            <h1 className="text-3xl font-extrabold text-black/80 mt-4 font-poppins">
              {room.roomCode}
            </h1>
            <p className="text-gray-600 mt-4 leading-relaxed">{room.desc || "Experience unmatched luxury and modern comfort. Tailored to make your stay memorable."}</p>
            
            <div className="mt-6 border-t border-gray-100 pt-6 space-y-3 text-sm text-black/70">
              <p><strong>Capacity:</strong> Max {room.capacity?.maxOccupancy || 3} Guests (Adults: {room.capacity?.adult || 2}, Children: {room.capacity?.children || 1})</p>
              <p><strong>Bed Setup:</strong> {Array.isArray(room.bedSetup) ? room.bedSetup.join(', ') : room.bedSetup}</p>
              <p><strong>Price:</strong> ₦{room.basePrice?.toLocaleString()} / night</p>
            </div>
          </div>

          <div className="mt-8">
            <div className="bg-gray-50 border border-gray-100 p-4 rounded-xl mb-6">
              <h3 className="font-semibold text-sm text-black/80 mb-2">Selected Stay Dates:</h3>
              <div className="flex justify-between text-xs text-gray-600">
                <p>Check-In: <strong>{checkIn || "Not Selected"}</strong></p>
                <p>Check-Out: <strong>{checkOut || "Not Selected"}</strong></p>
              </div>
            </div>
            
            <button
              onClick={handleBook}
              disabled={!checkIn || !checkOut}
              className={`w-full py-4 text-center text-white font-semibold rounded-xl transition-all shadow-md ${
                checkIn && checkOut 
                  ? "bg-main hover:bg-main/90 hover:shadow-lg cursor-pointer" 
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              Book Room Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room;

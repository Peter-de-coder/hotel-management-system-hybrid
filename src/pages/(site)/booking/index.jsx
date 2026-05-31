import { useSearchParams, Link } from "react-router-dom";
import { useState, useEffect, Suspense } from "react";
import MainBtn from "@/components/buttons/MainBtn";
import { Axios } from "@/lib/axios";
import { RoomService } from "@/pages/(main)/admin/services/roomService";

const getTodayDateString = () => {
  return "2026-05-30";
};

const getTomorrowDateString = () => {
  return "2026-05-31";
};

const BookingForm = () => {
  const [searchParams] = useSearchParams();

  const roomIdParam = searchParams.get("roomId") || "";
  const checkInParam = searchParams.get("checkIn") || getTodayDateString();
  const checkOutParam = searchParams.get("checkOut") || getTomorrowDateString();
  const hotelIdParam = searchParams.get("hotelId") || "";

  const [roomId, setRoomId] = useState(roomIdParam);
  const [checkIn, setCheckIn] = useState(checkInParam);
  const [checkOut, setCheckOut] = useState(checkOutParam);
  const [hotelId, setHotelId] = useState(hotelIdParam);

  const [rooms, setRooms] = useState([]);
  const [availableRoomIds, setAvailableRoomIds] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [loadingRooms, setLoadingRooms] = useState(false);

  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [loading, setLoading] = useState(false);

  // Sync state with search params on mount or when they change (handles client-side navigation)
  useEffect(() => {
    const rId = searchParams.get("roomId") || "";
    const cIn = searchParams.get("checkIn") || getTodayDateString();
    const cOut = searchParams.get("checkOut") || getTomorrowDateString();
    const hId = searchParams.get("hotelId") || "";

    if (rId) setRoomId(rId);
    if (cIn) setCheckIn(cIn);
    if (cOut) setCheckOut(cOut);
    if (hId) setHotelId(hId);
  }, [searchParams]);

  // Load all rooms once on mount
  useEffect(() => {
    const fetchAllRooms = async () => {
      try {
        const res = await RoomService.getRooms();
        setRooms(res.data || []);
      } catch (err) {
        console.error("Error fetching all rooms:", err);
      }
    };
    fetchAllRooms();
  }, []);

  // Update available room IDs when check-in/check-out dates change
  useEffect(() => {
    const checkAvailability = async () => {
      if (!checkIn || !checkOut || new Date(checkOut) <= new Date(checkIn)) {
        setAvailableRoomIds([]);
        return;
      }
      try {
        setLoadingRooms(true);
        const res = await RoomService.getAvailableRooms({ checkIn, checkOut });
        const availIds = (res.data || []).map((r) => r._id);
        setAvailableRoomIds(availIds);
      } catch (err) {
        console.error("Error loading availability:", err);
      } finally {
        setLoadingRooms(false);
      }
    };
    checkAvailability();
  }, [checkIn, checkOut]);

  // Handle selected room details loading and pre-selection
  useEffect(() => {
    if (roomId && rooms.length > 0) {
      const found = rooms.find((r) => r._id === roomId);
      if (found) {
        setSelectedRoom(found);
        if (!hotelId) setHotelId(found.hotelId);
      } else {
        const fetchSingleRoom = async () => {
          try {
            const res = await RoomService.getRoomById(roomId);
            setSelectedRoom(res.data);
            if (!hotelId) setHotelId(res.data.hotelId);
            setRooms((prev) => {
              if (prev.some((r) => r._id === res.data._id)) return prev;
              return [res.data, ...prev];
            });
          } catch (e) {
            console.error("Error fetching selected room:", e);
          }
        };
        fetchSingleRoom();
      }
    } else if (!roomId) {
      setSelectedRoom(null);
    }
  }, [roomId, rooms, hotelId]);

  const handleRoomChange = (id) => {
    setRoomId(id);
  };

  // Calculate nights
  const nights =
    checkIn && checkOut && new Date(checkOut) > new Date(checkIn)
      ? Math.ceil(
          (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
            (1000 * 60 * 60 * 24)
        )
      : 0;

  const totalAmount = selectedRoom ? selectedRoom.basePrice * (nights || 1) : 0;

  const handleBooking = async () => {
    if (!roomId) {
      alert("Please select a room to book.");
      return;
    }
    if (!checkIn || !checkOut) {
      alert("Please select check-in and check-out dates.");
      return;
    }
    if (new Date(checkOut) <= new Date(checkIn)) {
      alert("Check-out date must be after check-in date.");
      return;
    }
    if (!guestName || !guestEmail || !guestPhone) {
      alert("Please fill in your contact information.");
      return;
    }

    try {
      setLoading(true);

      // STEP 1: CREATE BOOKING
      const bookingRes = await Axios.post("/booking", {
        roomId,
        checkIn,
        hotelId: hotelId || selectedRoom?.hotelId,
        checkOut,
        guestName,
        guestEmail,
        guestPhone,
        guests: {
          adult: 2,
          children: 0,
        },
      });

      const booking = bookingRes.data.data;
      console.log("📦 Booking created:", booking);

      // STEP 2: INIT PAYMENT
      const paymentRes = await Axios.post("/payment/initialize", {
        bookingId: booking._id,
      });

      console.log("💳 Payment init response:", paymentRes.data);

      // STEP 3: REDIRECT TO PAYSTACK
      if (paymentRes.data?.authorization_url) {
        window.location.href = paymentRes.data.authorization_url;
      } else {
        alert("Payment initialization failed");
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-background min-h-screen pb-16">
      {/* Hero Section */}
      <div className="relative h-[50vh] w-full text-center overflow-hidden flex flex-col gap-2 items-center justify-center hero3 mb-10">
        <h2 className="font-extrabold text-[40px] md:text-[60px] text-white uppercase tracking-wider font-poppins">
          Book Now
        </h2>
        <div className="flex items-center gap-2 text-white/95 text-sm md:text-base font-semibold bg-black/35 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/10 shadow-lg">
          <Link to="/" className="hover:text-amber-400 transition-colors">
            Home
          </Link>
          <span className="text-white/40">|</span>
          <span className="text-amber-400">Book Now</span>
        </div>
      </div>

      <div className="flex flex-col items-center mt-6">
        <div className="py-8 xl:w-[40%] lg:w-[70%] w-full text-center">
          <h2 className="text-black text-[30px] font-bold">
            Book Your Suite
          </h2>
          <p className="text-gray-500 mt-2">
            Reserve your space with us today and experience premium hospitality
          </p>
        </div>

        <div className="w-full lg:px-20 md:px-8 px-5 max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form Details */}
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold border-b pb-2 text-gray-800">
            Contact Information
          </h3>

          {/* NAME */}
          <div>
            <label className="text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="focus:outline-none focus:ring-2 focus:ring-main w-full shadow-sm h-14 my-2 px-4 border border-gray-200 rounded-md bg-white text-black"
              placeholder="e.g. Anita Baker"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              value={guestEmail}
              onChange={(e) => setGuestEmail(e.target.value)}
              className="focus:outline-none focus:ring-2 focus:ring-main w-full shadow-sm h-14 my-2 px-4 border border-gray-200 rounded-md bg-white text-black"
              placeholder="e.g. anita@gmail.com"
            />
          </div>

          {/* PHONE */}
          <div>
            <label className="text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              value={guestPhone}
              onChange={(e) => setGuestPhone(e.target.value)}
              className="focus:outline-none focus:ring-2 focus:ring-main w-full shadow-sm h-14 my-2 px-4 border border-gray-200 rounded-md bg-white text-black"
              placeholder="e.g. 08012345678"
            />
          </div>
        </div>

        {/* Room & Calendar selection */}
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold border-b pb-2 text-gray-800">
            Booking Details
          </h3>

          {/* DATES */}
          <div className="flex gap-4">
            <div className="w-full">
              <label className="text-sm font-medium text-gray-700">Check In</label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full shadow-sm h-14 my-2 px-4 border border-gray-200 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-main"
              />
            </div>

            <div className="w-full">
              <label className="text-sm font-medium text-gray-700">Check Out</label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full shadow-sm h-14 my-2 px-4 border border-gray-200 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-main"
              />
            </div>
          </div>

          {/* ROOM SELECTION */}
          <div>
            <label className="text-sm font-medium text-gray-700">Room / Suite</label>
            {loadingRooms ? (
              <div className="h-14 my-2 flex items-center text-sm text-gray-500">
                Loading rooms...
              </div>
            ) : (
              <select
                value={roomId}
                onChange={(e) => handleRoomChange(e.target.value)}
                className="focus:outline-none focus:ring-2 focus:ring-main w-full shadow-sm h-14 my-2 px-4 border border-gray-200 rounded-md bg-white text-black"
              >
                <option value="">-- Select a Room / Suite --</option>
                {rooms.map((r) => {
                  const isOccupied = checkIn && checkOut && !availableRoomIds.includes(r._id);
                  return (
                    <option key={r._id} value={r._id} disabled={isOccupied}>
                      {r.roomCode} ({r.roomType}) - ₦{r.basePrice.toLocaleString()} / night{isOccupied ? " (Occupied)" : ""}
                    </option>
                  );
                })}
              </select>
            )}
          </div>

          {/* PRICE AND SUMMARY CARD */}
          {selectedRoom && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-100 flex flex-col gap-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Suite Type:</span>
                <span className="font-semibold text-gray-800">{selectedRoom.roomType} (Room {selectedRoom.roomCode})</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Rate:</span>
                <span className="font-semibold text-gray-800">₦{selectedRoom.basePrice.toLocaleString()} / night</span>
              </div>
              {nights > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Duration:</span>
                  <span className="font-semibold text-gray-800">{nights} {nights === 1 ? "night" : "nights"}</span>
                </div>
              )}
              <hr className="my-1 border-gray-200" />
              <div className="flex justify-between items-center font-bold text-base">
                <span className="text-gray-700">Total Price:</span>
                <span className="text-main">₦{totalAmount.toLocaleString()}</span>
              </div>
            </div>
          )}

          {/* BOOK BUTTON */}
          <div className="mt-4">
            <MainBtn
              text={loading ? "Processing Booking..." : "Book & Pay Now"}
              radius="rounded-md"
              onClick={handleBooking}
            />
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};

const Booking = () => {
  return (
    <Suspense fallback={
      <div className="text-center py-20">
        <div className="animate-pulse text-lg font-semibold text-gray-600">
          Loading booking portal...
        </div>
      </div>
    }>
      <BookingForm />
    </Suspense>
  );
};

export default Booking;

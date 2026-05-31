import React, { useEffect, useState } from "react";
import TopNav from "../_component/TopNav";
import { BookingService } from "../../services/bookingService";
import { LuLoaderCircle, LuTrash2, LuSearch, LuCheck, LuLogOut } from "react-icons/lu";

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await BookingService.getBookings();
      setBookings(res.data || []);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;
    try {
      await BookingService.deleteBooking(id);
      alert("Booking deleted successfully!");
      fetchBookings();
    } catch (error) {
      console.error("Error deleting booking:", error);
      alert("Failed to delete booking");
    }
  };

  const handleConfirmBooking = async (id) => {
    if (!window.confirm("Mark this booking as Successful/Confirmed and allocate a room?")) return;
    try {
      setLoading(true);
      await BookingService.updateBooking(id, { bookingStatus: "Confirmed" });
      alert("Booking confirmed, room allocated, and email sent successfully!");
      fetchBookings();
    } catch (error) {
      console.error("Error confirming booking:", error);
      alert(error.response?.data?.message || "Failed to confirm booking");
      setLoading(false);
    }
  };

  const handleConfirmPayment = async (id) => {
    if (!window.confirm("Confirm payment for this booking?")) return;
    try {
      setLoading(true);
      await BookingService.updateBooking(id, { paymentStatus: "Paid" });
      alert("Payment status updated to Paid successfully!");
      fetchBookings();
    } catch (error) {
      console.error("Error updating payment status:", error);
      alert(error.response?.data?.message || "Failed to update payment status");
      setLoading(false);
    }
  };

  const handleCheckOut = async (id) => {
    if (!window.confirm("Are you sure you want to check out this customer?")) return;
    try {
      setLoading(true);
      await BookingService.updateBooking(id, { bookingStatus: "CheckedOut" });
      alert("Customer checked out successfully! The room is now available.");
      fetchBookings();
    } catch (error) {
      console.error("Error checking out customer:", error);
      alert(error.response?.data?.message || "Failed to check out customer");
      setLoading(false);
    }
  };

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.guestName?.toLowerCase().includes(search.toLowerCase()) ||
      b.guestEmail?.toLowerCase().includes(search.toLowerCase()) ||
      b.roomNumber?.toLowerCase().includes(search.toLowerCase()) ||
      b.roomId?.roomCode?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      b.bookingStatus === statusFilter ||
      b.paymentStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <section className="min-h-screen bg-gray-50">
      <TopNav />
      <section className="px-7 my-7">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="font-semibold uppercase text-main text-lg tracking-wider">Bookings Management</h2>
            <p className="text-sm text-gray-500 mt-1">Manage and track guest reservations and payment statuses</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchBookings}
              className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-gray-50 transition shadow-sm cursor-pointer"
            >
              Refresh
            </button>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="bg-white p-4 rounded-2xl shadow-xs border border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <LuSearch size={18} />
            </span>
            <input
              type="text"
              placeholder="Search by name, email, room..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2.5 w-full bg-gray-50/50 border border-gray-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-main/20 focus:border-main text-sm transition-all"
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            <button
              onClick={() => setStatusFilter("all")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                statusFilter === "all" ? "bg-main text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              All Bookings
            </button>
            <button
              onClick={() => setStatusFilter("Confirmed")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                statusFilter === "Confirmed" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Confirmed
            </button>
            <button
              onClick={() => setStatusFilter("Pending")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                statusFilter === "Pending" ? "bg-yellow-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setStatusFilter("Paid")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                statusFilter === "Paid" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Paid
            </button>
            <button
              onClick={() => setStatusFilter("CheckedOut")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                statusFilter === "CheckedOut" ? "bg-gray-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Checked Out
            </button>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-2xl shadow-xs border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <LuLoaderCircle className="animate-spin text-main text-4xl" />
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              No bookings found matching filters.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100 text-gray-600 uppercase text-xs font-semibold tracking-wider">
                    <th className="px-6 py-4">Guest Details</th>
                    <th className="px-6 py-4">Room No.</th>
                    <th className="px-6 py-4">Stay Duration</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Booking Status</th>
                    <th className="px-6 py-4">Payment Status</th>
                    <th className="px-6 py-4">Date Booked</th>
                    <th className="px-6 py-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                  {filteredBookings.map((b) => {
                    const checkInDate = b.checkIn ? new Date(b.checkIn).toLocaleDateString(undefined, { timeZone: "UTC" }) : "N/A";
                    const checkOutDate = b.checkOut ? new Date(b.checkOut).toLocaleDateString(undefined, { timeZone: "UTC" }) : "N/A";
                    const dateBooked = b.createdAt ? new Date(b.createdAt).toLocaleDateString() : "N/A";

                    return (
                      <tr key={b._id} className="hover:bg-gray-50/50 transition">
                        <td className="px-6 py-4">
                          <div className="font-semibold text-gray-900">{b.guestName}</div>
                          <div className="text-xs text-gray-400">{b.guestEmail}</div>
                          <div className="text-xs text-gray-400">{b.guestPhone}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-bold text-main">
                            {b.roomNumber || b.roomId?.roomCode || "Not Assigned"}
                          </span>
                          <span className="text-xs block text-gray-400">
                            {b.roomId?.roomType || "N/A"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-xs font-medium text-gray-800">{checkInDate} - {checkOutDate}</div>
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900">
                          ₦{b.totalAmount ? b.totalAmount.toLocaleString() : 0}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                                b.bookingStatus === "Confirmed"
                                  ? "bg-green-50 text-green-700 border border-green-200/50"
                                  : b.bookingStatus === "Pending"
                                  ? "bg-yellow-50 text-yellow-700 border border-yellow-200/50"
                                  : b.bookingStatus === "CheckedOut"
                                  ? "bg-gray-50 text-gray-700 border border-gray-200/50"
                                  : "bg-red-50 text-red-700 border border-red-200/50"
                              }`}
                            >
                              {b.bookingStatus}
                            </span>
                            {b.bookingStatus === "Pending" && (
                              <button
                                onClick={() => handleConfirmBooking(b._id)}
                                className="text-green-600 hover:text-green-800 p-1 hover:bg-green-50 rounded transition cursor-pointer"
                                title="Confirm Booking (Mark Successful & Allocate Room)"
                              >
                                <LuCheck size={16} />
                              </button>
                            )}
                            {b.bookingStatus === "Confirmed" && (
                              <button
                                onClick={() => handleCheckOut(b._id)}
                                className="text-orange-600 hover:text-orange-800 p-1 hover:bg-orange-50 rounded transition cursor-pointer"
                                title="Check Out Guest"
                              >
                                <LuLogOut size={16} />
                              </button>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                                b.paymentStatus === "Paid"
                                  ? "bg-blue-50 text-blue-700 border border-blue-200/50"
                                  : b.paymentStatus === "Pending"
                                  ? "bg-yellow-50 text-yellow-700 border border-yellow-200/50"
                                  : "bg-red-50 text-red-700 border border-red-200/50"
                              }`}
                            >
                              {b.paymentStatus}
                            </span>
                            {b.paymentStatus === "Pending" && (
                              <button
                                onClick={() => handleConfirmPayment(b._id)}
                                className="text-blue-600 hover:text-blue-800 p-1 hover:bg-blue-50 rounded transition cursor-pointer"
                                title="Confirm Payment (Mark Paid)"
                              >
                                <LuCheck size={16} />
                              </button>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-xs text-gray-400">
                          {dateBooked}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() => handleDelete(b._id)}
                            className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-xl transition cursor-pointer"
                            title="Delete Booking"
                          >
                            <LuTrash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </section>
  );
};

export default AllBookings;

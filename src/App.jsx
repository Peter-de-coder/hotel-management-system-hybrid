import { Routes, Route, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Site Pages
import Home from "@/pages/(site)/index";
import Explore from "@/pages/(site)/explore/index";
import Rooms from "@/pages/(site)/rooms/index";
import RoomDetail from "@/pages/(site)/room/[id]/index";
import Booking from "@/pages/(site)/booking/index";
import About from "@/pages/(site)/about/index";
import Contact from "@/pages/(site)/contact/index";
import Gallery from "@/pages/(site)/gallery/index";

// Admin Pages
import AdminSignin from "@/pages/(main)/admin/auth/signin/index";
import AdminDashboardHome from "@/pages/(main)/admin/dashboard/index";
import AdminAddRoom from "@/pages/(main)/admin/dashboard/add-room/index";
import AdminAddHotel from "@/pages/(main)/admin/dashboard/add-hotel/index";
import AdminAddAdmin from "@/pages/(main)/admin/dashboard/add-admin/index";
import AdminHotels from "@/pages/(main)/admin/dashboard/hotels/index";
import AdminRooms from "@/pages/(main)/admin/dashboard/rooms/index";
import AdminBookings from "@/pages/(main)/admin/dashboard/all-bookings/index";
import AdminFeedbacks from "@/pages/(main)/admin/dashboard/all-feedbacks/index";

// Layouts
import Nav from "@/components/header/nav";
import Footer from "@/components/footer";
import DashboardLayout from "@/pages/(main)/admin/dashboard/layout";

const SiteLayout = () => {
  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
    </>
  );
};

function App() {
  return (
    <>
      <Routes>
        {/* Customer Site Routes */}
        <Route element={<SiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/room/:id" element={<RoomDetail />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/gallery" element={<Gallery />} />
        </Route>

        {/* Admin Signin Route */}
        <Route path="/admin/auth/signin" element={<AdminSignin />} />

        {/* Admin Dashboard Protected Routes */}
        <Route path="/admin/dashboard" element={<DashboardLayout />}>
          <Route index element={<AdminDashboardHome />} />
          <Route path="add-room" element={<AdminAddRoom />} />
          <Route path="add-hotel" element={<AdminAddHotel />} />
          <Route path="add-admin" element={<AdminAddAdmin />} />
          <Route path="hotels" element={<AdminHotels />} />
          <Route path="rooms" element={<AdminRooms />} />
          <Route path="all-bookings" element={<AdminBookings />} />
          <Route path="all-feedbacks" element={<AdminFeedbacks />} />
        </Route>
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;

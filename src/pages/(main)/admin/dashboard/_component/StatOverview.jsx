import React, { useEffect, useState } from "react";
import { FaCheckDouble } from "react-icons/fa";
import { BsSendCheckFill } from "react-icons/bs";
import { SiGoogleclassroom } from "react-icons/si";
import { GiOccupy } from "react-icons/gi";
import { FcFeedback } from "react-icons/fc";
import { RoomService } from "../../services/roomService";
import { HotelService } from "../../services/hotelService";
import { FeedbackService } from "../../services/feedbackService";
import { LuLoaderCircle } from "react-icons/lu";

const StatOverview = () => {
  const [stats, setStats] = useState({
    totalRooms: 0,
    totalHotels: 0,
    totalNewsLetter: 12,
    feedbacks: 0,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const RoomResponse = await RoomService.getRooms();
        const HotelResponse = await HotelService.getHotel();
        
        let feedbackCount = 0;
        try {
          const FeedbackResponse = await FeedbackService.getFeedbacks();
          feedbackCount = FeedbackResponse.data ? FeedbackResponse.data.length : 0;
        } catch (fbErr) {
          console.error("Feedback fetch error:", fbErr);
        }

        setStats((prev) => ({
          ...prev,
          totalRooms: RoomResponse.total ?? 0,
          totalHotels: HotelResponse.total ?? 0,
          feedbacks: feedbackCount,
        }));
      } catch (err) {
        console.error("API Error:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <div className="bg-white mx-3 py-3 px-5 rounded-md">
      <h2 className={"text-xl font-medium text-supportDark"}>Overview</h2>
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4 ">
        <div className="h-auto">
          <div className="bg-linear-to-tr from-main to-blue-400 shadow-blue-500/40 text-white my-5 grid h-16 w-16 place-items-center rounded-full">
            <BsSendCheckFill className={"text-2xl"} />
          </div>
          <div className="">
            <p className={"text-sm text-small"}>Total</p>
            <div className="flex items-center gap-3">
              <p className={"pt-2"}> Newsletter</p>
              <div className="">
                <h4 className={"text-main text-2xl md:text-3xl font-bold"}>
                  {stats.totalNewsLetter}
                </h4>
              </div>
            </div>
          </div>
        </div>

        <div className="h-auto">
          <div className="bg-linear-to-tr from-main to-blue-400 shadow-blue-500/40 text-white my-5 grid h-16 w-16 place-items-center rounded-full">
            <SiGoogleclassroom className={"text-2xl"} />
          </div>
          <div className="">
            <p className={"text-sm text-small"}>Total</p>
            <div className="flex items-center gap-3">
              <p className={"pt-2"}> Rooms</p>
              <div className="">
                <h4 className={"text-main text-2xl md:text-3xl font-bold"}>
                  {loading ? (
                    <LuLoaderCircle className="animate-spin" />
                  ) : (
                    stats.totalRooms
                  )}
                </h4>
              </div>
            </div>
          </div>
        </div>

        <div className="h-auto">
          <div className="bg-linear-to-tr from-pink-600 to-pink-400 shadow-blue-500/40 text-white my-5 grid h-16 w-16 place-items-center rounded-full">
            <GiOccupy className={"text-2xl"} />
          </div>
          <div className="">
            <p className={"text-sm text-small"}>Totals</p>
            <div className="flex items-center gap-3">
              <p className={"pt-2"}> Hotel</p>
              <div className="">
                <h4 className={"text-main text-2xl md:text-3xl font-bold"}>
                  {loading ? (
                    <LuLoaderCircle className="animate-spin" />
                  ) : (
                    stats.totalHotels
                  )}
                </h4>
              </div>
            </div>
          </div>
        </div>

        <div className="h-auto">
          <div className="bg-linear-to-tr from-gray-600 to-gray-400 shadow-blue-500/40 text-white my-5 grid h-16 w-16 place-items-center rounded-full">
            <FcFeedback className={"text-2xl"} />
          </div>
          <div className="">
            <p className={"text-sm text-small"}>Total</p>
            <div className="flex items-center gap-3">
              <p className={"pt-2"}>Feedbacks</p>
              <div className="">
                <h4 className={"text-main text-2xl md:text-3xl font-bold"}>
                  {stats.feedbacks}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatOverview;

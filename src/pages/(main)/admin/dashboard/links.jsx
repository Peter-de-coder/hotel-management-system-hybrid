import React from "react";
import {
  MdBookmark,
  MdDashboard,
  MdFeedback,
  MdRoom,
  MdFormatListBulletedAdd,
} from "react-icons/md";
import { RiApps2AddFill } from "react-icons/ri";
import { IoPersonAddOutline, IoPersonAddSharp } from "react-icons/io5";
import { AiOutlineGroup } from "react-icons/ai";

export const links = [
  {
    name: "Dashboard",
    link: "/admin/dashboard",
    icon: <MdDashboard className="text-lg" />,
    iconCurrent: <MdDashboard className="text-lg text-main" />,
  },
  {
    name: "Bookings",
    link: "/admin/dashboard/all-bookings",
    icon: <MdBookmark className="text-lg" />,
    iconCurrent: <MdBookmark className="text-lg text-main" />,
  },
  {
    name: "Feedbacks",
    link: "/admin/dashboard/all-feedbacks",
    icon: <MdFeedback className="text-lg" />,
    iconCurrent: <MdFeedback className="text-lg text-main" />,
  },
  {
    name: "Rooms",
    link: "/admin/dashboard/rooms",
    icon: <MdRoom className="text-lg" />,
    iconCurrent: <MdRoom className="text-lg text-main" />,
  },
  {
    name: "Hotels",
    link: "/admin/dashboard/hotels",
    icon: <AiOutlineGroup className="text-lg" />,
    iconCurrent: <AiOutlineGroup className="text-lg text-main" />,
  },
  {
    name: "Add Room",
    link: "/admin/dashboard/add-room",
    icon: <MdFormatListBulletedAdd className="text-lg" />,
    iconCurrent: <MdFormatListBulletedAdd className="text-lg text-main" />,
  },
  {
    name: "Add Admin",
    link: "/admin/dashboard/add-admin",
    icon: <IoPersonAddOutline className="text-lg" />,
    iconCurrent: <IoPersonAddSharp className="text-lg text-main" />,
  },
  {
    name: "Add Hotel",
    link: "/admin/dashboard/add-hotel",
    icon: <RiApps2AddFill className="text-lg" />,
    iconCurrent: <RiApps2AddFill className="text-lg text-main" />,
  },
];
"use client";

import NavBar from "@/components/navbar";
import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

// Dummy data for devices and children
const devicesAndChildren = [
  {
    id: 1,
    child_name: "Patric",
    device: "Laptop",
    last_used: "2025-07-10 08:30 AM",
    image: "/public/avatars/patric.png", // fallback to initials if image not available
  },
  {
    id: 2,
    child_name: "Stanley",
    device: "PC",
    last_used: "2025-07-10 09:15 AM",
    image: "/public/avatars/stanley.png",
  },
  {
    id: 3,
    child_name: "Gianne",
    device: "PC",
    last_used: "2025-07-09 11:45 PM",
    image: "/public/avatars/gianne.png",
  },
  {
    id: 4,
    child_name: "Jhana",
    device: "Laptop",
    last_used: "2025-07-10 07:20 AM",
    image: "/public/avatars/jhana.png",
  },
];

// Helper function to format datetime
const formatLastUsed = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
  const dateToCheck = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );

  const time = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  if (dateToCheck.getTime() === today.getTime()) {
    return `Today at ${time}`;
  } else if (dateToCheck.getTime() === yesterday.getTime()) {
    return `Yesterday at ${time}`;
  } else {
    const daysDiff = Math.floor((today - dateToCheck) / (24 * 60 * 60 * 1000));
    if (daysDiff < 7) {
      return `${daysDiff} days ago at ${time}`;
    } else {
      return (
        date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }) + ` at ${time}`
      );
    }
  }
};

export default function Dashboard() {
  const [enabled, setEnabled] = React.useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <div
        className="page-container 
                    bg-gray-100
                    text-black
                    mx-auto 
                    max-w-6xl 
                    px-6 
                    py-6"
      >
        <NavBar />
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <p className="border-b-1 pb-7 text-[#616161]">
          Easily manage your child's digital activity with customizable controls
          and real-time tracking.
        </p>

        <h1 className="text-2xl font-bold mt-6 mb-4">Devices & Children</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {devicesAndChildren.map((item, index) => (
            <Link key={index} href={`/child/${item.id}`}>
              <div className="pb-5 rounded-2xl items-center justify-center border-1 text-center shadow-sm cursor-pointer transition-all duration-300 bg-[#D9E5D9] hover:bg-[#03585F] group">
                <h1 className="mt-5 w-14 pt-2 pb-2 mx-auto text-3xl rounded-[100] border-1 text-[#D9E5D9] bg-[#03585F] border-[#03585F] group-hover:text-[#03585F] group-hover:bg-[#D9E5D9] group-hover:border-[#D9E5D9] transition-all duration-300">
                  {item.child_name.charAt(0)}
                </h1>
                <h1 className="mt-2 text-2xl font-bold text-[#03585F] group-hover:text-white transition-all duration-300">
                  {item.child_name}
                </h1>
                <p className="mt-2 font-light text-[#03585F] group-hover:text-white transition-all duration-300">
                  {item.device}
                </p>
                <p className="mt-1 text-sm font-light text-gray-600 group-hover:text-gray-300 transition-all duration-300">
                  {formatLastUsed(item.last_used)}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-5 flex gap-4">
          <div className="w-md rounded-2xl items-center justify-center border-1 shadow-sm">
            <div className="flex items-center pl-6 pt-2 pb-4 rounded-t-2xl text-white font-bold bg-linear-to-r from-[#AFC8AF] to-[#03585F]">
              <h1 className="pt-3">Filter Settings</h1>
            </div>

            <div className="pt-4 bg-white">
              <div className="mt-1 pb-3 flex gap-65 border-b-1">
                <h1 className="ml-4 pr-3 w-50">Text Filter</h1>
                <div
                  onClick={() => setEnabled(!enabled)}
                  className={`w-12 h-6 mr-5 w-23 flex items-center px-1 rounded-full cursor-pointer transition-colors ${
                    enabled ? "bg-teal-800" : "bg-gray-300"
                  }`}
                >
                  <motion.div
                    animate={{ x: enabled ? 24 : 0 }}
                    transition={{ type: "spring", stiffness: 700, damping: 30 }}
                    className="w-4 h-4 bg-white rounded-full shadow"
                  />
                </div>
              </div>

              <div className="mt-1 py-3 flex gap-65 border-b-1">
                <h1 className="ml-4 w-50">Audio Filter</h1>
                <div
                  onClick={() => setEnabled(!enabled)}
                  className={`w-12 h-6 mr-5 w-23 flex items-center px-1 rounded-full cursor-pointer transition-colors ${
                    enabled ? "bg-teal-800" : "bg-gray-300"
                  }`}
                >
                  <motion.div
                    animate={{ x: enabled ? 24 : 0 }}
                    transition={{ type: "spring", stiffness: 700, damping: 30 }}
                    className="w-4 h-4 bg-white rounded-full shadow"
                  />
                </div>
              </div>

              <div className="mt-1 py-3 flex gap-65 border-b-1">
                <h1 className="ml-4 w-50">Visual Filter</h1>
                <div
                  onClick={() => setEnabled(!enabled)}
                  className={`w-12 h-6 mr-5 w-23 flex items-center px-1 rounded-full cursor-pointer transition-colors ${
                    enabled ? "bg-teal-800" : "bg-gray-300"
                  }`}
                >
                  <motion.div
                    animate={{ x: enabled ? 24 : 0 }}
                    transition={{ type: "spring", stiffness: 700, damping: 30 }}
                    className="w-4 h-4 bg-white rounded-full shadow"
                  />
                </div>
              </div>

              <div className="mt-1 py-3 flex gap-65 border-b-1">
                <h1 className="ml-4 w-50">Strict Mode</h1>
                <div
                  onClick={() => setEnabled(!enabled)}
                  className={`w-12 h-6 mr-5 w-23 flex items-center px-1 rounded-full cursor-pointer transition-colors ${
                    enabled ? "bg-teal-800" : "bg-gray-300"
                  }`}
                >
                  <motion.div
                    animate={{ x: enabled ? 24 : 0 }}
                    transition={{ type: "spring", stiffness: 700, damping: 30 }}
                    className="w-4 h-4 bg-white rounded-full shadow"
                  />
                </div>
              </div>

              <h1 className="mt-7 ml-4 pb-5 font-bold">Content Categories</h1>
              <div className="ml-4 flex flex-col pb-5">
                <label>
                  <input className="size-5 mr-4 mb-5" type="checkbox" />
                  Violence
                </label>
                <label>
                  <input className="size-5 mr-4 mb-5" type="checkbox" />
                  Sexual
                </label>
                <label>
                  <input className="size-5 mr-4 mb-5" type="checkbox" />
                  Profanity
                </label>
                <label>
                  <input className="size-5 mr-4 mb-5" type="checkbox" />
                  Hate Speech
                </label>
              </div>
            </div>
          </div>
          <div className="w-2xl rounded-2xl items-center bg-white justify-center border-1 shadow-sm">
            <h1 className="pl-5 pt-5 rounded-t-2xl text-xl font-bold text-[#03585F]">
              Blocked Sites
            </h1>
            <p className="pl-5 pt-2 pb-5 font-light text-[#616161]">
              These sites are blocked and will not load in the browser.
            </p>
            <div className="flex gap-3">
              <input
                className="ml-4 pl-4 py-3 bg-[#D9E5D9] rounded-xl w-110"
                placeholder="Enter website URL or domain"
                type="text"
              />
              <label className="pt-3 px-7 bg-linear-to-b from-[#f1c3b1] to-[#eea571] rounded-[100]">
                <input type="button" />+ Add Item
              </label>
            </div>
            <div className="border-t-1 mt-4 pt-2">
              <div className="flex gap-100 pl-4 pb-4 pt-2 border-b-1">
                <h1>www.roblox.com</h1>
                <div className="flex gap-3">
                  <div
                    onClick={() => setEnabled(!enabled)}
                    className={`w-12 h-6 flex items-center px-1 rounded-full cursor-pointer transition-colors ${
                      enabled ? "bg-teal-800" : "bg-gray-300"
                    }`}
                  >
                    <motion.div
                      animate={{ x: enabled ? 24 : 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 700,
                        damping: 30,
                      }}
                      className="w-4 h-4 bg-white rounded-full shadow"
                    />
                  </div>
                  <h3>Trash</h3>
                </div>
                <div />
                <div />
                <div />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 bg-white border-1 rounded-lg ">
          <h1 className="pt-6 pl-5 pb-2 text-[#EE9471] text-xl font-bold">
            Flagged Event Logs
          </h1>
          <p className="pl-5 pt-2 pb-5 text-[#616161]">
            Records of events marked for attention due to unusual or important
            activity.
          </p>
          <input
            className="ml-4 pl-4 py-3 bg-[#D9E5D9] rounded-xl w-110"
            placeholder="Search by user or website"
            type="text"
          />
          <select className="ml-2 pl-3 border-1 w-50 py-3 rounded-xl bg-[#FFF]">
            <option value="Date Range">Date Range</option>
          </select>

          <table className="table-auto mt-5 text-left w-276">
            <thead>
              <tr className="font-bold border-y-1 rounded-2xl">
                <th className="pl-8 py-5">User</th>
                <th className="pl-15">Website/App</th>
                <th className="pl-3">Type</th>
                <th className="pl-0">Confidence Score</th>
                <th className="w-100">Timestamp</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-y-1 rounded-b-2xl">
                <td className="pl-8 py-5 font-bold">Jhana</td>
                <td className="text-gray-700 pl-15 w-80">www.facebook.com</td>
                <td className="text-gray-700 font-bold pl-3 w-80">Violence</td>
                <td className="pl-10 w-xl font-bold text-red-700">0.96</td>
                <td className="text-gray-700">2025-07-09 10:42 A.M.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

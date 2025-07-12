"use client";

import NavBar from "@/components/navbar";
import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";

// Child profiles data
const childProfiles = {
  1: {
    id: 1,
    name: "Patric",
    age: 14,
    avatar: "/public/avatars/patric.png",
    devices: [
      {
        name: "Laptop",
        status: "online",
        lastUsed: "2025-07-11 09:30 AM",
        screenTime: "4h 32m",
      },
      {
        name: "Phone",
        status: "offline",
        lastUsed: "2025-07-10 11:45 PM",
        screenTime: "2h 15m",
      },
    ],
    weeklyStats: {
      totalScreenTime: "28h 15m",
      averageDaily: "4h 2m",
      blockedAttempts: 12,
      flaggedEvents: 3,
    },
    recentApps: [
      { name: "Discord", time: "2h 15m", category: "Social" },
      { name: "YouTube", time: "1h 45m", category: "Entertainment" },
      { name: "Chrome", time: "45m", category: "Browser" },
    ],
  },
  2: {
    id: 2,
    name: "Stanley",
    age: 12,
    avatar: "/public/avatars/stanley.png",
    devices: [
      {
        name: "PC",
        status: "online",
        lastUsed: "2025-07-11 08:15 AM",
        screenTime: "3h 45m",
      },
    ],
    weeklyStats: {
      totalScreenTime: "22h 30m",
      averageDaily: "3h 12m",
      blockedAttempts: 8,
      flaggedEvents: 2,
    },
    recentApps: [
      { name: "Minecraft", time: "2h 30m", category: "Gaming" },
      { name: "YouTube", time: "1h 15m", category: "Entertainment" },
    ],
  },
  3: {
    id: 3,
    name: "Gianne",
    age: 16,
    avatar: "/public/avatars/gianne.png",
    devices: [
      {
        name: "PC",
        status: "offline",
        lastUsed: "2025-07-10 11:45 PM",
        screenTime: "5h 12m",
      },
    ],
    weeklyStats: {
      totalScreenTime: "35h 45m",
      averageDaily: "5h 6m",
      blockedAttempts: 15,
      flaggedEvents: 1,
    },
    recentApps: [
      { name: "Instagram", time: "3h 20m", category: "Social" },
      { name: "TikTok", time: "1h 52m", category: "Entertainment" },
    ],
  },
  4: {
    id: 4,
    name: "Jhana",
    age: 13,
    avatar: "/public/avatars/jhana.png",
    devices: [
      {
        name: "Laptop",
        status: "online",
        lastUsed: "2025-07-11 07:20 AM",
        screenTime: "3h 28m",
      },
    ],
    weeklyStats: {
      totalScreenTime: "24h 15m",
      averageDaily: "3h 27m",
      blockedAttempts: 18,
      flaggedEvents: 4,
    },
    recentApps: [
      { name: "Roblox", time: "2h 45m", category: "Gaming" },
      { name: "Facebook", time: "45m", category: "Social" },
    ],
  },
};

// All flagged events data
const allFlaggedEvents = [
  {
    id: 1,
    timestamp: "2025-07-11 10:42 AM",
    userId: 4,
    user: "Jhana",
    sourceDevice: "Laptop",
    websiteApp: "www.facebook.com",
    contentSnippet: "Posted violent content about drugs",
    label: "Violence",
    action: "Blocked",
    severity: "High",
  },
  {
    id: 2,
    timestamp: "2025-07-11 09:15 AM",
    userId: 2,
    user: "Stanley",
    sourceDevice: "PC",
    websiteApp: "youtube.com",
    contentSnippet: "Watched inappropriate video...",
    label: "Sexual",
    action: "Warned",
    severity: "Medium",
  },
  {
    id: 3,
    timestamp: "2025-07-10 11:30 PM",
    userId: 1,
    user: "Patric",
    sourceDevice: "Laptop",
    websiteApp: "discord.com",
    contentSnippet: "Used profanity in chat...",
    label: "Profanity",
    action: "Blocked",
    severity: "Low",
  },
  {
    id: 4,
    timestamp: "2025-07-10 08:22 AM",
    userId: 3,
    user: "Gianne",
    sourceDevice: "PC",
    websiteApp: "twitter.com",
    contentSnippet: "Shared hate speech content...",
    label: "Hate Speech",
    action: "Blocked",
    severity: "High",
  },
  {
    id: 5,
    timestamp: "2025-07-09 03:45 PM",
    userId: 4,
    user: "Jhana",
    sourceDevice: "Laptop",
    websiteApp: "reddit.com",
    contentSnippet: "Posted violent imagery about terrorism",
    label: "Violence",
    action: "Warned",
    severity: "Medium",
  },
  {
    id: 6,
    timestamp: "2025-07-09 02:15 PM",
    userId: 2,
    user: "Stanley",
    sourceDevice: "PC",
    websiteApp: "instagram.com",
    contentSnippet: "Viewed inappropriate content with patotoy and pukeke",
    label: "Sexual",
    action: "Blocked",
    severity: "High",
  },
  {
    id: 7,
    timestamp: "2025-07-08 04:22 PM",
    userId: 1,
    user: "Patric",
    sourceDevice: "Laptop",
    websiteApp: "tiktok.com",
    contentSnippet: "Attempted to access blocked content...",
    label: "Inappropriate",
    action: "Blocked",
    severity: "Low",
  },
  {
    id: 8,
    timestamp: "2025-07-08 01:15 PM",
    userId: 4,
    user: "Jhana",
    sourceDevice: "Laptop",
    websiteApp: "snapchat.com",
    contentSnippet:
      "Shared inappropriate image that involves schlongs and pukeke",
    label: "Sexual",
    action: "Blocked",
    severity: "High",
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

export default function ChildProfile() {
  const params = useParams();
  const childId = parseInt(params.id);
  const child = childProfiles[childId];

  // Flagged Events state
  const [searchTerm, setSearchTerm] = React.useState("");
  const [dateFilter, setDateFilter] = React.useState("all");
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 5;

  // Filter events for this specific child
  const childEvents = allFlaggedEvents.filter(
    (event) => event.userId === childId
  );

  // Apply search and date filters
  const filteredEvents = childEvents.filter((event) => {
    const matchesSearch =
      event.websiteApp.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.contentSnippet.toLowerCase().includes(searchTerm.toLowerCase());

    const eventDate = new Date(event.timestamp);
    const today = new Date();
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    let matchesDate = true;
    if (dateFilter === "today") {
      matchesDate = eventDate.toDateString() === today.toDateString();
    } else if (dateFilter === "yesterday") {
      matchesDate = eventDate.toDateString() === yesterday.toDateString();
    } else if (dateFilter === "week") {
      matchesDate = eventDate >= weekAgo;
    }

    return matchesSearch && matchesDate;
  });

  // Pagination
  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEvents = filteredEvents.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  if (!child) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Child Not Found
          </h1>
          <Link href="/dashboard" className="text-[#03585F] hover:underline">
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <NavBar />

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <Link href="/dashboard">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg border border-gray-200 hover:border-[#03585F] transition-colors"
              >
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </motion.button>
            </Link>
            <div className="w-20 h-20 bg-gradient-to-br from-[#03585F] to-[#095c62] rounded-3xl flex items-center justify-center text-3xl font-bold text-white shadow-xl">
              {child.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-[#03585F] to-[#095c62] bg-clip-text text-transparent">
                {child.name}'s Profile
              </h1>
              <p className="text-lg text-gray-600 mt-2">
                Age {child.age} • Monitor activity and manage digital safety
              </p>
            </div>
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Weekly Screen Time</p>
                <p className="text-2xl font-bold text-gray-900">
                  {child.weeklyStats.totalScreenTime}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Daily Average</p>
                <p className="text-2xl font-bold text-gray-900">
                  {child.weeklyStats.averageDaily}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L5.636 5.636"
                  />
                </svg>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Blocked Attempts</p>
                <p className="text-2xl font-bold text-gray-900">
                  {child.weeklyStats.blockedAttempts}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Flagged Events</p>
                <p className="text-2xl font-bold text-gray-900">
                  {child.weeklyStats.flaggedEvents}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Devices and Recent Apps */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Devices */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-[#03585F] to-[#095c62] px-8 py-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                Connected Devices
              </h2>
            </div>
            <div className="p-8">
              <div className="space-y-4">
                {child.devices.map((device, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          device.status === "online"
                            ? "bg-green-500 animate-pulse"
                            : "bg-gray-400"
                        }`}
                      ></div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {device.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {formatLastUsed(device.lastUsed)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-[#03585F]">
                        {device.screenTime}
                      </p>
                      <p className="text-xs text-gray-500 capitalize">
                        {device.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Recent Apps */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-[#f1c3b1] to-[#eea571] px-8 py-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                Most Used Apps
              </h2>
            </div>
            <div className="p-8">
              <div className="space-y-4">
                {child.recentApps.map((app, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold">
                        {app.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {app.name}
                        </h3>
                        <p className="text-sm text-gray-600">{app.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-[#03585F]">{app.time}</p>
                      <p className="text-xs text-gray-500">Today</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Event Logs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden"
        >
          <div className="bg-gradient-to-r from-[#EE9471] to-[#f1c3b1] px-8 py-6">
            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              {child.name}'s Event History
            </h2>
            <p className="text-white/90 mt-2 text-lg">
              All flagged events and activities for this child
            </p>
          </div>

          {/* Filters */}
          <div className="p-8 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-1 relative">
                <svg
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#03585F] focus:border-transparent transition-all duration-300 placeholder-gray-500 shadow-sm"
                  placeholder="Search events..."
                  type="text"
                />
              </div>
              <div className="relative">
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="appearance-none pl-4 pr-12 py-4 border border-gray-200 rounded-2xl bg-white focus:outline-none focus:ring-2 focus:ring-[#03585F] focus:border-transparent transition-all duration-300 shadow-sm min-w-[150px]"
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="yesterday">Yesterday</option>
                  <option value="week">This Week</option>
                </select>
                <svg
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Event Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-gray-100 to-gray-200 border-b border-gray-300">
                  <th className="px-6 py-5 text-left text-sm font-bold text-gray-900 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Timestamp
                    </div>
                  </th>
                  <th className="px-6 py-5 text-left text-sm font-bold text-gray-900 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      Device
                    </div>
                  </th>
                  <th className="px-6 py-5 text-left text-sm font-bold text-gray-900 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                        />
                      </svg>
                      Website/App
                    </div>
                  </th>
                  <th className="px-6 py-5 text-left text-sm font-bold text-gray-900 uppercase tracking-wider">
                    Content
                  </th>
                  <th className="px-6 py-5 text-left text-sm font-bold text-gray-900 uppercase tracking-wider">
                    Label
                  </th>
                  <th className="px-6 py-5 text-left text-sm font-bold text-gray-900 uppercase tracking-wider">
                    Action
                  </th>
                  <th className="px-6 py-5 text-left text-sm font-bold text-gray-900 uppercase tracking-wider">
                    Severity
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedEvents.length > 0 ? (
                  paginatedEvents.map((event, index) => (
                    <motion.tr
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 transition-all duration-300"
                    >
                      <td className="px-6 py-5 text-sm text-gray-900 font-medium">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          {formatLastUsed(event.timestamp)}
                        </div>
                      </td>
                      <td className="px-6 py-5 text-sm text-gray-700">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                            <svg
                              className="w-4 h-4 text-gray-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                          {event.sourceDevice}
                        </div>
                      </td>
                      <td className="px-6 py-5 text-sm text-gray-700">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            <svg
                              className="w-4 h-4 text-blue-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                              />
                            </svg>
                          </div>
                          {event.websiteApp}
                        </div>
                      </td>
                      <td className="px-6 py-5 text-sm text-gray-700 max-w-xs">
                        <div className="group relative">
                          <div className="truncate cursor-help">
                            {event.contentSnippet}
                          </div>
                          {event.contentSnippet.length > 30 && (
                            <div className="absolute z-[9999] invisible group-hover:visible bg-gray-900 text-white text-sm rounded-lg px-4 py-3 bottom-full left-1/2 transform -translate-x-1/2 mb-2 whitespace-normal max-w-md shadow-2xl border border-gray-700">
                              {event.contentSnippet}
                              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-5 text-sm">
                        <span
                          className={`inline-flex px-3 py-2 rounded-full text-xs font-bold shadow-sm ${
                            event.label === "Violence"
                              ? "bg-gradient-to-r from-red-100 to-red-200 text-red-800 border border-red-300"
                              : event.label === "Sexual"
                              ? "bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 border border-purple-300"
                              : event.label === "Profanity"
                              ? "bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border border-yellow-300"
                              : event.label === "Hate Speech"
                              ? "bg-gradient-to-r from-orange-100 to-orange-200 text-orange-800 border border-orange-300"
                              : "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border border-gray-300"
                          }`}
                        >
                          {event.label}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-sm">
                        <span
                          className={`inline-flex px-3 py-2 rounded-full text-xs font-bold shadow-sm ${
                            event.action === "Blocked"
                              ? "bg-gradient-to-r from-red-100 to-red-200 text-red-800 border border-red-300"
                              : event.action === "Warned"
                              ? "bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border border-yellow-300"
                              : "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border border-gray-300"
                          }`}
                        >
                          {event.action}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-sm">
                        <span
                          className={`inline-flex px-3 py-2 rounded-full text-xs font-bold shadow-sm ${
                            event.severity === "High"
                              ? "bg-gradient-to-r from-red-100 to-red-200 text-red-800 border border-red-300"
                              : event.severity === "Medium"
                              ? "bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border border-yellow-300"
                              : "bg-gradient-to-r from-green-100 to-green-200 text-green-800 border border-green-300"
                          }`}
                        >
                          {event.severity}
                        </span>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-16 text-center">
                      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg
                          className="w-12 h-12 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                          />
                        </svg>
                      </div>
                      <p className="text-gray-500 text-xl font-semibold">
                        No events found
                      </p>
                      <p className="text-gray-400 text-sm mt-2">
                        This child has a clean record!
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-8 py-6 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-700 font-medium">
                Showing{" "}
                <span className="font-bold text-[#03585F]">
                  {startIndex + 1}
                </span>{" "}
                to{" "}
                <span className="font-bold text-[#03585F]">
                  {Math.min(startIndex + itemsPerPage, filteredEvents.length)}
                </span>{" "}
                of{" "}
                <span className="font-bold text-[#03585F]">
                  {filteredEvents.length}
                </span>{" "}
                results
              </div>
              <div className="flex items-center gap-2">
                <motion.button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  whileHover={{ scale: currentPage === 1 ? 1 : 1.05 }}
                  whileTap={{ scale: currentPage === 1 ? 1 : 0.95 }}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 shadow-sm"
                  }`}
                >
                  Previous
                </motion.button>

                {[...Array(totalPages)].map((_, i) => (
                  <motion.button
                    key={i + 1}
                    onClick={() => goToPage(i + 1)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-10 h-10 rounded-xl text-sm font-bold transition-all duration-200 ${
                      currentPage === i + 1
                        ? "bg-gradient-to-r from-[#03585F] to-[#095c62] text-white shadow-lg"
                        : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 shadow-sm"
                    }`}
                  >
                    {i + 1}
                  </motion.button>
                ))}

                <motion.button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  whileHover={{ scale: currentPage === totalPages ? 1 : 1.05 }}
                  whileTap={{ scale: currentPage === totalPages ? 1 : 0.95 }}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 shadow-sm"
                  }`}
                >
                  Next
                </motion.button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

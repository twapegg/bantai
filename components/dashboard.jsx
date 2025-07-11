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
  const [filters, setFilters] = React.useState({
    textFilter: false,
    audioFilter: false,
    visualFilter: false,
    strictMode: false,
  });

  const [categories, setCategories] = React.useState({
    violence: false,
    sexual: false,
    profanity: false,
    hateSpeech: false,
  });

  const [blockedSites, setBlockedSites] = React.useState([
    { url: "www.roblox.com", enabled: false },
  ]);

  const [newSiteUrl, setNewSiteUrl] = React.useState("");
  const [isSyncing, setIsSyncing] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);

  // Flagged Events state
  const [searchTerm, setSearchTerm] = React.useState("");
  const [dateFilter, setDateFilter] = React.useState("all");
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 5;

  // Dummy flagged events data
  const flaggedEvents = [
    {
      id: 1,
      timestamp: "2025-07-10 10:42 AM",
      user: "Jhana",
      sourceDevice: "Laptop",
      websiteApp: "www.facebook.com",
      contentSnippet: "Posted violent content about...",
      label: "Violence",
      action: "Blocked",
    },
    {
      id: 2,
      timestamp: "2025-07-10 09:15 AM",
      user: "Stanley",
      sourceDevice: "PC",
      websiteApp: "youtube.com",
      contentSnippet: "Watched inappropriate video...",
      label: "Sexual",
      action: "Warned",
    },
    {
      id: 3,
      timestamp: "2025-07-09 11:30 PM",
      user: "Patric",
      sourceDevice: "Laptop",
      websiteApp: "discord.com",
      contentSnippet: "Used profanity in chat...",
      label: "Profanity",
      action: "Blocked",
    },
    {
      id: 4,
      timestamp: "2025-07-09 08:22 AM",
      user: "Gianne",
      sourceDevice: "PC",
      websiteApp: "twitter.com",
      contentSnippet: "Shared hate speech content...",
      label: "Hate Speech",
      action: "Blocked",
    },
    {
      id: 5,
      timestamp: "2025-07-08 03:45 PM",
      user: "Jhana",
      sourceDevice: "Laptop",
      websiteApp: "reddit.com",
      contentSnippet: "Posted violent imagery...",
      label: "Violence",
      action: "Warned",
    },
    {
      id: 6,
      timestamp: "2025-07-08 02:15 PM",
      user: "Stanley",
      sourceDevice: "PC",
      websiteApp: "instagram.com",
      contentSnippet: "Viewed inappropriate content...",
      label: "Sexual",
      action: "Blocked",
    },
  ];

  // Filter events based on search and date
  const filteredEvents = flaggedEvents.filter((event) => {
    const matchesSearch =
      event.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.websiteApp.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.label.toLowerCase().includes(searchTerm.toLowerCase());

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

  const toggleFilter = (filterName) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: !prev[filterName],
    }));
  };

  const toggleCategory = (categoryName) => {
    setCategories((prev) => ({
      ...prev,
      [categoryName]: !prev[categoryName],
    }));
  };

  const toggleBlockedSite = (index) => {
    setBlockedSites((prev) =>
      prev.map((site, i) =>
        i === index ? { ...site, enabled: !site.enabled } : site
      )
    );
  };

  const addBlockedSite = () => {
    if (newSiteUrl.trim()) {
      setBlockedSites((prev) => [
        ...prev,
        { url: newSiteUrl.trim(), enabled: true },
      ]);
      setNewSiteUrl("");
    }
  };

  const deleteBlockedSite = (index) => {
    setBlockedSites((prev) => prev.filter((_, i) => i !== index));
  };

  const syncDevices = async () => {
    setIsSyncing(true);
    try {
      // Simulate API call to sync devices
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Devices synced successfully");
      // Here you would make an actual API call to sync devices
    } catch (error) {
      console.error("Error syncing devices:", error);
    } finally {
      setIsSyncing(false);
    }
  };

  const saveSettings = async () => {
    setIsSaving(true);
    try {
      const settingsData = {
        filters,
        categories,
        blockedSites,
        timestamp: new Date().toISOString(),
      };

      // Simulate API call to save settings
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Settings saved:", settingsData);
      // Here you would make an actual API call to save to database
      // Example: await fetch('/api/settings', { method: 'POST', body: JSON.stringify(settingsData) })
    } catch (error) {
      console.error("Error saving settings:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pb-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <NavBar />

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-[#03585F] to-[#095c62] rounded-2xl flex items-center justify-center shadow-lg">
              <svg
                className="w-8 h-8 text-white"
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
              <h1 className="text-5xl font-bold bg-gradient-to-r from-[#03585F] to-[#095c62] bg-clip-text text-transparent">
                Dashboard
              </h1>
              <p className="text-lg text-gray-600 mt-2">
                Easily manage your child's digital activity with customizable
                controls and real-time tracking.
              </p>
            </div>
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        </motion.div>

        {/* Devices & Children Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-10"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Devices & Children
              </h2>
              <p className="text-gray-600">
                Monitor and manage all connected devices
              </p>
            </div>
            <button
              onClick={syncDevices}
              disabled={isSyncing}
              className={`px-8 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg ${
                isSyncing
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-[#a6c2aa] to-[#095c62] text-white hover:shadow-2xl hover:scale-105 active:scale-95"
              }`}
            >
              {isSyncing ? (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                  Syncing...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Sync Devices
                </div>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {devicesAndChildren.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href={`/child/${item.id}`}>
                  <div className="group relative bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#D9E5D9] to-[#03585F] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#03585F] to-[#095c62] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <div className="relative z-10 text-center">
                      <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-[#03585F] to-[#095c62] group-hover:from-white group-hover:to-gray-100 rounded-3xl flex items-center justify-center text-2xl font-bold text-white group-hover:text-[#03585F] transition-all duration-300 shadow-xl">
                        {item.child_name.charAt(0)}
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-white transition-colors duration-300 mb-2">
                        {item.child_name}
                      </h3>

                      <div className="flex items-center justify-center gap-2 mb-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <p className="text-gray-600 group-hover:text-gray-200 transition-colors duration-300">
                          {item.device}
                        </p>
                      </div>

                      <p className="text-sm text-gray-500 group-hover:text-gray-300 transition-colors duration-300">
                        {formatLastUsed(item.last_used)}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
        {/* Settings Panels */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10"
        >
          {/* Filter Settings */}
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden backdrop-blur-sm">
            <div className="bg-gradient-to-r from-[#03585F] to-[#095c62] px-8 py-6 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#03585F]/90 to-[#095c62]/90 backdrop-blur-sm"></div>
              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
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
                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                      />
                    </svg>
                  </div>
                  Filter Settings
                </h2>
                <p className="text-white/90 mt-2">
                  Configure content filtering rules
                </p>
              </div>
            </div>

            <div className="p-8">
              <div className="space-y-6">
                {[
                  {
                    key: "textFilter",
                    label: "Text Filter",
                    desc: "Filter inappropriate text content",
                    icon: "📝",
                  },
                  {
                    key: "audioFilter",
                    label: "Audio Filter",
                    desc: "Monitor audio content",
                    icon: "🎵",
                  },
                  {
                    key: "visualFilter",
                    label: "Visual Filter",
                    desc: "Scan visual content",
                    icon: "👁️",
                  },
                  {
                    key: "strictMode",
                    label: "Strict Mode",
                    desc: "Enhanced filtering rules",
                    icon: "🔒",
                  },
                ].map((filter) => (
                  <motion.div
                    key={filter.key}
                    className="group"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="flex items-center justify-between p-5 rounded-2xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 transition-all duration-300 border border-transparent hover:border-gray-200">
                      <div className="flex items-center gap-4">
                        <div className="text-2xl">{filter.icon}</div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {filter.label}
                          </h3>
                          <p className="text-sm text-gray-500">{filter.desc}</p>
                        </div>
                      </div>
                      <div
                        onClick={() => toggleFilter(filter.key)}
                        className={`w-16 h-8 flex items-center px-1 rounded-full cursor-pointer transition-all duration-300 shadow-inner ${
                          filters[filter.key]
                            ? "bg-gradient-to-r from-[#03585F] to-[#095c62] shadow-lg"
                            : "bg-gray-300 hover:bg-gray-400"
                        }`}
                      >
                        <motion.div
                          animate={{ x: filters[filter.key] ? 32 : 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 700,
                            damping: 30,
                          }}
                          className={`w-6 h-6 rounded-full shadow-lg transition-all duration-300 ${
                            filters[filter.key] ? "bg-white" : "bg-white"
                          }`}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-10 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#03585F] to-[#095c62] rounded-xl flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                  </div>
                  Content Categories
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      key: "violence",
                      label: "Violence",
                      color: "from-red-500 to-red-600",
                      icon: "⚔️",
                    },
                    {
                      key: "sexual",
                      label: "Sexual",
                      color: "from-purple-500 to-purple-600",
                      icon: "🔞",
                    },
                    {
                      key: "profanity",
                      label: "Profanity",
                      color: "from-yellow-500 to-yellow-600",
                      icon: "🤬",
                    },
                    {
                      key: "hateSpeech",
                      label: "Hate Speech",
                      color: "from-orange-500 to-orange-600",
                      icon: "🚫",
                    },
                  ].map((category) => (
                    <motion.div
                      key={category.key}
                      className="group"
                      whileHover={{ scale: 1.02 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                    >
                      <div className="flex items-center justify-between p-4 rounded-xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 transition-all duration-300 border border-transparent hover:border-gray-200">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">{category.icon}</span>
                          <span className="font-medium text-gray-700">
                            {category.label}
                          </span>
                        </div>
                        <div
                          onClick={() => toggleCategory(category.key)}
                          className={`w-14 h-7 flex items-center px-1 rounded-full cursor-pointer transition-all duration-300 shadow-inner ${
                            categories[category.key]
                              ? `bg-gradient-to-r ${category.color} shadow-lg`
                              : "bg-gray-300 hover:bg-gray-400"
                          }`}
                        >
                          <motion.div
                            animate={{ x: categories[category.key] ? 28 : 0 }}
                            transition={{
                              type: "spring",
                              stiffness: 700,
                              damping: 30,
                            }}
                            className="w-5 h-5 bg-white rounded-full shadow-md"
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Blocked Sites */}
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden backdrop-blur-sm">
            <div className="bg-gradient-to-r from-[#f1c3b1] to-[#eea571] px-8 py-6 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#f1c3b1]/90 to-[#eea571]/90 backdrop-blur-sm"></div>
              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
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
                        d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L5.636 5.636"
                      />
                    </svg>
                  </div>
                  Blocked Sites
                </h2>
                <p className="text-white/90 mt-2">
                  These sites are blocked and will not load in the browser.
                </p>
              </div>
            </div>

            <div className="p-8">
              <div className="flex gap-3 mb-6">
                <input
                  value={newSiteUrl}
                  onChange={(e) => setNewSiteUrl(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addBlockedSite()}
                  className="flex-1 px-5 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#03585F] focus:border-transparent transition-all duration-300 placeholder-gray-500"
                  placeholder="Enter website URL or domain"
                  type="text"
                />
                <motion.button
                  onClick={addBlockedSite}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-[#f1c3b1] to-[#eea571] rounded-2xl text-white font-semibold hover:shadow-lg transition-all duration-200 shadow-lg"
                >
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    Add
                  </div>
                </motion.button>
              </div>

              <div className="space-y-3">
                {blockedSites.map((site, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center justify-between p-5 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl hover:from-gray-100 hover:to-gray-200 transition-all duration-300 group border border-gray-200"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center">
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
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <span className="text-gray-900 font-medium">
                        {site.url}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div
                        onClick={() => toggleBlockedSite(index)}
                        className={`w-14 h-7 flex items-center px-1 rounded-full cursor-pointer transition-all duration-300 shadow-inner ${
                          site.enabled
                            ? "bg-gradient-to-r from-red-500 to-red-600 shadow-lg"
                            : "bg-gray-300 hover:bg-gray-400"
                        }`}
                      >
                        <motion.div
                          animate={{ x: site.enabled ? 28 : 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 700,
                            damping: 30,
                          }}
                          className="w-5 h-5 bg-white rounded-full shadow-md"
                        />
                      </div>
                      <motion.button
                        onClick={() => deleteBlockedSite(index)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-red-500 hover:text-red-700 font-medium transition-colors opacity-0 group-hover:opacity-100 px-3 py-1 rounded-lg hover:bg-red-50"
                      >
                        Delete
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
                {blockedSites.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8 text-gray-400"
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
                    <p className="text-gray-500 text-lg">
                      No blocked sites added yet.
                    </p>
                    <p className="text-gray-400 text-sm mt-2">
                      Add a site above to get started.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Save Settings Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex justify-center mb-12"
        >
          <motion.button
            onClick={saveSettings}
            disabled={isSaving}
            whileHover={{ scale: isSaving ? 1 : 1.05 }}
            whileTap={{ scale: isSaving ? 1 : 0.95 }}
            className={`px-16 py-5 rounded-3xl font-bold text-lg transition-all duration-300 shadow-2xl ${
              isSaving
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-[#03585F] to-[#095c62] text-white hover:shadow-3xl"
            }`}
          >
            {isSaving ? (
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                Saving Settings...
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Save All Settings
              </div>
            )}
          </motion.button>
        </motion.div>
        {/* Flagged Event Logs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden backdrop-blur-sm"
        >
          <div className="bg-gradient-to-r from-[#EE9471] to-[#f1c3b1] px-8 py-6 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#EE9471]/90 to-[#f1c3b1]/90 backdrop-blur-sm"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
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
                Flagged Event Logs
              </h2>
              <p className="text-white/90 mt-2 text-lg">
                Records of events marked for attention due to unusual or
                important activity.
              </p>
            </div>
          </div>

          {/* Enhanced Filters */}
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
                  placeholder="Search by user, website, or label..."
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

          {/* Enhanced Table */}
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
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      User
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
                      className="hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 transition-all duration-300 group"
                    >
                      <td className="px-6 py-5 text-sm text-gray-900 font-medium">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          {formatLastUsed(event.timestamp)}
                        </div>
                      </td>
                      <td className="px-6 py-5 text-sm">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-[#03585F] to-[#095c62] rounded-full flex items-center justify-center text-white font-bold">
                            {event.user.charAt(0)}
                          </div>
                          <span className="font-medium text-gray-900">
                            {event.user}
                          </span>
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
                      <td className="px-6 py-5 text-sm  text-center ">
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
                        Try adjusting your search or filter criteria.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Enhanced Pagination */}
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

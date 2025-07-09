"use client";

import NavBar from "@/components/navbar.js";
import * as React from "react";
import { motion } from "framer-motion";

export default function DashboardPage() {
    const [enabled, setEnabled] = React.useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
        <div className="page-container 
                    bg-gray-100
                    text-black
                    mx-auto 
                    max-w-6xl 
                    px-6 
                    py-6"
        >
            <NavBar />
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <p className="border-b-1 pb-7">Easily manage your child's digital activity with customizable controls and real-time tracking.</p>
            <h1 className="text-2xl font-bold mt-2 mb-4">Users & Devices</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                
                <div className="bg-[#03585F] pb-5 rounded-2xl items-center justify-center border-1 text-center shadow-sm">
                    <h1 className="mt-5 w-14 pt-2 pb-2 mx-auto text-3xl text-[#03585F] rounded-[100] bg-[#D9E5D9] border-1 border-[#D9E5D9]">P</h1>
                    <h1 className="mt-2 text-3xl font-bold text-white">Patric</h1>
                    <p className="mt-2 font-light text-white">Laptop</p>
                </div>

                <div className="bg-[#D9E5D9] pb-5 rounded-2xl items-center justify-center border-1 text-center shadow-sm">
                    <h1 className="mt-5 w-14 pt-2 pb-2 mx-auto text-3xl text-[#D9E5D9] rounded-[100] bg-[#03585F] border-1 border-[#03585F]">S</h1>
                    <h1 className="mt-2 text-3xl font-bold text-[#03585F]">Stanley</h1>
                    <p className="mt-2 text-[#03585F] font-light">PC</p>
                </div>

                <div className="bg-[#D9E5D9] pb-5 rounded-2xl items-center justify-center border-1 text-center shadow-sm">
                    <h1 className="mt-5 w-14 pt-2 pb-2 mx-auto text-3xl text-[#D9E5D9] rounded-[100] bg-[#03585F] border-1 border-[#03585F]">G</h1>
                    <h1 className="mt-2 text-3xl font-bold text-[#03585F]">Gianne</h1>
                    <p className="mt-2 text-[#03585F] font-light">PC</p>
                </div>

                <div className="bg-[#D9E5D9] pb-5 rounded-2xl items-center justify-center border-1 text-center shadow-sm">
                    <h1 className="mt-5 w-14 pt-2 pb-2 mx-auto text-3xl text-[#D9E5D9] rounded-[100] bg-[#03585F] border-1 border-[#03585F]">J</h1>
                    <h1 className="mt-2 text-3xl font-bold text-[#03585F]">Jhana</h1>
                    <p className="mt-2 text-[#03585F] font-light">Laptop</p>
                </div>
            </div>
            <div className="mt-5 flex gap-4">
                <div className="w-md rounded-2xl items-center justify-center border-1 shadow-sm">
                    <h1 className="pl-4 pt-2 pb-2 rounded-t-2xl text-white font-bold bg-linear-to-r from-[#AFC8AF] to-[#03585F]">Filter Settings</h1>
                    <div className="pt-5 bg-white">
                        <div className="mt-5 flex gap-65">
                            <h1 className="ml-4 pr-3">Text Filter</h1>
                            <div
                                onClick={() => setEnabled(!enabled)}
                                className={`w-12 h-6 flex items-center px-1 rounded-full cursor-pointer transition-colors ${
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

                        <div className="mt-5 flex gap-65">
                            <h1 className="ml-4">Audio Filter</h1>
                            <div
                                onClick={() => setEnabled(!enabled)}
                                className={`w-12 h-6 flex items-center px-1 rounded-full cursor-pointer transition-colors ${
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

                        <div className="mt-5 flex gap-65">
                            <h1 className="ml-4">Visual Filter</h1>
                            <div
                                onClick={() => setEnabled(!enabled)}
                                className={`w-12 h-6 flex items-center px-1 rounded-full cursor-pointer transition-colors ${
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

                        <div className="mt-5 flex gap-65">
                            <h1 className="ml-4">Strict Mode</h1>
                            <div
                                onClick={() => setEnabled(!enabled)}
                                className={`w-12 h-6 flex items-center px-1 rounded-full cursor-pointer transition-colors ${
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

                        <h1 className="mt-7 ml-4 pb-3 font-bold">Content Categories</h1>
                        <div className="ml-4 flex flex-col pb-5">
                            <label>
                                <input className="size-5 mr-2" type="checkbox" />
                                Violence
                            </label>
                            <label>
                                <input className="size-5 mr-2" type="checkbox" />
                                Sexual
                            </label>
                            <label>
                                <input className="size-5 mr-2" type="checkbox" />
                                Profanity
                            </label>
                            <label>
                                <input className="size-5 mr-2" type="checkbox" />
                                Hate Speech
                            </label>
                        </div>
                    </div>
                </div>
                <div className="w-2xl rounded-2xl items-center bg-white justify-center border-1 shadow-sm">
                    <h1 className="pl-4 pt-2 rounded-t-2xl font-bold text-[#03585F]">Blocked Sites</h1>
                    <p className="pl-4 pt-2 font-light">These sites are blocked and will not load in the browser.</p>
                    <div className="flex gap-10">
                        <input className="ml-4 pl-2 py-2 bg-[#D9E5D9] rounded-xl w-110" placeholder="Enter website URL or domain" type="text" />
                        <label className="py-2 px-4 bg-linear-to-b from-[#f1c3b1] to-[#eea571] rounded-[100]">
                            <input type="button" />
                            + Add Item
                        </label>
                    </div>
                    <div className="border-t-1 mt-4 pt-2">
                            <div className="flex gap-100 pl-4 pb-2 border-b-1">
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
                                            transition={{ type: "spring", stiffness: 700, damping: 30 }}
                                            className="w-4 h-4 bg-white rounded-full shadow"
                                        />
                                    </div>
                                    <h3>TrashIcon</h3>
                                </div>
                            <div />
                            <div />
                            <div />
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-5 bg-white border-1 rounded-lg ">                
                <h1 className="pt-6 pl-6 pb-2 text-[#EE9471] font-bold">Flagged Event Logs</h1>
                <p className="pl-6 pb-2">Records of events marked for attention due to unusual or important activity.</p>
                <input className="ml-6 pl-2 py-2 bg-[#D9E5D9] rounded-xl w-110" placeholder="Search by user or website" type="text" />
                <select className="ml-2 border-1 w-50 py-2">
                    <option value="Date Range">Date Range</option>
                </select>

                <table className="table-auto mt-5 text-left w-276">
                    <thead>
                        <tr className="font-bold border-y-1 rounded-2xl">
                            <th className="pl-5 py-5">User</th>
                            <th className="">Website/App</th>
                            <th>Type</th>
                            <th>Confidence Score</th>
                            <th>Timestamp</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        <tr className="border-y-1 rounded-b-2xl">
                            <td className="pl-5 py-5 font-bold">Jhana</td>
                            <td className="text-gray-700">www.facebook.com</td>
                            <td className="text-gray-700 font-bold">Violence</td>
                            <td className="pl-10 w-xl text-red-700">0.96.</td>
                            <td className="text-gray-700">2025-07-09 10:42 A.M.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  );
}

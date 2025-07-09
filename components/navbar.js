"use client";

import Image from 'next/image';
import Link from "next/link";
import { Home, Settings } from "lucide-react";

const navItems = [
  { label: "Home", href: "/", icon: <Home className="w-4 h-4" /> },
  { label: "Settings", href: "/settings", icon: <Settings className="w-4 h-4" /> },
];

export default function NavBar() {
  return (
    <div>
      <header>
        <nav className={`bg-white pt-3 rounded-[100] pb-3 mb-10 mx-auto flex w-full items-center text-center justify-between`}>
          <a href={"/"}
            className={`ml-5 p-2 text-black font-extrabold`}>
              bant.ai
          </a>
          <a
          href={"/"}
          className={`pt-2 pb-2 pl-10 pr-10 mr-5 bg-linear-to-b from-[#f1c3b1] to-[#eea571] rounded-[100] text-white font-semibold`}
          >
            Log out
          </a>
        </nav>
      </header>
    </div>
  );
}

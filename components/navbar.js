"use client";

import Image from 'next/image';
import Link from "next/link";
import { Home, Settings } from "lucide-react";
import {signOut} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from 'next/navigation';

const navItems = [
  { label: "Home", href: "/", icon: <Home  className="w-4 h-4" /> },
  { label: "Settings", href: "/settings", icon: <Settings className="w-4 h-4" /> },
];

export default function NavBar() {
  const router = useRouter();

  const handleSignOut = async () => {
    try{
      await signOut(auth);
      router.push('/auth/login');
    }catch(error){
      console.error("Sign out error:", error);
      // Handle error (e.g., show a notification)
    }
  };  

  return (
    <div>
      <header>
        <nav className={`bg-white pt-3 rounded-[100] pb-3 mb-10 mx-auto flex w-full items-center text-center justify-between`}>
          <a href={"/"}
            className={`ml-5 p-2 text-black font-extrabold`}>
              bant.ai
          </a>

          <button className={`pt-2 pb-2 pl-10 pr-10 mr-5 bg-linear-to-b from-[#f1c3b1] to-[#eea571] rounded-[100] text-white font-semibold`}
            onClick={handleSignOut}>
            Log out
          </button>
        </nav>
      </header>
    </div>
  );
}

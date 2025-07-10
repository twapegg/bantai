"use client";
import NavBar from "@/components/navbar";
import Image from "next/image";

export default function Page() {
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
        <div className="flex items-center space-x-8">
          {/* left: stack heading and paragraph vertically */}
          <div className="flex flex-col max-w-xl">
            <h1 className="text-5xl leading-tight font-bold">
              Online Safety, <br />
              <span className="text-[#03585F]">Made </span>
              <span className="text-[#EE9471]">Simple</span>
            </h1>

            <p className="mt-4 text-[#616161]">
              Bant.ai helps parents protect their children by filtering out
              toxic language, blocking unsafe websites, and giving you smart,
              customizable controls. It runs quietly in the background so your
              child can explore safely — and you can relax.
            </p>

            <a
              href={"/homepage"}
              className={`pt-4 pb-4 pl-10 pr-10 w-100 mt-8 mr-5 bg-gradient-to-r from-[#f1c3b1] to-[#eea571] rounded-[100] text-white font-semibold`}
            >
              Download Browser Extension
            </a>
            <a
              href={"/homepage"}
              className={`pt-4 pb-4 pl-10 pr-10 w-100 mt-4 mr-5 bg-gradient-to-r from-[#a6c2aa] to-[#095c62] rounded-[100] text-white font-semibold`}
            >
              Download Desktop Application
            </a>
          </div>

          {/* right */}
          <div className="flex-shrink-0">
            <Image
              src="/header.png"
              alt="Header Image"
              width={500}
              height={500}
              className="w-full h-auto max-w-md"
            />
          </div>
        </div>
        {/* Features */}
        <div className="h-100 justify-center mt-10 bg-linear-to-b from-[#ebf1f0] to-[#d8e5e7] rounded-xl pt-10 pb-10">
          <h1 className="text-2xl text-center leading-tight font-bold">
            We're here to help with your concerns
          </h1>

          <p className="mt-3 text-center text-[#616161]">
            Whatever age your kids are, and whatever their needs, bant.ai can
            help reduce the risks they face online.
            <br /> to be continued duka naq
          </p>
        </div>
      </div>
    </div>
  );
}

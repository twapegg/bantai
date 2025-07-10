"use client";
import NavBar from "@/components/navbar";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Page() {
  const features = [
    {
      title: "Image & Video Safety Filter",
      description:
        "Automatically screens and blocks inappropriate or harmful images and videos before your child sees them.",
      icon: "🖼️",
      color: "#EE9471",
    },
    {
      title: "Audio Safety Filter",
      description:
        "Listens for unsafe or inappropriate language in music, videos, and voice chats, and filters it out to protect your child from harmful content.",
      icon: "🔊",
      color: "#095c62",
    },
    {
      title: "Safe Text Monitoring",
      description:
        "Keeps an eye on texts, chats, and online messages to detect bullying, bad language, or harmful topics, helping protect your child from online risks.",
      icon: "💬",
      color: "#a6c2aa",
    },
    {
      title: "Screen Overlay Protection",
      description:
        "Covers or blurs unsafe content on screen in real-time pop-ups so your child only sees what is safe.",
      icon: "🛡️",
      color: "#f1c3b1",
    },
    {
      title: "Emotional Wellness Monitor",
      description:
        "Uses voice, words, or expressions to gently detect signs of stress, sadness, or anger—alerting parents when extra support might be needed.",
      icon: "💖",
      color: "#FF9AA2",
    },
    {
      title: "Website Blocker",
      description:
        "Blocks access to dangerous or inappropriate websites to help kids stay focused and safe while browsing online.",
      icon: "🚫",
      color: "#8FB7B9",
    },
    {
      title: "Parental Dashboard",
      description:
        "An dashboard where parents can check activity, get alerts, manage screen time, set filters, and support their child's digital habits.",
      icon: "📊",
      color: "#03585F",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pb-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <NavBar />

        {/* Hero Section */}
        <div className="relative bg-white rounded-3xl pl-4 py-0 mx-4 md:mx-0 overflow-hidden mt-10 min-h-[500px] flex flex-col md:flex-row">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center px-8 py-12 w-full md:w-1/2 z-10"
          >
            <h1 className="text-5xl md:text-5xl font-bold leading-tight">
              Online Safety, <br />
              <span className="text-[#03585F]">Made </span>
              <span className="text-[#EE9471]">Simple</span>
            </h1>

            <p className="mt-6 text-[#555] text-lg leading-relaxed">
              Creating a safer digital space for children with intelligent and seamless protection.
            </p>

            {/* Buttons */}
            <div className="mt-8 space-y-4">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                href="/homepage"
                className="block w-fit px-10 py-4 text-white font-semibold rounded-3xl shadow-xl bg-gradient-to-r from-[#f1c3b1] to-[#eea571] transition-all duration-300"
              >
                Download Browser Extension
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                href="/homepage"
                className="block w-fit px-10 py-4 text-white font-semibold rounded-3xl shadow-xl bg-gradient-to-r from-[#a6c2aa] to-[#095c62] transition-all duration-300"
              >
                Download Desktop Application
              </motion.a>
            </div>
          </motion.div>

          {/* Right Image - Full height, half width */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative w-full md:w-1/2 min-h-[300px] md:min-h-full"
          >
            <Image
              src="/header.png"
              alt="Header Image"
              fill
              className="object-cover w-full h-full"
            />
          </motion.div>
        </div>

        {/* Feature Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="mt-10 px-6 py-12 max-w-7xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-center text-[#03585F] mb-4">
            Keeping your child safe online at every stage
          </h2>
          <p className="text-lg text-center text-[#555] max-w-5xl mx-auto mb-12">
            Bant.ai helps your child discover the internet safely while giving you peace of mind every step of the way.
          </p>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 * index }}
                className="bg-white rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-shadow duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div
                    className={`w-10 h-8 p-5 flex items-center justify-center rounded-full text-white font-bold text-xl`}
                    style={{ backgroundColor: feature.color }}
                  >
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#03585F] mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-[#555] text-sm">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mt-15 mx-auto max-w-7xl px-6"
        >
          <div className="flex flex-col md:flex-row items-center bg-gradient-to-r from-[#03585F] to-[#095c62] rounded-3xl overflow-hidden shadow-xl">
            {/* Left Image */}
            <div className="relative w-full md:w-1/2 min-h-[200px] md:min-h-[320px]">
              <Image
                src="/header.png"
                alt="Get Started"
                fill
                className="object-cover w-full h-full md:rounded-l-3xl"
              />
            </div>

            {/* Right Content */}
            <div className="relative z-10 text-white p-8 md:p-12 w-full md:w-1/2 text-center md:text-left">
              <h2 className="text-3xl font-bold mb-4">
                Ready to get started?
              </h2>
              <p className="text-lg mb-8 text-white/90">
                Sign up for Bant.ai today. It's easy, free, and gives you the tools to monitor and secure your child's online experience.
              </p>

              <div className="flex flex-col sm:flex-row sm:justify-start gap-4">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  href="/signup"
                  className="px-10 py-3.5 bg-white text-[#EE9471] font-semibold rounded-3xl shadow-md transition-all"
                >
                  Register Now
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  href="/signup"
                  className="px-10 py-3.5 bg-[#EE9471] text-white font-semibold rounded-3xl shadow-md transition-all"
                >
                  Login to my account
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>


      </div>
    </div>
  );
}

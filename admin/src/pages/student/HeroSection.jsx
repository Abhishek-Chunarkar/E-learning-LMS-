import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import hero1 from "../../../public/images/hero 4.jpg";
import hero2 from "../../../public/images/hero5.jpg";
import th from "../../../public/images/hero-bg.jpg";

const description =
  "Teaching in the Internet age means we must teach tomorrow's skills today.";

const HeroSection = () => {
  return (
    <section
      className="relative py-10 px-6 md:px-12 min-h-[60vh] flex flex-col lg:flex-row items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${th})` }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-slate-100 to-white dark:from-gray-900 dark:via-slate-800 dark:to-gray-900 opacity-90 z-0" />

      {/* Left Image - Enlarged with animation */}
      <motion.div
        className="relative w-full max-w-xl lg:w-[38%] z-10 mb-6 lg:mb-0"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="group relative overflow-hidden rounded-2xl shadow-xl">
          <img
            src={hero1}
            alt="Learning Group"
            className="w-full group-hover:scale-105 transition-transform duration-500 rotate-[-5deg]"
          />
        </div>
      </motion.div>

      {/* Center Content */}
      <div className="text-center lg:w-1/3 px-4 z-10">
        <motion.h2
          className="text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Typewriter
            words={["Learn", "Build", "Grow", "Succeed"]}
            loop
            cursor
            cursorStyle="_"
            typeSpeed={100}
            deleteSpeed={50}
            delaySpeed={2000}
          />
        </motion.h2>

        <motion.p
          className="text-xl md:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-pink-500 drop-shadow-md"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          {description}
        </motion.p>

        <motion.div
          className="mt-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <Link
            to="/course/search?query"
            className="bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold px-6 py-3 rounded-full shadow-md hover:from-blue-600 hover:to-teal-600 transition"
          >
            Get Started
          </Link>
        </motion.div>
      </div>

      {/* Right Image - Enlarged with animation */}
      <motion.div
        className="relative w-full max-w-xl lg:w-[38%] z-10 mt-6 lg:mt-0"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="group relative overflow-hidden rounded-2xl shadow-xl">
          <img
            src={hero2}
            alt="Professionals"
            className="w-full group-hover:scale-105 transition-transform duration-500 rotate-[5deg]"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;

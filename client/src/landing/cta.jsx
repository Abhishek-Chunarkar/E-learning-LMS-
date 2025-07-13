import React from 'react';

export default function CTASection() {
  return (
    <section className="relative text-white text-center py-20 overflow-hidden bg-gray-800 dark:bg-gray-900">
      {/* Background Layers */}
      <div className="absolute inset-0">
        <div
          className="w-full h-full bg-cover bg-center animate-bg-move"
          style={{ backgroundImage: "url('/images/cta1.webp')" }}
        />
        {/* Lighter overlay to make the background image visible */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0b0f33]/50 to-[#0b0f33]/80" />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center mb-12">
        <p className="text-sm text-gray-300 uppercase tracking-widest mb-3">Prove your potential</p>

        {/* Compact "Prove your potential" Box */}
        <div className="inline-block bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 p-[2px] rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300">
          <div className="bg-gray-900 p-6 rounded-lg relative z-10">
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500 mb-4 drop-shadow-md tracking-tight">
            "Learning never exhausts the mind."
            </h2>
          </div>
        </div>
      </div>

      {/* Fixed CTA Button (does not scroll with the content) */}
      <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-30">
        <div className="relative group w-fit mx-auto">
          <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-orange-400 to-pink-500 blur-md opacity-60 group-hover:opacity-90 transition-all duration-300"></div>
          <a
            href="#"
            className="relative inline-block bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white text-lg font-medium px-8 py-3 rounded-xl transition-all duration-300 shadow-lg dark:bg-blue-600 dark:hover:bg-teal-600"
          >
            Start For Free →
          </a>
        </div>
      </div>

      {/* Text "Get Started Today" with increased size and hover effect */}
      <div className="absolute top-5 left-1/2 transform -translate-x-1/2 z-20">
        <p className="text-2xl sm:text-3xl font-semibold text-gray-300 uppercase tracking-widest mb-3 transition-all duration-300 transform hover:text-orange-500 hover:scale-110">
          Get Started Today
        </p>
      </div>

      {/* Smooth Background Animation */}
      <style>
        {`
          @keyframes bgMove {
            0% { background-position: center bottom; }
            100% { background-position: center top; }
          }
          .animate-bg-move {
            animation: bgMove 16s ease-in-out infinite alternate;
          }
        `}
      </style>
    </section>
  );
}

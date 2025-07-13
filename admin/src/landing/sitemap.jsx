import React from "react";

export default function Sitemap() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 text-gray-800 dark:text-gray-200">
      <h1 className="text-4xl font-bold mb-8 text-center">Sitemap</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
        {/* Main Pages */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 border-b border-gray-400 pb-2">Main Pages</h2>
          <ul className="space-y-2 text-lg">
            <li>
              <a href="/" className="hover:text-blue-600 transition">
                Home
              </a>
            </li>
            <li>
              <a href="/login" className="hover:text-blue-600 transition">
                Login
              </a>
            </li>
            <li>
              <a href="/my-learning" className="hover:text-blue-600 transition">
                My Learning
              </a>
            </li>
            <li>
              <a href="/profile" className="hover:text-blue-600 transition">
                Profile
              </a>
            </li>
            <li>
              <a href="/course/search" className="hover:text-blue-600 transition">
                Course Search
              </a>
            </li>
          </ul>
        </div>

        {/* Courses & Admin */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 border-b border-gray-400 pb-2">Courses & Admin</h2>
          <ul className="space-y-2 text-lg">
            <li>
              <a href="/course-detail/123" className="hover:text-blue-600 transition">
                Course Detail (Example)
              </a>
            </li>
            <li>
              <a href="/course-progress/123" className="hover:text-blue-600 transition">
                Course Progress (Example)
              </a>
            </li>
            <li>
              <a href="/admin/dashboard" className="hover:text-blue-600 transition">
                Admin Dashboard
              </a>
            </li>
            <li>
              <a href="/admin/course" className="hover:text-blue-600 transition">
                Course Management
              </a>
            </li>
            <li>
              <a href="/admin/course/create" className="hover:text-blue-600 transition">
                Add New Course
              </a>
            </li>
          </ul>
        </div>

        {/* Landing Pages & Info */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 border-b border-gray-400 pb-2">Landing & Info</h2>
          <ul className="space-y-2 text-lg">
            <li>
              <a href="/terms-and-conditions" className="hover:text-blue-600 transition">
                Terms and Conditions
              </a>
            </li>
            <li>
              <a href="/privacy-policy" className="hover:text-blue-600 transition">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/faq" className="hover:text-blue-600 transition">
                FAQ
              </a>
            </li>
            <li>
              <a href="/about-us" className="hover:text-blue-600 transition">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact-us" className="hover:text-blue-600 transition">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Others */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 border-b border-gray-400 pb-2">Other Resources</h2>
          <ul className="space-y-2 text-lg">
            <li>
              <a href="/cookie-policy" className="hover:text-blue-600 transition">
                Cookie Policy
              </a>
            </li>
            <li>
              <a href="/sitemap" className="hover:text-blue-600 transition">
                Sitemap
              </a>
            </li>
            <li>
              <a href="/download-app" className="hover:text-blue-600 transition">
                Download App
              </a>
            </li>
          </ul>
        </div>
      </div>

      <p className="mt-12 text-center text-gray-500 dark:text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} CodeMate LMS. All rights reserved.
      </p>
    </div>
  );
}

import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaGooglePlay,
  FaApple,
  FaLock,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-8">
        {/* Brand */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Codemate</h2>
          <p className="text-sm text-gray-400">
            Empowering learners globally through expert-led education. Learn anything, anytime.
          </p>
          <div className="flex space-x-4">
            <a href="#"><FaFacebookF className="hover:text-white" /></a>
            <a href="#"><FaTwitter className="hover:text-white" /></a>
            <a href="#"><FaInstagram className="hover:text-white" /></a>
            <a href="#"><FaLinkedinIn className="hover:text-white" /></a>
          </div>
          <div>
            <p className="text-sm text-gray-400 mt-4 mb-2">Download our App</p>
            <div className="flex space-x-3">
              <button className="flex items-center bg-gray-800 px-3 py-2 rounded hover:bg-gray-700 text-sm">
                <FaGooglePlay className="mr-2" /> Google Play
              </button>
              <button className="flex items-center bg-gray-800 px-3 py-2 rounded hover:bg-gray-700 text-sm">
                <FaApple className="mr-2" /> App Store
              </button>
            </div>
          </div>
        </div>

        {/* Top Categories */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Top Categories</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">Web Development</a></li>
            <li><a href="#" className="hover:text-white">Data Science</a></li>
            <li><a href="#" className="hover:text-white">Graphic Design</a></li>
            <li><a href="#" className="hover:text-white">Marketing</a></li>
            <li><a href="#" className="hover:text-white">AI & ML</a></li>
          </ul>
        </div>

        {/* Learning Paths */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Learning Paths</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">Full Stack Developer</a></li>
            <li><a href="#" className="hover:text-white">UX Designer</a></li>
            <li><a href="#" className="hover:text-white">Data Analyst</a></li>
            <li><a href="#" className="hover:text-white">Cybersecurity Expert</a></li>
          </ul>
        </div>

        {/* Success Story */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Success Stories</h3>
          <div className="bg-gray-800 p-4 rounded-md text-sm text-gray-400">
            “Thanks to Codemate, I landed my dream job as a Data Analyst!”
            <br /><span className="text-white font-semibold">— Priya S., Mumbai</span>
          </div>
        </div>
      </div>

      {/* Legal Section - Moved Up */}
      <div className="max-w-7xl mx-auto px-6 mt-10 mb-16">
        <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-4 sm:space-y-0 justify-between items-center">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-gray-400">
            <select className="bg-gray-800 text-gray-300 px-3 py-1 rounded">
              <option>English</option>
              <option>Hindi</option>
              <option>Spanish</option>
            </select>
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} YourLMS. All rights reserved.
            </p>
          </div>

          {/* Legal Links */}
          <div className="text-sm text-gray-400">
            <ul className="flex flex-col sm:flex-row sm:space-x-6 space-y-2 sm:space-y-0 text-center">
              <li>
                <Link to="/terms" className="hover:text-white transition">Terms</Link>
              </li>
              <li className="sm:block hidden">|</li>
              <li>
                <Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link>
              </li>
              <li className="sm:block hidden">|</li>
              <li>
                <Link to="/cookie" className="hover:text-white transition">Cookie Settings</Link>
              </li>
              <li className="sm:block hidden">|</li>
              <li>
                <Link to="/sitemap" className="hover:text-white transition">Sitemap</Link>
              </li>
            </ul>
          </div>

          {/* Secure Badge */}
          <div className="flex items-center text-green-500 text-sm">
            <FaLock className="mr-1" /> Secure Payment
          </div>
        </div>
      </div>

      {/* Bottom Divider */}
      <div className="border-t border-gray-700 mt-20 pt-8"></div>
    </footer>
  );
}

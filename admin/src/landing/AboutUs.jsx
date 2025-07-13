import { FaChalkboardTeacher, FaLaptopCode, FaGlobe } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <section className="w-full flex flex-col items-center py-16 px-6 bg-gradient-to-br from-green-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
      {/* Header */}
      <h1 className="text-5xl font-extrabold mb-6 relative inline-block">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">
          About Us
        </span>
        <span className="absolute -bottom-2 left-0 w-full h-1 bg-orange-600 rounded-full"></span>
      </h1>

      {/* Intro Paragraph */}
      <motion.p
        className="text-lg text-center max-w-3xl text-gray-700 dark:text-gray-300 leading-relaxed"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2.5, ease: "easeInOut" }}
      >
        At <span className="font-bold text-orange-700">Infinity Learn</span>, we empower students worldwide by providing
        <strong> high-quality education</strong>, accessible <strong> anytime, anywhere</strong>.
        Our platform is built to <strong> inspire, educate, and transform</strong> learners into <strong>experts of the future</strong>.
      </motion.p>

      {/* Mission & Vision */}
      <div className="mt-12 flex flex-col md:flex-row justify-center gap-12 text-center w-full max-w-5xl">
        {[
          {
            title: "📚 Our Mission",
            desc: "To make education accessible to everyone with expert guidance and professional growth."
          },
          {
            title: "🚀 Our Vision",
            desc: "A world where anyone can learn and upskill themselves from anywhere with expert-led training."
          }
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: index * 0.3 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 p-8 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl shadow-lg transition-all duration-300 transform border-t-4 border-gray-600 hover:scale-[1.03] hover:shadow-orange-200 dark:hover:shadow-orange-400"
          >
            <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
            <p className="text-gray-700 dark:text-gray-300">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Feature Cards */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {[
          {
            icon: <FaChalkboardTeacher className="text-6xl text-orange-600" />,
            title: "Customized Learning",
            desc: "Tailor your learning experience with personalized roadmaps and self-paced progress."
          },
          {
            icon: <FaLaptopCode className="text-6xl text-orange-600" />,
            title: "Expert-Led Courses",
            desc: "Learn from industry professionals through interactive courses and real-world projects."
          },
          {
            icon: <FaGlobe className="text-6xl text-orange-600" />,
            title: "Learn Anytime, Anywhere",
            desc: "Gain high-quality education from anywhere, at any time, at your convenience."
          }
        ].map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: index * 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col items-center p-8 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl shadow-lg transition-all duration-300 transform border-t-4 border-gray-600 hover:scale-[1.03] hover:shadow-orange-200 dark:hover:shadow-orange-400"
          >
            {card.icon}
            <h4 className="text-2xl font-bold mt-4">{card.title}</h4>
            <p className="text-gray-700 dark:text-gray-300 mt-2 text-center">{card.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* CTA Button */}
      <motion.div
        className="mt-12"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        viewport={{ once: true }}
      >
        <Link to="/login">
          <button className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-full shadow-md hover:scale-110 transition-all duration-300 hover:from-blue-600 hover:to-teal-600 hover:shadow-lg">
            Start Learning Today 🚀
          </button>
        </Link>
      </motion.div>
    </section>
  );
};

export default AboutUs;

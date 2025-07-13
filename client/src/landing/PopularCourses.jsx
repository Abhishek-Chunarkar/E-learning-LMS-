import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

const courses = [
  {
    title: "Machine Learning",
    category: "Data Science",
    duration: "6-10 hrs",
    image: "/images/data science.jpg",
    link: "/courses/caregiving",
  },
  {
    title: "MEAN Stack",
    category: "Web Development",
    duration: "3-4 hrs",
    image: "/images/MEAN Stack.jpg",
    link: "/courses/food-safety",
  },
  {
    title: "Python",
    category: "Data Science",
    duration: "4-5 hrs",
    image: "/images/Python.webp",
    link: "/courses/bls",
  },
  {
    title: "Unity",
    category: "Game Development",
    duration: "2-3 hrs",
    image: "/images/Unity.jpg",
    link: "/courses/heritage",
  },
  {
    title: "JavaScript",
    category: "Web Development",
    duration: "5-7 hrs",
    image: "/images/JavaScript.png",
    link: "/courses/ai",
  },
];

export default function PopularCourses() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % (courses.length - 3));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? courses.length - 4 : prev - 1));
  };

  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white py-12">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 2.8, ease: "easeOut" }}
      >
        {/* Centered Heading with Gradient and Underline */}
        <motion.h2
          className="text-3xl font-extrabold mb-8 text-center relative"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block relative">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">
              Popular Courses
            </span>
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-[97%] h-1 bg-orange-600 rounded-full"></span>
          </span>
        </motion.h2>

        {/* Navigation Buttons and Course Cards */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <button
            onClick={prevSlide}
            className="p-2 bg-white dark:bg-gray-800 shadow-lg rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <ChevronLeft size={24} className="text-gray-900 dark:text-white" />
          </button>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, ease: "easeOut", staggerChildren: 0.2 }}
          >
            {courses.slice(currentIndex, currentIndex + 4).map((course, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <Link to={course.link} className="group block">
                  <div className="relative bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg transition-transform transform hover:-translate-y-2 hover:shadow-orange-200 dark:hover:shadow-orange-400">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-40 object-cover rounded-lg"
                    />
                    <div className="mt-4 text-center">
                      <h3 className="text-lg font-semibold">{course.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{course.category}</p>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        ⏳ {course.duration}
                      </div>
                      <div className="mt-4">
                        <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 dark:bg-green-500 dark:hover:bg-green-600">
                          Start Learning
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <button
            onClick={nextSlide}
            className="p-2 bg-white dark:bg-gray-800 shadow-lg rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <ChevronRight size={24} className="text-gray-900 dark:text-white" />
          </button>
        </div>

        {/* Explore More Button */}
        <motion.div
          className="text-center mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Link to="/courses">
            <button className="border border-orange-500 text-orange-500 px-5 py-2 rounded-lg hover:bg-orange-500 hover:text-white dark:border-orange-600 dark:text-orange-600 dark:hover:bg-orange-600 dark:hover:text-white">
              Explore More Courses
            </button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

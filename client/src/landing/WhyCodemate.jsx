import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

export default function WhyCodeMate() {
  const features = [
    {
      title: "Hands-on Practice",
      description:
        "Learn by doing! Work on real-world projects, coding challenges, and hands-on exercises to master concepts.",
      icon: "/images/hands_on _prac.jpg",
    },
    {
      title: "Assignments & Quizzes",
      description:
        "Test your knowledge with assignments and quizzes designed to reinforce learning and track your progress.",
      icon: "/images/Assignment.png",
    },
    {
      title: "Learn & Get Certified",
      description:
        "Complete courses, pass assessments, and earn a certificate to showcase your expertise to potential employers.",
      icon: "/images/learn & certi.jpg",
    },
    {
      title: "Access Anywhere & Anytime",
      description:
        "No restrictions! Learn at your own pace, anytime, from any device – be it mobile, tablet, or laptop.",
      icon: "/images/access.png",
    },
  ];

  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800 py-16 px-6 transition-colors duration-500">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-900 dark:text-white">
          Why{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">
            CodeMate?
          </span>
        </h2>

        <div className="flex flex-col lg:flex-row items-center">
          {/* Left - Image */}
          <div className="lg:w-1/2 flex justify-center mb-10 lg:mb-0">
            <motion.img
             src="/images/whycode.jpg"
              alt="Why CodeMate"
              width={450}
              height={550}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="rounded-xl shadow-xl"
            />
          </div>

          {/* Right - Features */}
          <div ref={ref} className="lg:w-1/2 lg:pl-12 space-y-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                animate={{
                  opacity: isVisible ? 1 : 0,
                  x: isVisible ? 0 : 50,
                  transition: { duration: 0.6, delay: index * 0.2 },
                }}
                className="group bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center gap-4 border border-gray-200 dark:border-gray-700 transform transition-all duration-300 hover:scale-[1.01] hover:shadow-orange-300 dark:hover:shadow-orange-400"
              >
                <div className="w-16 h-16 flex items-center justify-center rounded-full overflow-hidden shadow-sm transition duration-300 group-hover:shadow-orange-300 dark:group-hover:shadow-orange-400 bg-white dark:bg-gray-700">
                  <img
                    src={feature.icon}
                    alt={feature.title}
                    width={50}
                    height={50}
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { Lightbulb, BookOpen, Laptop } from "lucide-react";

export default function Futur() {
  const features = [
    {
      title: "Recorded Classes",
      description:
        "Access high-quality recorded lectures anytime and revisit concepts at your own pace.",
      image: "/images/Recorded Classes.jpg",
      icon: <BookOpen className="w-6 h-6 text-white" />,
    },
    {
      title: "Practice & Revise",
      description:
        "Enhance learning with mock tests, quizzes, and downloadable PDFs for revision.",
      image: "/images/Practice & Revise.jpg",
      icon: <Lightbulb className="w-6 h-6 text-white" />,
    },
    {
      title: "Learn Anytime, Anywhere",
      description:
        "Enjoy flexible learning from any device with live and recorded classes on the go.",
      image: "/images/Learn Anytime, Anywhere.jpg",
      icon: <Laptop className="w-6 h-6 text-white" />,
    },
  ];

  return (
    <section className="w-full bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 py-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-orange-500 to-pink-500 text-transparent bg-clip-text inline-block mb-4">
          Platform Features
          <motion.div
            className="h-[3px] w-67 bg-orange-500 rounded-full mx-auto mt-2"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5 }}
          />
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-14">
          Designed to deliver flexibility, engagement, and mastery—these are the tools that empower your learning journey.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group relative bg-white/30 dark:bg-white/10 backdrop-blur-xl border border-white/40 dark:border-white/20 rounded-3xl p-6 shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-orange-200 dark:hover:shadow-orange-400"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="relative mb-5">
                <img
                  src={feature.image}
                  alt={`Visual of ${feature.title}`}
                  className="w-full h-44 object-cover rounded-xl"
                />
                <div className="absolute -top-4 -left-4 bg-blue-600 p-3 rounded-full shadow-lg">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16">
          <button className="px-7 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full transition duration-300 shadow-lg dark:shadow-orange-500/30">
            Discover More Features
          </button>
        </div>
      </div>
    </section>
  );
}

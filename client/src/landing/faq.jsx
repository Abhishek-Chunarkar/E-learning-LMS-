import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "What is this e-learning platform about?",
    answer:
      "This platform provides high-quality online courses across various subjects, helping students learn at their own pace.",
  },
  {
    question: "How do I enroll in a course?",
    answer:
      "You can browse available courses, select the one you like, and enroll by clicking the 'Enroll Now' button.",
  },
  {
    question: "Is there a certificate after course completion?",
    answer:
      "Yes, after successfully completing a course, you will receive a digital certificate of completion.",
  },
  {
    question: "Are the courses free or paid?",
    answer:
      "We offer both free and premium courses. Some advanced courses may require payment to access premium content.",
  },
  {
    question: "Can I access the courses on mobile?",
    answer:
      "Yes! Our platform is fully responsive, and you can access courses from any device, including mobile and tablets.",
  },
  {
    question: "How can I contact support?",
    answer:
      "You can reach out to our support team via email or the contact form on our website for any queries.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.h1
          className="text-4xl font-extrabold mb-10 relative inline-block text-center w-full"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">
            Frequently Asked Questions
          </span>
          <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-orange-600 rounded-full"></span>
        </motion.h1>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                className="group border border-gray-300 dark:border-gray-600 rounded-xl shadow-md p-4 bg-white dark:bg-gray-800 cursor-pointer hover:shadow-lg transition-shadow duration-300"
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => toggleFAQ(index)}
              >
                <div className="flex justify-between items-center text-lg font-semibold text-left">
                  <span className="text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors duration-300">
                    {faq.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-orange-500"
                  >
                    ▼
                  </motion.span>
                </div>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="mt-3 text-gray-700 dark:text-gray-300">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

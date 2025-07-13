import React, { useState, useEffect, useRef } from "react";
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from "@heroicons/react/24/solid";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting) {
          document.body.classList.add("bg-white", "dark:bg-gray-900");
        } else {
          document.body.classList.remove("bg-white", "dark:bg-gray-900");
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -20px 0px",
      }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.name || !formData.email || !formData.message) {
      setError("All fields are required.");
      return;
    }

    console.log("Message Sent:", formData);
    setSuccess("Your message has been sent successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section
      ref={sectionRef}
      className={`min-h-screen flex flex-col items-center justify-center py-16 px-6 transition-opacity duration-500 ease-in-out dark:text-white ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold mb-4 tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">
            Contact Us
          </span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          We love to hear from you! Fill out the form below or reach out to us directly.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl w-full">
        {/* Contact Info Card */}
        <div
          className={`bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl flex flex-col items-center text-center border-t-4 border-gray-600 transition-all duration-500 ease-in-out transform ${
            isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
          }`}
        >
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6">Get in Touch</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Reach out to us anytime, and we will get back to you as soon as possible.
          </p>

          <div className="space-y-5 w-full">
            <div className="flex items-center gap-4 text-gray-700 dark:text-gray-300">
              <EnvelopeIcon className="h-8 w-8 text-orange-600" />
              <p className="text-lg">codemate@gmail.com</p>
            </div>
            <div className="flex items-center gap-4 text-gray-700 dark:text-gray-300">
              <PhoneIcon className="h-8 w-8 text-orange-600" />
              <p className="text-lg">+91 8830604514</p>
            </div>
            <div className="flex items-center gap-4 text-gray-700 dark:text-gray-300">
              <MapPinIcon className="h-8 w-8 text-orange-600" />
              <p className="text-lg">Nagpur, Vasudev Nagar</p>
            </div>
          </div>
        </div>

        {/* Contact Form Card */}
        <div
          className={`bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl border-t-4 border-gray-600 transition-all duration-500 ease-in-out transform ${
            isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
          }`}
        >
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6">Send Us a Message</h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">We’ll get back to you as soon as possible.</p>

          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
          {success && <p className="text-green-600 text-sm mb-3">{success}</p>}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-500 transition-all ease-in-out duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-500 transition-all ease-in-out duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-500 transition-all ease-in-out duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-xl hover:bg-gradient-to-l transition-all duration-300 ease-in-out transform hover:scale-105 shadow-xl"
            >
              SEND MESSAGE
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
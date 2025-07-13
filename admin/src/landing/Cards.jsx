"use client";

import { useEffect, useRef } from "react";

const courses = [
  {
    id: 1,
    title: "Web Development",
    image: "/images/Game Development.jpg",
    link: "#",
  },
  {
    id: 2,
    title: "Data Science",
    image: "/images/data science.jpg",
    link: "#",
  },
  {
    id: 3,
    title: "Mobile Development",
    image: "/images/mobile development.avif",
    link: "#",
  },
  {
    id: 4,
    title: "Programming Languages",
    image: "/images/programing languagr.jpg",
    link: "#",
  },
  {
    id: 5,
    title: "Game Development",
    image: "/images/Game Development.jpg",
    link: "#",
  },
  {
    id: 6,
    title: "Database Design & Development",
    image: "/images/Database Design & Development.jpg",
    link: "#",
  },
  {
    id: 7,
    title: "Software Testing",
    image: "/images/Software Testing.jpg",
    link: "#",
  },
  {
    id: 8,
    title: "Software Engineering",
    image: "/images/Software Engineering.jpg",
    link: "#",
  },
  {
    id: 9,
    title: "Software Development Tools",
    image: "/images/Software Development Tools.jpg",
    link: "#",
  },
  {
    id: 10,
    title: "No Code Development",
    image: "/images/No Code Development.jpg",
    link: "#",
  },
];

function CourseCard({ title, image, link }) {
  return (
    <a
      href={link}
      className="w-64 h-80 bg-white shadow-lg flex flex-col items-center justify-center text-lg font-bold overflow-hidden transform transition-all duration-500 hover:scale-105 shrink-0 relative group"
    >
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover group-hover:opacity-60 transition-opacity duration-300"
      />
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-5 left-5 right-5">
          <span className="text-white text-lg font-semibold group-hover:text-orange-400 transition-colors duration-300">
            {title}
          </span>
        </div>
      </div>
    </a>
  );
}

export default function Courses() {
  const containerRef = useRef(null);
  const requestRef = useRef(null);
  const scrollX = useRef(0);
  const isPaused = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scroll = () => {
      if (!isPaused.current) {
        scrollX.current -= 1;
        if (Math.abs(scrollX.current) >= container.scrollWidth / 2) {
          scrollX.current = 0;
        }
        container.style.transform = `translateX(${scrollX.current}px)`;
      }
      requestRef.current = requestAnimationFrame(scroll);
    };

    requestRef.current = requestAnimationFrame(scroll);

    container.addEventListener("mouseenter", () => (isPaused.current = true));
    container.addEventListener("mouseleave", () => (isPaused.current = false));

    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  return (
    <div className="relative overflow-hidden w-full">
      <div
        className="flex w-max"
        ref={containerRef}
        style={{
          display: "flex",
          whiteSpace: "nowrap",
          transition: "transform 0.1s linear",
        }}
      >
        {[...courses, ...courses].map((course, index) => (
          <CourseCard
            key={`${course.id}-${index}`}
            title={course.title}
            image={course.image}
            link={course.link}
          />
        ))}
      </div>
    </div>
  );
}

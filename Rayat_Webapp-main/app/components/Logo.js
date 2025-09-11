"use client";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Users, GraduationCap, Hotel, Award, School } from "lucide-react"; // Import School icon

const stats = [
  { id: 1, label: "GRADE BY NAAC, MHRD", value: "NAAC", isNumber: false, icon: Award },
  { id: 2, label: "STAFF", value: 12442, suffix: "+", isNumber: true, icon: Users },
  { id: 3, label: "STUDENTS", value: 434252, suffix: "+", isNumber: true, icon: GraduationCap },
  { id: 4, label: "HOSTELS", value: 83, suffix: "+", isNumber: true, icon: Hotel },
  { id: 5, label: "SECONDARY SCHOOLS", value: 453, suffix: "+", isNumber: true, icon: School }, // Updated icon
];

const AnimatedNumbers = ({ end, suffix, startAnimation }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startAnimation) return;

    let start = 0;
    const increment = end / 100;
    const interval = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(interval);
      } else {
        setCount(Math.ceil(start));
      }
    }, 30);

    return () => clearInterval(interval);
  }, [end, startAnimation]);

  return <span>{count.toLocaleString()}{suffix}</span>;
};

const Logo = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <div ref={ref} className="[background-color:hsl(184,50%,85%)] text-black py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-center">
        {stats.map(({ id, label, value, suffix, isNumber, icon: Icon }) => (
          <div key={id} className="flex flex-col items-center space-y-2">
            {Icon && <Icon className="w-12 h-10 text-teal-900 mb-2" />} {/* Display icon if available */}
            <h2 className="text-teal-900 text-2xl font-bold">
              {isNumber ? <AnimatedNumbers end={value} suffix={suffix} startAnimation={inView} /> : value}
            </h2>
            <p className="text-s text-black font-bold px-4">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Logo;

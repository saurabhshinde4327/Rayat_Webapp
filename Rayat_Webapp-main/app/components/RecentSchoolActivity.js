"use client";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";

export default function RecentActivities() {
  const scrollRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch("/api/getAdminSchoolActivity");
        const data = await response.json();
        setActivities(data);
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    fetchActivities();
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth / 2;
      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-gray-100 py-10 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">RECENT SCHOOL ACTIVITIES</h2>
          <Link href="/recentactivity">
            <button className="bg-[#0C3B39] text-white px-4 py-2 rounded-lg hover:opacity-80 transition duration-300">
              VIEW ALL
            </button>
          </Link>
        </div>

        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide snap-x"
          >
            {activities.length > 0 ? (
              activities.map((item, idx) => (
                <div key={idx} className="snap-start flex-shrink-0 w-1/3">
                  <div
                    className="bg-white shadow-lg rounded-lg overflow-hidden p-4 cursor-pointer h-[340px] flex flex-col"
                    onClick={() => setSelectedImage(item.file_path)}
                  >
                    <div className="relative h-56 w-full">
                      <Image
                        src={item.file_path}
                        alt={item.title}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                      />
                    </div>
                    <h3 className="text-center mt-4 font-semibold">{item.title}</h3>
                    <p className="text-center text-sm text-gray-600 mt-1">
                      Organized by: <span className="font-medium">{item.school_name}</span>
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center w-full">No recent activities available.</p>
            )}
          </div>

          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
          >
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
          >
            <ChevronRight className="w-6 h-6 text-gray-800" />
          </button>
        </div>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative bg-white p-4 rounded-lg shadow-lg max-w-3xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 bg-gray-200 p-2 rounded-full hover:bg-gray-300"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6 text-gray-800" />
            </button>
            <div className="relative w-full h-[80vh]">
              <Image
                src={selectedImage}
                alt="Selected"
                layout="fill"
                objectFit="contain"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

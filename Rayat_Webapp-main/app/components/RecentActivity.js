"use client";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image"; // Import Image component

export default function RecentActivities() {
  const scrollRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [activities, setActivities] = useState([]);

  // Fetch recent activities
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch("/api/getActivities");
        const data = await response.json();
        setActivities(data);
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    fetchActivities();
  }, []);

  // Scroll function
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
          <h2 className="text-2xl font-bold text-gray-800">RECENT ACTIVITIES</h2>
          <Link href="/recentactivity">
            <button className="bg-[#0C3B39] text-white px-4 py-2 rounded-lg hover:opacity-80 transition duration-300">
              VIEW ALL
            </button>
          </Link>
        </div>

        <div className="relative">
          {/* Scrollable container */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide snap-x"
          >
            {activities.length > 0 ? (
              activities.map((item, idx) => (
                <div key={idx} className="snap-start flex-shrink-0 w-1/3">
                  <div
                    className="bg-white shadow-lg rounded-lg overflow-hidden p-4 cursor-pointer h-[320px] flex flex-col"
                    onClick={() => setSelectedImage(item.file_path)}
                  >
                    <div className="h-56 w-full">
                      {/* Replace img with Image component */}
                      <Image
                        src={item.file_path}
                        alt={item.title}
                        width={320} // Set width
                        height={224} // Set height (aspect ratio kept consistent)
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <h3 className="text-center mt-4 font-semibold">{item.title}</h3>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center w-full">No recent activities available.</p>
            )}
          </div>

          {/* Navigation Buttons */}
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

      {/* Modal */}
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
            {/* Replace img with Image component */}
            <Image
              src={selectedImage}
              alt="Selected"
              width={800} // Set width for modal image
              height={600} // Set height for modal image
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}

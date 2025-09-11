"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image"; // Import Next.js Image component

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const res = await fetch("/api/getAchievement");
        if (!res.ok) throw new Error("Failed to fetch achievements");
        const data = await res.json();
        setAchievements(data);
      } catch (error) {
        console.error("Error fetching achievements:", error);
      }
    };

    const fetchNews = async () => {
      try {
        const res = await fetch("/api/getAchievementnews");
        if (!res.ok) throw new Error("Failed to fetch news");
        const data = await res.json();
        setNews(data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchAchievements();
    fetchNews();
  }, []);

  const horizontalSettings = {
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
  };

  const verticalSettings = {
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  return (
    <div className="flex flex-col items-center p-6 space-y-6 bg-[#c5e6e6]">
      <h2 className="text-4xl font-bold text-black">Award & Recognition </h2>

      <div className="flex flex-col lg:flex-row items-center justify-center space-y-6 lg:space-y-0 lg:space-x-8 w-full">
        {/* Left: Horizontal Image Slider */}
        <div className="w-full max-w-lg">
          <Slider {...horizontalSettings}>
            {achievements.map((item) => (
              <div key={item.id} className="p-2">
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                  <Image
                    src={item.file_path} // Use Image component
                    alt={item.title}
                    width={500} // Set appropriate width
                    height={200} // Set appropriate height
                    className="w-full h-48 object-cover"
                  />
                  <div className="bg-teal-900 text-white p-2 text-center text-lg">
                    {item.title}
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* Right: Vertical News Slider */}
        <div className="w-full max-w-md h-72">
          <div className="bg-white p-3 rounded-lg border border-teal-900 shadow-md h-full flex flex-col justify-between">
            <div className="flex-grow overflow-hidden">
              <Slider {...verticalSettings}>
                {news.map((item) => (
                  <div key={item.id} className="flex items-center p-2 border-b border-gray-300">
                    <Image
                      src={item.file_path} // Use Image component
                      alt={item.title}
                      width={50} // Set appropriate width
                      height={50} // Set appropriate height
                      className="rounded-full border-2 border-blue-300 shadow-md mr-3"
                    />
                    <div>
                      <p className="text-sm text-gray-700">{item.des}</p>
                      <h6 className="text-sm font-semibold text-gray-600 mt-1">{item.title}</h6>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
            <div className="w-full flex justify-center mt-2">
              <Link href="#">
                <button className="bg-teal-900 text-white px-4 py-2 rounded-lg shadow-md hover:bg-teal-700 transition-all text-sm">
                  Read More
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievements;

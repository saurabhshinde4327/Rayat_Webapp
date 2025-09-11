"use client";
import React, { useEffect, useState } from "react";

const ScrollingNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("/api/getscrollingnews");
        if (!response.ok) throw new Error(`API error: ${response.statusText}`);
        const data = await response.json();
        setNews(data);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const openFile = (filePath) => {
    if (filePath) {
      const fullUrl = filePath.startsWith("http") ? filePath : `/${filePath}`;
      window.open(fullUrl, "_blank");
    }
  };

  return (
    <div className="w-full p-2 bg-teal-900 rounded-lg shadow-lg overflow-hidden">
      <div
        className="relative flex items-center overflow-hidden whitespace-nowrap"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className={`flex text-white cursor-pointer font-semibold text-sm`}
          style={{
            animation: isHovered
              ? "none"
              : `scroll-left ${news.length > 0 ? "20s" : "0s"} linear infinite`,
          }}
        >
          {loading ? (
            <span>Loading news...</span>
          ) : news.length > 0 ? (
            [...news, ...news].map((item, index) => (
              <span
                key={index}
                className="mr-8"
                onClick={() => openFile(item.file_path)}
              >
                &#8226; {item.title}
              </span>
            ))
          ) : (
            <span></span>
          )}
        </div>
      </div>
      <style jsx>{`
        @keyframes scroll-left {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
};

export default ScrollingNews;

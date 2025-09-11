"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const SchoolSlider = ({ school_id }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!school_id) return;

    const fetchImages = async () => {
      try {
        const res = await fetch(`/api/getSliderSchoolImages?school_id=${school_id}`);
        if (!res.ok) throw new Error("Failed to fetch images");
        const data = await res.json();
        setImages(data);
      } catch (error) {
        console.error("Error fetching slider images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [school_id]);

  if (loading) {
    return <p className="text-center text-gray-500 mt-4">Loading slider...</p>;
  }

  if (images.length === 0) {
    return <p className="text-center text-gray-500 mt-4">No slider images available for this school.</p>;
  }

  return (
    <div className="relative w-full max-w-screen-xl mx-auto mt-4 rounded-2xl overflow-hidden shadow-xl">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        loop
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]"
      >
        {images.map((image, index) => (
          <SwiperSlide key={image.id}>
            <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
              <Image
                src={image.file_path}
                alt={`Slide ${index + 1}`}
                fill
                className="object-cover w-full h-full brightness-105"
                priority={index === 0}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .swiper-button-prev,
        .swiper-button-next {
          color: white;
          background: rgba(0, 0, 0, 0.3);
          padding: 8px;
          border-radius: 9999px;
          transition: background 0.3s ease;
        }

        .swiper-button-prev:hover,
        .swiper-button-next:hover {
          background: rgba(0, 0, 0, 0.5);
        }

        .swiper-pagination-bullet {
          background: white;
          opacity: 0.7;
        }

        .swiper-pagination-bullet-active {
          background: #00b4d8;
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default SchoolSlider;

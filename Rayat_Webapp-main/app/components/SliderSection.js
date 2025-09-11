"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const HeroSlider = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("/api/getSliderImages"); // Update this URL based on your API route
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error("Error fetching slider images:", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="relative w-full min-h-[400px] md:h-[600px] lg:h-[700px] flex items-center justify-center overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className="w-full h-full"
      >
        {images.length > 0 ? (
          images.map((image, index) => (
            <SwiperSlide key={image.id} className="relative w-full h-full">
              <div className="relative w-full h-[400px] md:h-[600px] lg:h-[700px] before:absolute before:inset-0 before:bg-white/10">
                <Image
                  src={image.file_path}
                  alt={`Slide ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                  className="brightness-110 contrast-105"
                  priority={index === 0}
                />
              </div>
            </SwiperSlide>
          ))
        ) : (
          <p className="text-center text-white">Loading...</p>
        )}
      </Swiper>
    </div>
  );
};

export default HeroSlider;

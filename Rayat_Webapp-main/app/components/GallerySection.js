"use client";
import React, { useState } from 'react';
import Image from 'next/image'; // Import next/image for optimization

const GallerySection = () => {
  const images = [
    "/images/p1.png",
    "https://source.unsplash.com/random/400x300?city",
    "https://source.unsplash.com/random/400x300?technology",
    "https://source.unsplash.com/random/400x300?architecture",
    "https://source.unsplash.com/random/400x300?food",
    "https://source.unsplash.com/random/400x300?travel",
    "https://source.unsplash.com/random/400x300?animals",
    "https://source.unsplash.com/random/400x300?art",
    "https://source.unsplash.com/random/400x300?landscape",
    "https://source.unsplash.com/random/400x300?fashion",
    "https://source.unsplash.com/random/400x300?sports",
    "https://source.unsplash.com/random/400x300?business",
    "https://source.unsplash.com/random/400x300?health",
    "https://source.unsplash.com/random/400x300?education",
    "https://source.unsplash.com/random/400x300?music",
    "https://source.unsplash.com/random/400x300?history",
  ];

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Gallery</h2>
        <div className="relative overflow-hidden">
          {/* Continuous Scroll Container */}
          <div className="flex space-x-10 py-4 animate-scroll hover:pause">
            {/* First Set of Images */}
            {images.map((image, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-80 h-64 rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
                onClick={() => handleImageClick(image)}
              >
                <Image
                  src={image}
                  alt={`Gallery Image ${index + 1}`}
                  layout="responsive" // Ensure responsive layout
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
            {/* Duplicate Set of Images for Continuous Scroll */}
            {images.map((image, index) => (
              <div
                key={index + images.length}
                className="flex-shrink-0 w-80 h-64 rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
                onClick={() => handleImageClick(image)}
              >
                <Image
                  src={image}
                  alt={`Gallery Image ${index + 1}`}
                  layout="responsive" // Ensure responsive layout
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal for Zoomed Image */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
          onClick={closeModal}
        >
          <div className="relative max-w-4xl w-full p-4">
            <Image
              src={selectedImage}
              alt="Zoomed Image"
              layout="intrinsic" // Adjust layout for zoomed view
              width={800}
              height={600}
              className="w-full h-full object-contain rounded-lg"
            />
            <button
              className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-200"
              onClick={closeModal}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Add CSS for Continuous Scroll Animation */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          display: flex;
          width: 200%;
          animation: scroll 25s linear infinite;
        }
        .hover\:pause:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default GallerySection;

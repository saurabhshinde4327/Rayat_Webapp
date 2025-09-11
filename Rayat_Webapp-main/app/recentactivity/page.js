"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeaderSection from "../components/HeaderSection";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";

export default function NewsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [newsData, setNewsData] = useState([]);

  // Fetch event records from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/getEvents");
        const data = await response.json();
        setNewsData(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  // Open modal with selected image
  const openModal = (image) => {
    setSelectedImage(image);
    setModalOpen(true);
  };

  return (
    <div>
      <HeaderSection />
      <Header />
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full h-[100px]">
        <Image
          src="/images/academics-banner.jpg"
          alt="Academics"
          layout="fill"
          objectFit="cover"
          className="opacity-80"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <h3 className="text-white text-3xl md:text-4xl font-extrabold drop-shadow-lg uppercase">
           recent Activities
          </h3>
        </div>
      </section>

      {/* Breadcrumb Section */}
      <div className="bg-teal-900 text-white py-3">
        <div className="container mx-auto flex justify-center space-x-2 text-sm">
          <Link href="/" className="flex items-center space-x-1 hover:text-yellow-400">
            <span>🏠</span>
            <span>Home</span>
          </Link>
          <span className="text-gray-400">›</span>
          <span className="text-yellow-400 uppercase">Activities</span>
        </div>
      </div>

      {/* Activities List Section */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Latest Activities</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsData.length > 0 ? (
            newsData.map((activity) => (
              <div key={activity.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                <Image
                  src={activity.file_path.startsWith("/") ? activity.file_path : `/uploads/${activity.file_path}`}
                  alt={activity.title}
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover cursor-pointer"
                  onClick={() => openModal(activity.file_path)}
                />
                <div className="p-4 text-center">
                  <h3 className="text-xl font-semibold text-gray-800">{activity.title}</h3>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center w-full">No activities available.</p>
          )}
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
          <div className="relative">
            <button
              className="absolute top-0 right-0 bg-white text-black p-2 rounded-full hover:bg-gray-300"
              onClick={() => setModalOpen(false)}
            >
              ✕
            </button>
            <Image src={selectedImage} alt="Activity" width={800} height={500} className="rounded-lg shadow-lg" />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

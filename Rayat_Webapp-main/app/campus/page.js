"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeaderSection from "../components/HeaderSection";
import Image from "next/image";
import Header from "../components/Header";
import Link from "next/link";

const tabs = [""];

const academicProjects = [
  { name: "Central Administrative Building", image: "/campus/1.jpg", description: "Spread over an area of some 40469 square meters (4 hectors) and with the historic fort of Ajinkya Tara in the background, Rayat Shikshan Sanstha’s four-storied central office guides and controls the administration of its 737 branches spread all over Maharashtra." },
  { name: "Samadhi Parisar", image: "/campus/2.jpg", description: "The life-size statues of the Karmaveer and ‘Rayat Mauli’ Laxmibai look on with benevolent solicitude. At the foot of the pedestal, the ‘Samadhi’ of the Karmaveer reminds us of his monumental social and educational work." },
  { name: "Museum", image: "/campus/4.jpg", description: "The Museum nearby invites the visitors to look at the rare photographs and the Karmaveer’s relics such as his walking stick, his personal utensils, clothes and also the car that his students had so lovingly presented to him." },
  { name: "Samadhi Parisar", image: "/campus/3.jpg",description: "Life size Statues of Dr. Karmaveer Bhaurao Patil and Sou. Laxmibai Bhaurao Patil (Vahini).  At the foot of the pedestal, the ‘Samadhi’ of the Karmaveer reminds us of his monumental social and educational work." },
  
  
];





export default function Organization() {
  const [activeTab, setActiveTab] = useState("Academic");

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
          campus
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
          <span className="text-yellow-400 uppercase">campus</span>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="container mx-auto py-6 px-4">
        <div className="flex flex-wrap justify-center gap-3 border-b border-gray-300 pb-3">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 sm:px-6 py-2 text-sm sm:text-lg font-semibold border-b-4 ${
                activeTab === tab ? "border-teal-300 text-teal-500" : "border-transparent text-gray-600 hover:text-gray-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === "Academic" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {academicProjects.map((project, index) => (
                <div key={index} className="bg-white shadow-lg rounded-lg p-4 text-center">
                  <Image
                    src={project.image}
                    alt={project.name}
                    width={300}
                    height={200}
                    className="mx-auto rounded-lg border-2 border-gray-300"
                  />
                  <h3 className="mt-4 text-lg font-bold text-black">{project.name}</h3>
                  <p className="text-sm text-gray-600 mt-2">{project.description}</p>
                </div>
              ))}
            </div>
          )}

          
        </div>
      </div>
      <Footer />
    </div>
  );
}
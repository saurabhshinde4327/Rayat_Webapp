"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeaderSection from "../components/HeaderSection";
import Header from "../components/Header";
import Image from "next/image";
import Link from "next/link";

const tabs = ["Academic", "Professional"];

const academicPrograms = [
  {
    category: "CMOU & BVG Sponsored Programmes - B.Sc Facility Services",
    colleges: [
      "Yashwantrao Chavan Institute of Science, Satara",
      "Mahatma Phule Mahavidyalaya, Pimpri, Pune",
      "Karmaveer Bhaurao Patil Mahavidyalaya, Pandharpur",
      "Balwant College, Vita, Sangli",
      "Shri. Raosaheb Ramrao Patil Mahavidyalaya, Savlaj, Sangli",
      "S.M. Joshi College, Hadapsar, Pune",
      "R.B. N. B. College, Shrirampur",
      "D.P.Bhosale College, Koregaon (Proposed)"
    ]
  },
  {
    category: "BVG Sponsored Programmes - Diploma in Mechanized House Keeping",
    colleges: [
      "Laxmibai Bhaurao Patil Mahila Mahavidyalaya, Solapur",
      "Savitribai Phule Mahila Mahavidyalaya, Satara",
      "Radhabai Kale Mahila Mahavidyalaya, Ahemadnagar",
      "Sou. Mangalatai Jagtap Mahila Mahavidyalaya, Umbraj"
    ]
  }
];

const professionalPrograms = [
  {
    category: "XYZ Corporation Sponsored Programmes - B.Tech in AI & Data Science",
    colleges: [
      "XYZ Institute of Technology, Mumbai",
      "PQR Engineering College, Pune",
      "ABC University, Nagpur",
      "DEF Institute of Science, Nashik",
      "GHI College of Technology, Kolhapur"
    ]
  },
  {
    category: "XYZ Sponsored Programmes - Diploma in Cybersecurity",
    colleges: [
      "CyberSafe Academy, Pune",
      "Network Security Institute, Mumbai",
      "Digital Defense College, Bangalore"
    ]
  }
];

export default function Programs() {
  const [activeTab, setActiveTab] = useState("Academic");

  return (
    <div className="bg-gray-100 min-h-screen">
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
          centenary projects
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
          <span className="text-yellow-400 uppercase"> centenary projects</span>
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

        {/* Company Title and Logo */}
        <div className="flex flex-col items-center mt-6">
          <h2 className="text-2xl font-bold text-teal-900">
            {activeTab === "Academic" ? "Bharat Vikas Group (BVG India)" : "XYZ Corporation"}
          </h2>
          <Image 
            src={activeTab === "Academic" ? "/images/bvg.png" : "/images/pmvyk.png"} 
            alt={`${activeTab} Logo`} 
            width={150} 
            height={50} 
          />
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === "Academic" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {academicPrograms.map((program, index) => (
                <div key={index} className="bg-white shadow-lg rounded-lg p-6">
                  <h3 className="text-lg font-bold text-teal-900 pb-2 border-b-2 border-teal-300">{program.category}</h3>
                  <table className="w-full mt-3 border-collapse">
                    <tbody>
                      {program.colleges.map((college, idx) => (
                        <tr key={idx} className="border-b hover:bg-gray-100">
                          <td className="py-2 px-4 font-medium text-gray-700">{idx + 1}.</td>
                          <td className="py-2 px-4 text-gray-800">{college}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          )}

          {activeTab === "Professional" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {professionalPrograms.map((program, index) => (
                <div key={index} className="bg-white shadow-lg rounded-lg p-6">
                  <h3 className="text-lg font-bold text-teal-900 pb-2 border-b-2 border-teal-300">{program.category}</h3>
                  <table className="w-full mt-3 border-collapse">
                    <tbody>
                      {program.colleges.map((college, idx) => (
                        <tr key={idx} className="border-b hover:bg-gray-100">
                          <td className="py-2 px-4 font-medium text-gray-700">{idx + 1}.</td>
                          <td className="py-2 px-4 text-gray-800">{college}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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

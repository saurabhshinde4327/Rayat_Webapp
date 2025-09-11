"use client";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeaderSection from "../components/HeaderSection";
import Header from "../components/Header";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const memorandum = [
  { sr: 1, date: "18-2-2015", title: "TATA CONSULTANCY SERVICES LIMITED (TCS) & RAYAT SHIKSHAN SANSTHA", purpose: "Provide training services to improve the employability of students graduating from RAYAT SHIKSHAN SANSTHA" },
  { sr: 2, date: "15-5-2015", title: "LUPIN LIMITED & RAYAT SHIKSHAN SANSTHA", purpose: "To provide industry-focused quality education & job opportunities to 12th (Science) passed students from RAYAT SHIKSHAN SANSTHA" },
  { sr: 3, date: "4-12-2015", title: "RAYAT SHIKSHAN SANSTHA & TATA BUSINESS SUPPORT SERVICES LTD", purpose: "Creating temporary job opportunities and supporting education efforts through 'Earn While You Learn'" },
  { sr: 4, date: "10-3-2015", title: "CHONNAM NATIONAL UNIVERSITY, SOUTH KOREA & RAYAT SHIKSHAN SANSTHA", purpose: "Collaboration on academic programs" },
  { sr: 5, date: "9-2-2016", title: "SNS FOUNDATION & RAYAT SHIKSHAN SANSTHA", purpose: "For improvement in quality of school education" },
  { sr: 6, date: "2015", title: "TATA INSTITUTE OF SOCIAL SCIENCES, MUMBAI & KARMAVEER BHAURAO PATIL COLLEGE, VASHI", purpose: "National university students skill development programme (NUSSD)" },
  { sr: 7, date: "24-2-2016", title: "RGSTC, HBCSE & RAYAT SHIKSHAN SANSTHA", purpose: "Assistance for Science and Innovation Activity Centres (SIAC) in Maharashtra schools" },
  { sr: 8, date: "22-5-2017", title: "BVG INDIA LIMITED PUNE & RAYAT SHIKSHAN SANSTHA", purpose: "Provide industry-focused quality education and job opportunities" },
  { sr: 9, date: "4-8-2017", title: "RAYAT SHIKSHAN SANSTHA & YCMOU & BVG INDIA LIMITED", purpose: "Plan and prescribe courses for degrees, diplomas, and certificates" },
  { sr: 10, date: "17-2-2018", title: "MSSDS & RAYAT SHIKSHAN SANSTHA", purpose: "Skill training for Maharashtra youth to enhance employability" },
];

export default function Memorandum() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredMemorandum = memorandum.filter((mou) =>
    mou.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          Memorandum of Understanding (MoU)
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
          <span className="text-yellow-400 uppercase">Memorandum of Understanding (MoU)</span>
        </div>
      </div>
      <section className="container mx-auto px-6 py-16">
       
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search..."
            className="px-3 py-2 w-1/3 border border-gray-400 rounded-md shadow-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="w-full border-collapse text-sm bg-white rounded-lg overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="border px-4 py-3">Sr. No.</th>
                <th className="border px-4 py-3">Title</th>
                <th className="border px-4 py-3">Purpose</th>
                <th className="border px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 divide-y divide-gray-200">
              {filteredMemorandum.length > 0 ? (
                filteredMemorandum.map((mou, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border px-4 py-3 text-center font-semibold">{mou.sr}</td>
                    <td className="border px-4 py-3 font-semibold">{mou.title}</td>
                    <td className="border px-4 py-3">{mou.purpose}</td>
                    <td className="border px-4 py-3 text-center">{mou.date}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">
                    No matching MoUs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
      <Footer />
    </div>
  );
}

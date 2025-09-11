"use client"
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeaderSection from "../components/HeaderSection";
import Header from "../components/Header";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const awards = [
  { sr: 1, year: "1994", title: "Dr. Babasaheb Ambedkar award by Govt. of India" },
  { sr: 2, year: "1993-94", title: "Dalit Mitra Puraskar by the state Govt" },
  { sr: 3, year: "1998", title: "Rajarshi Shahu Puraskar by the Rajarshi Chh.Shahu Memorial trust, Kolhapur" },
  { sr: 4, year: "2000-01", title: "Adarsha Shikshan Sanstha Puraskar by the Govt of Maharashtra" },
  { sr: 5, year: "2001-02", title: "Shri Sant Gadge Maharaj Seva Puraskar by the Shri Sant Gadage Maharaj Mission, Mumbai" },
  { sr: 6, year: "2003", title: "Shikshan Maharshi Dr. Panjabrao Upakhya Bhausaheb Deshmukh Smriti Puraskar by Yashwantrao Chavan Maharashtra Open University, Nasik" },
  { sr: 7, year: "2011", title: "Excellence in Education Award-2011 by Dr. D.Y. Patil Pratishthan, Navi Mumbai." },
  { sr: 8, year: "2012-13", title: "Shahu, Phule, Ambedkar Puraskar by Government of Maharashtra." },
  { sr: 9, year: "2013-14", title: "Jivangourav Puraskar by Maharashtra Foundation (America & Sadhana Trust)." },
  { sr: 10, year: "2014-15", title: "Vatvruksha Shiv-Puraskar by Krutisamiti, Shivaji University, Kolhapur" },
  { sr: 11, year: "2015-16", title: "Satara Bhushan Puraskar by R.N.Godbole Trust, Satara" },
  { sr: 12, year: "2016", title: "Bharatratna Moulana Abul Kalam Azad Puraskar by Pune Municipal Corporation, Pune" },
  { sr: 13, year: "2017", title: "Pracharya R.K. Kanbarkar Puraskar by Shivaji University, Kolhapur" },
  { sr: 14, year: "2018", title: "Karmayogi Puraskar by Pri.Dr.P.B.Patil, Social Foram Trust, Sangli" },
  { sr: 15, year: "2019", title: "Karmaveer Bhurao Patil Krantidut Puraskar by Rashtriya Bandhuta Sahitya Parishad, Pune" },
];

export default function Awards() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredAwards = awards.filter((award) =>
    award.title.toLowerCase().includes(searchQuery.toLowerCase())
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
          Awards & Honors
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
          <span className="text-yellow-400 uppercase">Awards & Honors</span>
        </div>
      </div>

      <section className="container mx-auto px-6 py-16">
        {/* Search Input */}
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
                <th className="border px-4 py-3">Award and Honors</th>
                <th className="border px-4 py-3">Year</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 divide-y divide-gray-200">
              {filteredAwards.length > 0 ? (
                filteredAwards.map((award, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border px-4 py-3 text-center font-semibold">{award.sr}</td>
                    <td className="border px-4 py-3 font-semibold">{award.title}</td>
                    <td className="border px-4 py-3 text-center">{award.year}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-4 text-gray-500">
                    No matching awards found.
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